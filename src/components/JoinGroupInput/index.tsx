import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ButtonSubmit as Button } from "@/components";
import theme from "@/theme/theme";

interface JoinGroupInputProps {
  onJoin: (code: string) => void;
}

const JoinGroupInput: React.FC<JoinGroupInputProps> = ({ onJoin }) => {
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
      onJoin(code);
    }
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
      <Button onClick={handleSubmit}>Join</Button>
      {errors && (
        <Typography variant='body2' sx={{ color: theme.palette.error.main, padding: "5px", fontStyle: "italic" }}>
          {errors}
        </Typography>
      )}
    </>
  );
};

export default JoinGroupInput;
