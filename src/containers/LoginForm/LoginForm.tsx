/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import logo from "../../public/genielogo.png";
import { useRouter } from "next/navigation";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../../theme/theme";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";

interface LoginFormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        return { values, errors: {} };
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formErrors = error.inner.reduce<Record<string, any>>(
            (acc, cur) => {
              const path = cur.path ?? "";
              acc[path] = { message: cur.message };
              return acc;
            },
            {}
          );

          return { values: {}, errors: formErrors };
        }
        throw error;
      }
    },
  });

  const onSubmit = async (data: LoginFormInput) => {
    setSubmitting(true);

    try {
      const response = await axios.post("/api/auth/login", data);

      if (response.status === 200 && response.data.success) {
        const userId = response.data.data.user_id;
        const userName = response.data.data.username;

        localStorage.setItem("user_id", userId);
        localStorage.setItem("username", userName);

        void Swal.fire(
          "Login success",
          "You have successfully logged in!",
          "success"
        );

        // Redirect to /group
        router.push("/group");
      } else {
        // Handle unsuccessful login
        void Swal.fire(
          "Login failed",
          response.data.message || "Invalid login credentials",
          "error"
        );
      }
    } catch (error: unknown) {
      console.error("An unexpected error occurred:", error);

      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      void Swal.fire("Error", errorMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box mb={1} mt={10}>
            <Image src={logo} alt="logo" width={167} height={94} />
          </Box>
          <Typography
            sx={{ padding: "20px", width: "320px", fontWeight: "500" }}
            variant="h5"
            color="textPrimary"
            gutterBottom
            textAlign="center"
          >
            Effortlessly manage gift. Free on Genie.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              maxWidth: "325px",
              mt: 2,
              padding: 2,
            }}
          >
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              size="small"
              InputLabelProps={{ style: { fontSize: "14px" } }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
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
              helperText={errors.password?.message}
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
              sx={{
                width: "100%",
                borderRadius: "14px",
                mt: 3,
                fontSize: 12,
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>

          <Box mt={2}>
            <Typography variant="body2" color="grey" textAlign="center">
              Forgot your login details?
              <Link href="/reset-password">
                <strong> Get help logging in.</strong>
              </Link>
            </Typography>
          </Box>

          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              color="grey"
              sx={{ padding: "0 25px" }}
            >
              Or
            </Typography>
          </Box>

          <Box mt={2} display="flex" justifyContent="center">
            <IconButton>
              <FontAwesomeIcon icon={faGoogle} color="black" size="1x" />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faFacebookF} color="black" size="1x" />
            </IconButton>
          </Box>

          <Box mt={20}>
            <Typography variant="body2" color="grey" textAlign="center">
              Don't have an account?{" "}
              <Link href="/register">
                <strong>Sign up.</strong>
              </Link>
            </Typography>
          </Box>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default LoginForm;
