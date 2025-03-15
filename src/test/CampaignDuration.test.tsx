import { describe, it, expect } from "vitest";
import CampaignDuration from "../components/CampaignDuration";
import { render, screen } from "@testing-library/react";

describe("CampaignDuration", () => {
  it("should render title in paragraph tag", () => {
    render(
      <CampaignDuration
        openedLongSearchBar={true}
        startDate={new Date()}
        setStartDate={() => new Date()}
        endDate={new Date()}
        setEndDate={() => new Date()}
      />
    );
    const heading = screen.getByTestId("campaign-title");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Campaign Duration/);
    expect(heading.tagName).toBe("P");
  });

  it("should not render title in paragraph tag", () => {
    render(
      <CampaignDuration
        openedLongSearchBar={false}
        startDate={new Date()}
        setStartDate={() => new Date()}
        endDate={new Date()}
        setEndDate={() => new Date()}
      />
    );
    const heading = screen.getByTestId("campaign-title");
    expect(heading).toBeInTheDocument();
    expect(screen.queryByText("Campaign Duration")).toHaveClass("hidden");
    expect(heading.tagName).toBe("P");
  });
});
