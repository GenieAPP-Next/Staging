import { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Typography } from "@mui/material/";
import ValidationText from "@/components/ValidationText/ValidationText";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";

const JoinGroupForm = () => {
  const theme = useTheme();
  const [codes, setCodes] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [errors, setErrors] = useState<string>("");

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && codes[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    const newValue = value.toUpperCase();
    const newCodes = [...codes];
    newCodes[index] = newValue;
    setCodes(newCodes);

    if (newValue !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = codes.join("");
    if (validateCodes(code)) {
      console.log("Code submitted :" + code);
    }

    // handle submit operation here
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const uppercasePastedData = pastedData.toUpperCase();
    if (/^[A-Z0-9]{4}$/.test(uppercasePastedData)) {
      const splitData: string[] = uppercasePastedData.split("");
      setCodes(splitData);
    }
  };

  const validateCodes = (code: string): boolean => {
    if (code.length !== 4) {
      setErrors("Code must be 4 characters");
      return false;
    }
    if (!/^[A-Z0-9]+$/.test(code)) {
      setErrors("Code must be alphanumeric");
      return false;
    }
    setErrors("");
    return true;
  };

  return (
    <>
      <Typography sx={{ fontSize: 24, fontWeight: 500, marginBottom: "32px", color: theme.palette.text.primary }}>
        Enter Group Code
      </Typography>
      <div style={{ display: "block", marginBottom: "30px" }}>
        {codes.map((code, index) => (
          <TextField
            key={index}
            inputRef={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
            value={code}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              handleKeyDown(index, e);
            }}
            onPaste={index === 0 ? handlePaste : undefined}
            variant='standard'
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            sx={{ px: 1.25, py: 1, width: 68 }}
            error={Boolean(errors)}
          />
        ))}
      </div>
      <SubmitButton onClick={handleSubmit}>Join</SubmitButton>
      {errors && <ValidationText errors={errors} />}
    </>
  );
};

export default JoinGroupForm;
