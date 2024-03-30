import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import logoImg from '/logo.png'

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ width: "100%", height: "48px", bgcolor: "whitesmoke" }}>
      <Avatar src={logoImg} sx={{ height: "32px", width: "32px", position: "absolute", zIndex: 1, margin: "8px"}} variant="square" component={Link} to="/"/>    
      <Tabs value={pathname} centered>
        <Tab label="Home" component={Link} to="/" value="/" />
        <Tab label="About" component={Link} to="/about" value="/about" />
        <Tab label="Account" component={Link} to="/account" value="/account" />
        <Tab label="Create Player" component={Link} to="/create-player" value="/create-player" />
        <Tab label="Play Now!" component={Link} to="/play" value="/play" />
      </Tabs>
    </Box>
  );
}
