import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AccountButton from "../../components/AccountButton/AccountButton";
import "./SignUp.css";
import MLogo from "../../components/MLogo/MLogo";
import { useSnackbar } from "notistack";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Thomas Makurat {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = new FormData(event.currentTarget);
    const user = {
      username: userInfo.get("username"),
      email: userInfo.get("email"),
      password: userInfo.get("password"),
    };
    const response = await fetch(
      "https://retromooapi.onrender.com/api/signup",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      enqueueSnackbar("Sign up successful, please log in.", {
        variant: "success",
      });
      navigate("/login");
    } else {
      enqueueSnackbar("Username or Email already taken, please try again", {
        variant: "warning",
      });
    }
  };

  return (
    <>
      <MLogo />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="login-img"
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(src/assets/imgs/forest.jpeg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t: any) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ backgroundColor: "whitesmoke" }}
          >
            <AccountButton />
            <Box
              sx={{
                my: 8,
                mx: 17,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={input.username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({ ...input, username: event.target.value });
                  }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  value={input.email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({ ...input, email: event.target.value });
                  }}
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={input.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({ ...input, password: event.target.value });
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  value={input.confirm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({ ...input, confirm: event.target.value });
                  }}
                />
                {input.password === input.confirm ? null : (
                  <h6>Passwords do not match</h6>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    input.password === input.confirm &&
                    input.email &&
                    input.username &&
                    input.password
                      ? false
                      : true
                  }
                >
                  Sign Up!
                </Button>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}
                ></Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
