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

  it("should not render button text", () => {
    render(
      <SearchButton
        openedLongSearchBar={false}
        kmValue={5}
        startDate={new Date()}
        endDate={new Date()}
        selectedLocations={["Kampur"]}
      />
    );
    expect(screen.queryByText("Search")).toHaveClass("hidden");
  });
});

// describe("SaveToURLButton", () => {
//   const originalLocation = window.location;

//     beforeEach(() => {
//       window.location.href = "http://localhost:5173";
//       Object.defineProperty(window, "location", {
//         value: { href: "http://localhost:5173" },
//         writable: true,
//       });
//     });

//     afterEach(() => {
//       Object.defineProperty(window, "location", {
//         value: originalLocation,
//         writable: true,
//       });
//     });

//   it("should update the URL with the correct data when the button is clicked", () => {
//     render(
//       <SearchButton
//         openedLongSearchBar={true}
//         kmValue={5}
//         startDate={new Date()}
//         endDate={new Date()}
//         selectedLocations={["Kondapur"]}
//       />
//     );

//     const button = screen.getByTestId("save-button");
//     expect(button).toBeInTheDocument();

//     if (fireEvent.click(button)) {
//       expect(window.location.href).toBe(
//         "http://localhost:3000/?start-date=3%2F15%2F2025%2C+6%3A13%3A32+PM&end-date=3%2F15%2F2025%2C+1%3A00%3A00+AM&locations=kondapur&km=5"
//       );
//     }

//   });
// });
