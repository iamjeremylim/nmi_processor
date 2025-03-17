import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import styled from "styled-components";
import { Loader } from "../Loader";
import { Card } from "../Card";
import { Button } from "../Button";

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
  width: 50vw;
  min-width: 300px;
`;

const InputWrapper = styled.div`
  border: 1px var(--gray-200) dashed;
  border-radius: var(--radius-md);
  min-height: 16rem;
  width: 100%;
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

const OutputWrapper = styled.div`
  border: 1px var(--gray-200) solid;
  border-radius: var(--radius-md);
  padding: 1rem;
  overflow: auto;
  max-width: 80vw;
`;

type FileProcessor = (file: File) => Promise<any>;

type AcceptedFileTypes = ".csv" | ".json" | ".txt";

type AcceptedProcess = "generate-queries";

type Stages = "init" | "processing" | "completed" | "error";

export interface FileUploadProps {
  fileType: AcceptedFileTypes[];
  fileProcessor: FileProcessor;
  process: AcceptedProcess;
  placeholder: string;
  cta: string;
}

const FileProcessor = ({
  fileType,
  fileProcessor,
  placeholder,
  process,
  cta,
}: FileUploadProps) => {
  const [stage, setStage] = useState<Stages>("init");
  const [fileKey, setFileKey] = useState<number>(Date.now());
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [output, setOutput] = useState<any>(null);

  useEffect(() => {
    setStage("init");
    setOutput(null);
  }, [fileKey]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFileKey(Date.now());
  };

  const processFile = async (file: File) => {
    setStage("processing");

    try {
      const result = await fileProcessor(file);
      setStage("completed");
      setOutput(result);
    } catch (error) {
      setStage("error");
    }
  };

  const deleteFile = () => {
    setOutput(null);
    setUploadedFile(null);
    setFileKey(Date.now());
    setStage("init");
  };

  return (
    <BaseWrapper>
      <UploadWrapper>
        <InputWrapper>
          <input
            type="file"
            key={fileKey}
            accept={fileType.join(",")}
            onChange={handleFileUpload}
            data-testid="file-input"
          />
          <FeatherIcon icon="upload" />
          <span>{placeholder}</span>
        </InputWrapper>

        {uploadedFile && (
          <>
            <Card
              icon="file"
              description={uploadedFile.name}
              cta={{ icon: "trash-2", onClick: deleteFile }}
            />
            <Button
              variant="primary"
              onClick={() => processFile(uploadedFile)}
              text={stage === "error" ? "Try again?" : cta}
            />
          </>
        )}
      </UploadWrapper>

      {stage === "processing" && <Loader />}

      {stage === "completed" && output && (
        <OutputWrapper>
          {process === "generate-queries" && <pre>{output}</pre>}
        </OutputWrapper>
      )}

      {stage === "error" && (
        <span>Oops, we are unable to process the file.</span>
      )}

      {/* <Card
        icon="github"
        description="hello world"
        cta={{ icon: "link", href: "https://github.com" }}
      /> */}
    </BaseWrapper>
  );
};

export default FileProcessor;
