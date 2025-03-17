import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loader from "./Loader";

describe("Loader Component", () => {
  test("renders Loader with icon and text", () => {
    const { getByTestId, getByText } = render(<Loader text="Loading" />);
    const loaderIcon = getByTestId("loader");
    expect(loaderIcon).toBeInTheDocument();
    expect(getByText("Loading")).toBeInTheDocument();
  });
});
