import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { forwardRef, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const [openedLongSearchBar, setOpenedLongSearchBar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(getInitialDate("start"))
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(getInitialDate("end"))
  );

  useEffect(
    function () {
      const url = new URL(window.location);
      url.searchParams.set(
        "start-date",
        new Date(startDate || "").toLocaleString()
      );
      url.searchParams.set(
        "end-date",
        new Date(endDate || "").toLocaleString()
      );
      window.history.pushState({}, "", url);
    },
    [startDate, endDate]
  );

  function handleSearchBar(e) {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setOpenedLongSearchBar(!openedLongSearchBar);
    }
  }
  const StartDateProvider = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
      {new Date(startDate || "").toLocaleString("default", {
        month: "short",
        day: "numeric",
      })}
    </button>
  ));
  const EndDateProvider = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
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
              customInput={
                <StartDateProvider className="example-custom-input" />
              }
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
              customInput={<EndDateProvider className="example-custom-input" />}
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
          <span>1 week</span>
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
                defaultValue={[]}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <span
                      {...getTagProps({ index })}
                      className="bg-gray-200 rounded-full px-2 py-1 text-sm mr-1 mb-1 whitespace-nowrap"
                    >
                      {option}
                    </span>
                  ))
                }
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
                      sx: { fontSize: "0.85rem" },
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
            {" "}
            <span>Kondapur</span>
            <span>+2</span>
          </>
        )}
      </div>
      <div className="px-3 py-3">
        <p
          className={`text-rose-800 transform-all duration-500 ${
            openedLongSearchBar ? "block" : "hidden"
          }`}
        >
          Radius
        </p>
        <span>5 km</span>
      </div>
      <div className=" text-white bg-rose-800 p-5 rounded-r-2xl">
        <SearchIcon />
        <span className={`${openedLongSearchBar ? "inline-block" : "hidden"}`}>
          Search
        </span>
      </div>
    </div>
  );
}

export default Search;
