import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { forwardRef, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateDateDifference, isMonday, isSunday } from "../utils/helper";
import NumberInput from "./NumberInput";

const locations = [
  "kondapur",
  "Madhapur",
  "Gachibowli",
  "Hitech City",
  "Kukatpally",
  "Begumpet",
  "Secunderabad",
  "Banjara Hills",
  "Jubilee Hills",
  "Ameerpet",
  "Somajiguda",
  "Begumpet",
  "Kothaguda",
];

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

  function saveToUrl() {
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

  function handleSearchBar(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setOpenedLongSearchBar(!openedLongSearchBar);
    }
  }
  const StartDateProvider = forwardRef<
    HTMLButtonElement,
    { onClick: () => void }
  >(({ onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
      {new Date(startDate || "").toLocaleString("default", {
        month: "short",
        day: "numeric",
      })}
    </button>
  ));
  const EndDateProvider = forwardRef<
    HTMLButtonElement,
    { onClick: () => void }
  >(({ onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
      {new Date(endDate || "").toLocaleString("default", {
        month: "short",
        day: "numeric",
      })}
    </button>
  ));

  return (
    <div
      onClick={handleSearchBar}
      className={`bg-white rounded-2xl flex items-center pl-4 min-w-fit max-w-min text-sm transform-all duration-500 ${
        openedLongSearchBar ? "shadow-2xl" : "shadow-md"
      }`}
    >
      <div className="flex flex-col py-3 border-r border-gray-300 pr-4">
        <p
          className={`text-rose-800 transform-all duration-500 ${
            openedLongSearchBar ? "block" : "hidden"
          }`}
        >
          Campaign Duration
        </p>
        <div className="space-x-2 flex">
          {openedLongSearchBar ? (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={isMonday}
              placeholderText="Select a Monday"
              customInput={<StartDateProvider onClick={() => {}} />}
            />
          ) : (
            <span>
              {new Date(startDate || "").toLocaleString("default", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          <span>to</span>
          {openedLongSearchBar ? (
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              filterDate={isSunday}
              placeholderText="Select a Sunday"
              customInput={<EndDateProvider onClick={() => {}} />}
            />
          ) : (
            <span>
              {new Date(endDate || "").toLocaleString("default", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          <span className="text-gray-400">|</span>
          <span>
            {startDate &&
              endDate &&
              calculateDateDifference(startDate, endDate)}
          </span>
        </div>
      </div>
      <div className="border-r border-gray-300 px-3 py-3">
        <p
          className={`text-rose-800 transform-all duration-500 ${
            openedLongSearchBar ? "block" : "hidden"
          }`}
        >
          Preffered Locations
        </p>
        {openedLongSearchBar ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">
              Hyderbad <KeyboardArrowDownIcon />
            </span>
            <div className="w-[16rem]" onClick={(e) => e.stopPropagation()}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={locations}
                getOptionLabel={(option) => option}
                value={selectedLocations}
                onChange={(_, newValue) => {
                  setSelectedLocations(newValue);
                }}
                renderTags={(value, getTagProps) => {
                  return value.map((option, index) => (
                    <span
                      {...getTagProps({ index })}
                      className="bg-rose-800 text-white p-1 rounded-full"
                    >
                      {option}
                    </span>
                  ));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label=""
                    placeholder="Search your locations"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      sx: { fontSize: "0.75rem" },
                    }}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-tag": {
                    display: "inline-flex",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {selectedLocations.length > 0 ? (
              <span>
                {selectedLocations.length > 1
                  ? `${selectedLocations[0]}  + ${
                      selectedLocations.length - 1
                    } more`
                  : selectedLocations[0]}{" "}
              </span>
            ) : (
              <span>No location selected</span>
            )}
          </>
        )}
      </div>
      <div className="px-3 py-3">
        <p
          className={`text-rose-800 transform-all duration-500 -mb-6 ${
            openedLongSearchBar ? "block" : "hidden"
          }`}
        >
          Radius
        </p>
        {openedLongSearchBar ? (
          <span className="mt-1 inline-block">
            {" "}
            <NumberInput value={kmValue} setValue={setKmValue} />
          </span>
        ) : (
          <span>{kmValue} km</span>
        )}
      </div>
      <div
        onClick={saveToUrl}
        className="cursor-pointer text-white bg-rose-800 p-6 rounded-r-2xl"
      >
        <SearchIcon />
        <span className={`${openedLongSearchBar ? "inline-block" : "hidden"}`}>
          Search
        </span>
      </div>
    </div>
  );
}

export default Search;
