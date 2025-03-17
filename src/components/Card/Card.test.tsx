import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Card from "./Card";

describe("Card Component", () => {
  test("renders Card with description and <a> tag", () => {
    const { getByRole, getByText } = render(
      <Card
        icon="file"
        description="Hello World"
        cta={{ href: "www.test.com", icon: "link" }}
      />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "www.test.com");
  });

  test("renders Card with description and <button> tag", () => {
    const { getByRole, getByText } = render(
      <Card
        icon="file"
        description="Hello World"
        cta={{ icon: "link", onClick: () => {} }}
      />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
    expect(getByRole("button", { name: "cta button" })).toBeInTheDocument();
  });
});
