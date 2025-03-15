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
    setValue(+newValue);
    if (+newValue >= 2 && +newValue <= 10) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <TextField
      data-testId="number-input"
      label=""
      value={value}
      onChange={handleChange}
      variant="standard"
      error={error}
      helperText={error ? "Please enter a number between 2 and 10" : ""}
      margin="normal"
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
      FormHelperTextProps={{
        sx: {
          fontSize: "0.6rem",
        },
      }}
    />
  );
};

export default NumberInput;
