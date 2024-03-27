import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const PlayerRoute = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.user_id) {
      if (localStorage.active_account) {
        null;
      } else {
        enqueueSnackbar("Please create a player first.", {
          variant: "warning",
        });
        navigate("/create-player");
      }
    } else {
      enqueueSnackbar("Please log in first.", { variant: "warning" });
      navigate("/login");
    }
  });
  return null
};

export default PlayerRoute;
