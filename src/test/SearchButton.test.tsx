import { describe, it, expect } from "vitest";
import SearchButton from "../components/SearchButton";
import { render, screen } from "@testing-library/react";

describe("SearchButton", () => {
  it("should render button text", () => {
    render(
      <SearchButton
        openedLongSearchBar={true}
        kmValue={5}
        startDate={new Date()}
        endDate={new Date()}
        selectedLocations={["Kampur"]}
      />
    );
    const buttonText = screen.getByTestId("search-span");
    expect(buttonText).toBeInTheDocument();
    expect(buttonText).toHaveTextContent(/Search/);
    expect(buttonText.tagName).toBe("SPAN");
  });
});
