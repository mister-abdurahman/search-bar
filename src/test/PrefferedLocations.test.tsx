import { describe, it, expect } from "vitest";
import PrefferedLocations from "../components/PrefferedLocations";
import { render, screen } from "@testing-library/react";

describe("PrefferedLocations", () => {
  it("should render title in paragraph tag", () => {
    render(
      <PrefferedLocations
        openedLongSearchBar={true}
        selectedLocations={["kondar"]}
        setSelectedLocations={() => {
          return ["kondar"];
        }}
      />
    );
    const heading = screen.getByTestId("location-title");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Preffered Locations/);
    expect(heading.tagName).toBe("P");
  });

  it("should not render title in paragraph tag", () => {
    render(
      <PrefferedLocations
        openedLongSearchBar={false}
        selectedLocations={["kondar"]}
        setSelectedLocations={() => {
          return ["kondar"];
        }}
      />
    );
    const heading = screen.getByTestId("location-title");
    expect(heading).toBeInTheDocument();
    expect(screen.queryByText("Preffered Locations")).toHaveClass("hidden");
    expect(heading.tagName).toBe("P");
  });

  it("should render autocomplete field in paragraph tag", () => {
    render(
      <PrefferedLocations
        openedLongSearchBar={true}
        selectedLocations={["kondar"]}
        setSelectedLocations={() => {
          return ["kondar"];
        }}
      />
    );
    const multipleFormField = document.getElementById("select-location");
    expect(multipleFormField).toBeInTheDocument();
  });

  it("should not render autocomplete field in paragraph tag", () => {
    render(
      <PrefferedLocations
        openedLongSearchBar={false}
        selectedLocations={["kondar"]}
        setSelectedLocations={() => {
          return ["kondar"];
        }}
      />
    );
    const multipleFormField = document.getElementById("select-location");
    expect(multipleFormField).not.toBeInTheDocument();
  });
});
