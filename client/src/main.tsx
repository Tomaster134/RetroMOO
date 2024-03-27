import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={5000} style={{ fontSize: "18px" }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </UserContextProvider>
);
