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
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import logo from "../../public/genielogo.png";
import { useRouter } from "next/navigation";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../../theme/theme";
import Link from "next/link";
import Swal from "sweetalert2";

function LoginForm() {
  const [isSubmitting, setSubmitting] = useState(false);
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
    void Swal.fire({
      icon: "success",
      title: "Login success",
      text: "You have successfully logged in!",
    });
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
            variant="h5"
            color="textPrimary"
            gutterBottom
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            Effortlessly manage gift.
          </Typography>
          <Typography
            variant="h5"
            color="textPrimary"
            gutterBottom
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            Free on Genie.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              maxWidth: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              padding: 2,
            }}
          >
            <Grid item xs={12} sm={10} md="auto" lg={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
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
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
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
                  {isSubmitting ? <CircularProgress /> : "Login"}
                </Button>
              </form>
              <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2" color="grey">
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
                <Box
                  borderBottom="0.09999999999999964pt solid #c3c3c3"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                ></Box>
                <Typography
                  variant="subtitle2"
                  color="grey"
                  alignItems="center"
                  style={{ padding: "0 25px" }}
                >
                  Or
                </Typography>
                <Box
                  borderBottom="0.09999999999999964pt solid #c3c3c3"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                ></Box>
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <IconButton>
                  <FontAwesomeIcon icon={faGoogle} color="black" size="1x" />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faFacebookF} color="black" size="1x" />
                </IconButton>
              </Box>
              <Box
                mt={20}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  color="grey"
                  justifyContent="center"
                  alignItems="center"
                >
                  Don't have an account?{" "}
                  <Link href="/register">
                    <strong>Sign up.</strong>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default LoginForm;
