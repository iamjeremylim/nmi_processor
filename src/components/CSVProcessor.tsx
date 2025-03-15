import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import styled from "styled-components";
import { Upload, File, Trash2 } from "react-feather";
import { Button } from "harmonia-ui";
import Loader from "./Loader";

const BaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100%;
  overflow: auto;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  min-width: 500px;
`;

const InputWrapper = styled.div`
  border: 1px var(--gray-200) dashed;
  border-radius: var(--radius-md);
  min-height: 16rem;
  min-width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: var(--spacing-1);
  padding: 1rem;
  color: var(--gray-500);

  input {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    cursor: pointer;
  }

  span {
    font-weight: 400;
  }
`;

const FilesWrapper = styled.div`
  border: 1px var(--gray-200) solid;
  border-radius: var(--radius-md);
  box-shadow: 2px 4px 8px hsl(0deg 0% 0% / 0.2);
  min-width: 50vw;
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: 1rem;
  color: var(--gray-500);

  span {
    margin-right: auto;
    font-weight: 400;
  }

  .trash-icon:hover {
    color: var(--gray-700);
  }
`;

const StatementWrapper = styled.div`
  border: 1px var(--gray-200) solid;
  border-radius: var(--radius-md);
  padding: 1rem;
  overflow: auto;
  max-width: 80vw;
`;

type MeterReading = {
  [nmi: string]: {
    [timestamp: string]: number;
  };
};

type Stages = "init" | "processing" | "completed";

const CSVProcessor: React.FC = () => {
  const [memo, setMemo] = useState<MeterReading>({});
  const [fileKey, setFileKey] = useState<number>(Date.now());
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStage, setProcessingStage] = useState<Stages>("init");

  useEffect(() => {
    setMemo({});
  }, [fileKey]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file", file);
    if (!file) return;
    setProcessingStage("init");
    setUploadedFile(file);
  };

  const processFile = (file: File) => {
    setProcessingStage("processing");

    let currNMI: string;
    Papa.parse(file, {
      step: ({ data }) => {
        const row = data as string[];

        // skip irrelevant rows
        if (row[0] && ["100", "500", "900"].includes(row[0])) {
          return;
        }

        if (row[0] === "200") {
          const NMI = row[1] as string;

          if (!memo[NMI]) {
            memo[NMI] = {};
          }
          currNMI = NMI;
        }

        if (row[0] === "300") {
          const readings = memo[currNMI];
          const timestamp = row[1] as string;
          let totalConsumption = 0;
          const consumptions = row.slice(2, 50);
          consumptions.forEach(
            (consumption) => (totalConsumption += Number(consumption))
          );

          if (readings && !readings[timestamp]) {
            readings[timestamp] = totalConsumption;
          }
        }
      },
      complete: () => {
        setMemo(memo);
        setProcessingStage("completed");
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  const generateQueries = (data: MeterReading) => {
    const result: string[] = [];
    // Iterate over each NMI (e.g., "NEM1201009")
    Object.keys(data).forEach((nmi) => {
      // Iterate over each timestamp (e.g., "20050301")
      const timestamps = data[nmi];
      if (timestamps)
        Object.keys(timestamps).forEach((timestamp) => {
          const consumption = timestamps[timestamp];
          // Generate the SQL query for each record
          const query = `INSERT INTO meter_readings (id, nmi, timestamp, consumption) VALUES (gen_random_uuid(), '${nmi}', '${timestamp}', ${consumption});`;
          result.push(query);
        });
    });

    return result.join("\n");
  };

  const deleteFile = () => {
    setMemo({});
    setUploadedFile(null);
    setProcessingStage("init");
    setFileKey(Date.now());
  };

  return (
    <BaseWrapper>
      <UploadWrapper>
        <InputWrapper>
          <input
            key={fileKey}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <Upload />
          <span>Upload CSV file here</span>
        </InputWrapper>

        {uploadedFile && (
          <>
            <FilesWrapper>
              <div className="file-icon">
                <File />
              </div>
              <span>{uploadedFile.name}</span>
              <div className="trash-icon" onClick={deleteFile}>
                <Trash2 />
              </div>
            </FilesWrapper>
            <Button
              variant="outline-secondary"
              onClick={() => processFile(uploadedFile)}
            >
              Generate Queries
            </Button>
          </>
        )}
      </UploadWrapper>

      {processingStage === "processing" && <Loader />}

      {processingStage === "completed" && (
        <StatementWrapper>
          <pre>{generateQueries(memo)}</pre>
        </StatementWrapper>
      )}
    </BaseWrapper>
  );
};

export default CSVProcessor;
