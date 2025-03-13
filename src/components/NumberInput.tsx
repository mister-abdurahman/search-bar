import { useState } from "react";
import TextField from "@mui/material/TextField";

interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const NumberInput = ({ value, setValue }: IProps) => {
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event?.target?.value;
    if (+newValue >= 2 && +newValue <= 10) {
      setValue(+newValue);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <TextField
      type="number"
      label=""
      variant="standard"
      value={value}
      onChange={handleChange}
      inputProps={{
        min: 2,
        max: 10,
        sx: { fontSize: "0.75rem" },
      }}
      error={error}
      helperText={error ? "Value must be between 2 and 10" : ""}
      margin="normal"
    />
  );
};

export default NumberInput;
