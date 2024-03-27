import { useContext, useState } from "react";
import AccountButton from "../../components/AccountButton/AccountButton";
import NavBar from "../../components/NavBar/NavBar";
import { useSnackbar } from "notistack";
import { Box, Button, TextField } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import "./CreatePlayer.css";

const CreatePlayer = () => {
  const [playerName, setPlayerName] = useState("");

  const { user } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const playerInfo = new FormData(event.currentTarget);
    const player = {
      user_id: user.id,
      player_name: playerInfo.get("player-name"),
    };
    const response = await fetch(
      "https://retromooapi.onrender.com/api/create",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      localStorage.setItem("active_account", data.player_id);
      enqueueSnackbar(
        `Player ${player.player_name} has been created and set as active account!`,
        { variant: "success" }
      );
      navigate("/account");
    } else {
      enqueueSnackbar("Player name already taken.", { variant: "warning" });
    }
  };

  return (
    <div className="create-container">
      <PrivateRoute />
      <NavBar />
      <AccountButton />
      <h2 className="create-welcome">Create A Player</h2>
      <div className="create-box">
        <div className="create-box-interior">
          <h4 className="create-box-title">Lorem Ipsum</h4>
          <div className="create-divider"></div>
          <div className="create-blurb">
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
                id="player-name"
                label="Player Name"
                name="player-name"
                value={playerName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPlayerName(event.target.value);
                }}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={playerName ? false : true}
              >
                Create A Player
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePlayer;
