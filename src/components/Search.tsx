import { useEffect, useState } from "react";
import CampaignDuration from "./CampaignDuration";
import PrefferedLocations from "./PrefferedLocations";
import Radius from "./Radius";
import SearchButton from "./SearchButton";

function Search() {
  const getInitialDate = (type: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(`${type}-date`) || new Date().toISOString().split("T")[0];
  };
  const getInitialLocations = () => {
    const params = new URLSearchParams(window.location.search);
    const convertedToArray = (params.get("locations") || "")
      .split(",")
      .filter(Boolean);
    return convertedToArray;
  };
  const getInitialKm = () => {
    const params = new URLSearchParams(window.location.search);
    const parsed = params.get("km") || 5;
    return Number(parsed);
  };

  const [openedLongSearchBar, setOpenedLongSearchBar] = useState(false);
  const [kmValue, setKmValue] = useState(getInitialKm);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(getInitialDate("start"))
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(getInitialDate("end"))
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    getInitialLocations()
  );

  useEffect(
    function () {
      const url = new URL(window.location.href);
      url.searchParams.set("start-date", startDate?.toLocaleString() || "");
      url.searchParams.set("end-date", endDate?.toLocaleString() || "");
      url.searchParams.set(
        "locations",
        selectedLocations?.toLocaleString() || "[]"
      );
      if (kmValue >= 2 || kmValue <= 10) {
        url.searchParams.set("km", kmValue?.toLocaleString() || "");
      }
      window.history.pushState({}, "", url);
    },
    [kmValue, startDate, endDate, selectedLocations]
  );

  function handleSearchBar(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setOpenedLongSearchBar(!openedLongSearchBar);
    }
  }

  return (
    <div
      onClick={handleSearchBar}
      className={`bg-white rounded-2xl flex items-center pl-4 text-sm transition-all duration-500 ${
        openedLongSearchBar
          ? "shadow-2xl max-w-[80rem]"
          : "shadow-md max-w-[50rem]"
      }`}
    >
      <CampaignDuration
        openedLongSearchBar={openedLongSearchBar}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <PrefferedLocations
        openedLongSearchBar={openedLongSearchBar}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
      <Radius
        openedLongSearchBar={openedLongSearchBar}
        kmValue={kmValue}
        setKmValue={setKmValue}
      />
      <SearchButton
        kmValue={kmValue}
        startDate={startDate}
        endDate={endDate}
        selectedLocations={selectedLocations}
        openedLongSearchBar={openedLongSearchBar}
      />
    </div>
  );
}

export default Search;
