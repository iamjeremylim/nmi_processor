import { describe, it, expect, vi } from "vitest";
import { processNMIReport } from "./processors";
import Papa from "papaparse";

const mockCSV = `
200,NEM1201009
300,20050301,10,11
300,20050302,12,13
300,20050303,14,15
`;

describe("Processing of NMI Report", () => {
  it("should parse CSV and generate SQL queries", async () => {
    const file = new File([mockCSV], "test.csv", { type: "text/csv" });

    const result = await processNMIReport(file);

    const expectedQuery = `INSERT INTO meter_readings (id, nmi, timestamp, consumption) VALUES (gen_random_uuid(), 'NEM1201009', TO_TIMESTAMP('20050301', 'YYYYMMDD'), 21);
INSERT INTO meter_readings (id, nmi, timestamp, consumption) VALUES (gen_random_uuid(), 'NEM1201009', TO_TIMESTAMP('20050302', 'YYYYMMDD'), 25);
INSERT INTO meter_readings (id, nmi, timestamp, consumption) VALUES (gen_random_uuid(), 'NEM1201009', TO_TIMESTAMP('20050303', 'YYYYMMDD'), 29);`;

    expect(result).toBe(expectedQuery);
  });

  it("should reject on parse error", async () => {
    vi.spyOn(Papa, "parse").mockImplementation((_, options: any) => {
      options.error(new Error("Parsing error"));
    });

    const file = new File([mockCSV], "test.csv", { type: "text/csv" });

    await expect(processNMIReport(file)).rejects.toThrow();
  });
});
