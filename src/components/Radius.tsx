import { IRadius } from "../utils/types";
import NumberInput from "./NumberInput";

function Radius({ openedLongSearchBar, kmValue, setKmValue }: IRadius) {
  return (
    <div className={`px-3 py-3 ${openedLongSearchBar && "min-w-[14rem]"}`}>
      <p
        className={`text-rose-800 transition-all duration-500 -mb-6 ${
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
  );
}

export default Radius;
