import Papa from "papaparse";

export type MeterReading = {
  [nmi: string]: {
    [timestamp: string]: number;
  };
};

const processNMIReport = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    let currNMI: string;
    const currMemo: MeterReading = {};
    Papa.parse(file, {
      step: ({ data }) => {
        if (!Array.isArray(data) || data.length < 0) return;

        const currRow: string = data[0];

        // skip irrelevant rows
        if (["100", "500", "900"].includes(currRow)) {
          return;
        }

        if (currRow === "200") {
          const NMI = data[1];
          if (!currMemo[NMI]) {
            currMemo[NMI] = {};
          }

          currNMI = NMI;
        }

        if (currRow === "300") {
          const readings = currMemo[currNMI];
          const timestamp = data[1];
          const totalConsumption = data
            .slice(2, 50)
            .reduce((sum, val) => sum + Number(val || 0), 0);

          if (readings && !readings[timestamp]) {
            readings[timestamp] = totalConsumption;
          }
        }
      },
      complete: () => {
        const queries = generateQueries(currMemo);
        resolve(queries);
      },
      header: false,
      skipEmptyLines: true,
      error: () => {
        reject();
      },
    });
  });
};

const generateQueries = (data: MeterReading) => {
  const queries: string[] = [];
  // Iterate over each NMI
  Object.keys(data).forEach((nmi) => {
    // Iterate over each timestamp
    const timestamps = data[nmi];
    if (timestamps) {
      Object.keys(timestamps).forEach((timestamp) => {
        const consumption = timestamps[timestamp];
        // Generate the SQL query for each record
        const query = `INSERT INTO meter_readings (id, nmi, timestamp, consumption) VALUES (gen_random_uuid(), '${nmi}', TO_TIMESTAMP('${timestamp}', 'YYYYMMDD'), ${consumption});`;
        queries.push(query);
      });
    }
  });

  return queries.join("\n");
};

export { processNMIReport };
