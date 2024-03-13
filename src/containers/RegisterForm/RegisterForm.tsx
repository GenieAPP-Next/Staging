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
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import theme from "@/theme/theme";
import axios from "axios";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
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

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitting(true);

    try {
      const response = await axios.post("/api/auth/register", data);

      if (response.status !== 200) {
        setSnackbarMessage(response.data.message || "Registration failed");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Registration successful");
        setSnackbarSeverity("success");
        router.push("/login");
      }
      setSnackbarOpen(true);
    } catch (error: any) {
      console.error("An unexpected error occurred:", error);
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="top"
        minHeight="100vh"
      >
        <Box mt={7}>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                router.push("/login");
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Sign Up
            </Typography>
          </Box>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{ style: { fontSize: "14px" } }}
              {...register("username")}
              error={!!errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{ style: { fontSize: "14px" } }}
              {...register("email")}
              error={!!errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{ style: { fontSize: "14px" } }}
              {...register("password")}
              error={!!errors.password}
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
              {isSubmitting ? <CircularProgress /> : "Sign Up"}
            </Button>
          </form>
          <Box mt={2}>
            <Typography
              variant="body2"
              color="grey"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              Already have an account?{" "}
              <Link href="/login">
                <strong>Log in.</strong>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity={snackbarSeverity}
          sx={{
            color: snackbarSeverity === "error" ? "red" : "green",
            backgroundColor: "#FEFEFE",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default RegisterForm;
