import { Autocomplete, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { locations } from "../utils/helper";
import { IPrefferedLocations } from "../utils/types";

function PrefferedLocations({
  openedLongSearchBar,
  selectedLocations,
  setSelectedLocations,
}: IPrefferedLocations) {
  return (
    <div className="border-r border-gray-300 px-3 py-3">
      <p
        data-testId="location-title"
        className={`text-rose-800 ${openedLongSearchBar ? "block" : "hidden"}`}
      >
        Preffered Locations
      </p>
      {openedLongSearchBar ? (
        <div id="select-location" className="flex items-center space-x-2">
          <span className="text-gray-500 whitespace-nowrap">
            Hyderbad <KeyboardArrowDownIcon />
          </span>
          <div
            className="min-w-[12rem] transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
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
                    className="text-black p-1 flex gap-1 items-center"
                  >
                    <span className="inline-block">{option}</span>
                    <span
                      className="cursor-pointer inline-block"
                      onClick={() => {
                        const newValues = selectedLocations.filter(
                          (val) => val !== option
                        );
                        setSelectedLocations(newValues);
                      }}
                    >
                      ✖
                    </span>
                    <span className="text-gray-500">|</span>
                  </span>
                ));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label=""
                  placeholder={`${
                    selectedLocations.length === 0
                      ? "Search location"
                      : "Add More"
                  }`}
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
  );
}

export default PrefferedLocations;
