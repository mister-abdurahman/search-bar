import SearchIcon from "@mui/icons-material/Search";
import { IButton } from "../utils/types";

function SearchButton({
  kmValue,
  startDate,
  endDate,
  selectedLocations,
  openedLongSearchBar,
}: IButton) {
  function saveToUrl() {
    if (kmValue < 2 || kmValue > 10)
      return alert("Please enter a number between 2 and 10 first!.");

    const url = new URL(window.location.href);
    url.searchParams.set("start-date", startDate?.toLocaleString() || "");
    url.searchParams.set("end-date", endDate?.toLocaleString() || "");
    url.searchParams.set(
      "locations",
      selectedLocations?.toLocaleString() || "[]"
    );
    url.searchParams.set("km", kmValue?.toLocaleString() || "");
    window.history.pushState({}, "", url);
  }
  return (
    <div
      onClick={saveToUrl}
      className="cursor-pointer text-white bg-rose-800 self-stretch flex items-center px-3 rounded-r-2xl"
    >
      <SearchIcon />
      <span
        data-testId="search-span"
        className={`${openedLongSearchBar ? "inline-block" : "hidden"}`}
      >
        Search
      </span>
    </div>
  );
}

export default SearchButton;
