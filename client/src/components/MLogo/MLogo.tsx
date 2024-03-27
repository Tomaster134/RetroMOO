import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import logoImg from '/logo.png'

const MLogo = () => {
  return (
    <Avatar src={logoImg} sx={{ height: "32px", width: "32px", position: "absolute", zIndex: 1, margin: "8px"}} variant="square" component={Link} to="/"/>
  )
}
export default MLogo