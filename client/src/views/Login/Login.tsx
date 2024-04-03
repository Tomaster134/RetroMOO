import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AccountButton from "../../components/AccountButton/AccountButton";
import "./Login.css";
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

export default function Login() {
  let apiURL:string

  if (import.meta.env.MODE === 'development') {
    apiURL = 'http://localhost:5000'
  } else {
    apiURL = 'https://retromooapi.onrender.com'
  };

  const navigate = useNavigate();

  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const { setUser } = React.useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = new FormData(event.currentTarget);
    const user = {
      username: userInfo.get("username"),
      password: userInfo.get("password"),
    };
    const response = await fetch(`${apiURL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "logged in") {
      setUser({
        id: data.user_id,
        username: data.user_username,
        email: data.user_email,
        active_account: data.user_active_account,
      });
      localStorage.setItem("user_id", data.user_id);
      data.user_active_account &&
        localStorage.setItem("active_account", data.user_active_account);
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Username or password incorrect", { variant: "warning" });
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
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={input.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({ ...input, password: event.target.value });
                  }}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={input.username && input.password ? false : true}
                >
                  Sign In
                </Button>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item>
                    <Link to="/signup">
                      {"Don't have an account? Sign Up!"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
