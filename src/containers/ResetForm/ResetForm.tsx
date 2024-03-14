/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import theme from "@/theme/theme";

// const initialValues = {
//   email: "",
//   password: "",
// };

function ResetForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        return { values, errors: {} };
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formErrors = error.inner.reduce<Record<string, any>>(
            (acc, cur) => {
              acc[cur.path as any] = { message: cur.message };
              return acc;
            },
            {}
          );
          return { values, errors: formErrors };
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setSubmitting(true);
    // Here you can perform any logic you need, like calling an API
    setTimeout(() => {
      setSubmitting(false);
      router.push("/");
    }, 2000);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box mt={7}>
          <Box display="flex" alignItems="left">
            <IconButton
              onClick={() => {
                router.push("/login");
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              color="textPrimary"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              gutterBottom
            >
              Forgot Password?
            </Typography>
          </Box>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "new password"}
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              {...register("newPassword")}
              error={!!errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPassword ? "text" : "new password"}
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              {...register("confirmNewPassword")}
              error={!!errors.confirmNewPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              style={{
                width: "100%",
                borderRadius: 15,
                marginTop: 25,
                fontSize: 12,
              }}
            >
              {isSubmitting ? <CircularProgress /> : "Submit"}
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ResetForm;
