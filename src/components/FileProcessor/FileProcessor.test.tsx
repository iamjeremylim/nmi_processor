import { render, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { type FileUploadProps } from "./FileProcessor";
import FileProcessor from "./FileProcessor";

describe("FileProcessor Component", () => {
  const mockFileProcessor = vi.fn(async (file: File) => {
    return "INSERT INTO meter_readings (nmi, consumption) VALUES ('NEM1201009', 18.1);";
  });

  const defaultProps: FileUploadProps = {
    fileType: [".csv"],
    fileProcessor: mockFileProcessor,
    placeholder: "Upload CSV file",
    process: "generate-queries",
    cta: "Generate Queries",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders input field with correct attributes", () => {
    const { getByTestId, getByText } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", ".csv");
    expect(getByText("Upload CSV file")).toBeInTheDocument();
  });

  test("uploads a file and updates UI", async () => {
    const { getByTestId, getByText, getByRole } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");
    const file = new File(["sample data"], "sample.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(getByText("sample.csv")).toBeInTheDocument();
      expect(
        getByRole("button", { name: "Generate Queries" })
      ).toBeInTheDocument();
    });
  });

  test("calls fileProcessor function when processing file", async () => {
    const { getByTestId, getByRole, getByText } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");
    const file = new File(["sample data"], "sample.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    const button = await getByRole("button", {
      name: "Generate Queries",
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFileProcessor).toHaveBeenCalledTimes(1);
      expect(mockFileProcessor).toHaveBeenCalledWith(file);
    });

    expect(
      getByText(
        "INSERT INTO meter_readings (nmi, consumption) VALUES ('NEM1201009', 18.1);"
      )
    ).toBeInTheDocument();
  });

  test("handles file processing errors", async () => {
    mockFileProcessor.mockRejectedValueOnce(new Error("Processing error"));

    const { getByTestId, getByRole, getByText } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");
    const file = new File(["sample data"], "sample.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    const button = await getByRole("button", {
      name: "Generate Queries",
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        getByText("Oops, we are unable to process the file.")
      ).toBeInTheDocument();
      expect(getByRole("button", { name: "Try again?" })).toBeInTheDocument();
    });
  });

  test("deletes file and resets state", async () => {
    const { getByTestId, getByRole, getByText } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");
    const file = new File(["sample data"], "sample.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    const uploadedFile = getByText("sample.csv");
    const deleteButton = getByRole("button", { name: "cta button" });
    const button = getByRole("button", { name: "Generate Queries" });

    expect(uploadedFile).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(uploadedFile).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    });
  });

  test("displays loader when processing", async () => {
    const { getByTestId, getByRole } = render(
      <FileProcessor {...defaultProps} />
    );
    const input = getByTestId("file-input");
    const file = new File(["sample data"], "sample.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(
      getByRole("button", {
        name: "Generate Queries",
      })
    );
    const loaderIcon = getByTestId("loader");

    expect(loaderIcon).toBeInTheDocument();

    await waitFor(() => {
      expect(loaderIcon).not.toBeInTheDocument();
    });
  });
});
