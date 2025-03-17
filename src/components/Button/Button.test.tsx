import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with text", () => {
    const { getByRole } = render(
      <Button variant="primary" text="Hello World" />
    );
    const button = getByRole("button", { name: "Hello World" });

    expect(button).toBeInTheDocument();
  });

  test("renders a disabled button", () => {
    const { getByRole } = render(
      <Button variant="primary" text="Hello World" disabled />
    );
    const button = getByRole("button", { name: "Hello World" });

    expect(button).toBeDisabled();
  });
});
