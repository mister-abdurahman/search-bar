import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateDateDifference, isMonday, isSunday } from "../utils/helper";
import { ICampaignDuration } from "../utils/types";
import { forwardRef } from "react";

function CampaignDuration({
  openedLongSearchBar,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: ICampaignDuration) {
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
    <div className="flex flex-col py-3 border-r border-gray-300 min-w-[12rem]">
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
          {startDate && endDate && calculateDateDifference(startDate, endDate)}
        </span>
      </div>
    </div>
  );
}

export default CampaignDuration;
