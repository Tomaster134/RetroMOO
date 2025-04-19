import { Button } from "@mui/material";
import AccountButton from "../../components/AccountButton/AccountButton";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { UserContext } from "../../contexts/UserContext";
import "./Account.css";
import AccountCards from "../../components/AccountCards/AccountCards";

interface IAccounts {
  player_name: string;
  is_active: boolean;
  player_id: number;
}
[];

const Account = () => {
  let apiURL: string;

  if (import.meta.env.MODE === "development") {
    apiURL = "http://localhost:5000";
  } else {
    apiURL = "https://retromooapi.onrender.com";
  }

  const { user } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();

  const [accountList, setAccountList] = useState<IAccounts[]>([]);

  const accountPull = async (user_id: number) => {
    // if user isn't logged in yet, prevents useless API call
    if (user_id === -1) {
      return null;
    }
    const response = await fetch(
      `${apiURL}/api/player_accounts?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      let new_accounts = [];
      for (const key in data.accounts) {
        new_accounts.push(data.accounts[key]);
      }
      setAccountList(new_accounts);
    } else {
      enqueueSnackbar("There was an error retrieving accounts", {
        variant: "error",
      });
    }
  };

  const handleActivate = async (p_id: number) => {
    const input = { user_id: user.id, player_id: p_id };
    const response = await fetch(`${apiURL}/api/change_active`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      enqueueSnackbar(`Active account has been changed!`, {
        variant: "success",
      });
      accountPull(user.id);
    } else {
      enqueueSnackbar("There was an error :(", { variant: "warning" });
    }
  };

  if (accountList.length === 0) {
    accountPull(user.id);
  }
  console.log(accountList);

  return (
    <div className="account-container">
      <PrivateRoute />
      <NavBar />
      <AccountButton />
      <h2 className="account-welcome">Account</h2>
      <div className="account-box">
        <div className="account-box-interior">
          <h4 className="account-box-title">Your Players</h4>
          <div className="account-divider"></div>
          <div className="account-blurb">
            {accountList.map((account) => (
              <div className="account-card" key={account.player_id}>
                <AccountCards account={account} />
                <Button
                  size="small"
                  sx={{ my: 2 }}
                  variant="contained"
                  disabled={account.is_active}
                  onClick={() => handleActivate(account.player_id)}
                >
                  Activate
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/create-player"
          >
            Create Player
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Account;
