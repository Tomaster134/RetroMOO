import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const PrivateRoute = () => {

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.user_id) {
      null;
    } else {
      enqueueSnackbar("Please log in first.", { variant: "warning" });
      navigate("/login");
    }
  }, []);
  return null;
};

export default PrivateRoute;
