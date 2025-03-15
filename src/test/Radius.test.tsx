import { describe, it, expect } from "vitest";
import Radius from "../components/Radius";
import { render, screen } from "@testing-library/react";

describe("Radius", () => {
  it("should render title in paragraph tag", () => {
    render(
      <Radius openedLongSearchBar={true} kmValue={5} setKmValue={() => 5} />
    );
    const heading = screen.getByTestId("radius-text");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Radius/);
    expect(heading.tagName).toBe("P");
  });

  it("should not render title if in short form", () => {
    render(
      <Radius openedLongSearchBar={false} kmValue={5} setKmValue={() => 5} />
    );
    const heading = screen.getByTestId("radius-text");
    expect(heading).toBeInTheDocument();
    expect(screen.queryByText("Radius")).toHaveClass("hidden");
  });

  it("should render Number Input Component if in long form", () => {
    render(
      <Radius openedLongSearchBar={true} kmValue={5} setKmValue={() => 5} />
    );
    const numberInput = screen.getByTestId("number-input");
    expect(numberInput).toBeInTheDocument();
  });

  it("should not render Number Input Component if in short form", () => {
    render(
      <Radius openedLongSearchBar={false} kmValue={5} setKmValue={() => 5} />
    );
    const NumberInputContainer = document.getElementById(
      "number-input-container"
    );
    expect(NumberInputContainer).not.toBeInTheDocument();
  });
});
