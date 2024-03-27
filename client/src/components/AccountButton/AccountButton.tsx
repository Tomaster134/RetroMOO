import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = React.useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log({ user });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  const handleLogout = () => {
    handleClose()
    setUser({
      id: -1,
      username: '',
      email: '',
      active_account: -1
    });
    localStorage.clear();
    enqueueSnackbar("Logged out.", {variant: "warning"})
    navigate("/")
  }


  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          position: "fixed",
          top: "2px",
          right: "20px",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.username ? user.username[0] : "?"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {user.username ? (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "whitesmoke",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
            
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>Home
              </MenuItem>
            </Link>
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>
                My account
              </MenuItem>
            </Link>
            <Link
              to="/play"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>Play!
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>) : (
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "whitesmoke",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>Home
              </MenuItem>
            </Link><Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>
                Login
              </MenuItem>
            </Link>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleClose}>
                Sign Up
              </MenuItem>
            </Link>
      </Menu>
      )}

    </React.Fragment>
  );
}
