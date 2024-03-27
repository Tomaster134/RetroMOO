import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"

const MLogo = () => {
  return (
    <Avatar src="src/assets/imgs/favicon.png" sx={{ height: "32px", width: "32px", position: "absolute", zIndex: 1, margin: "8px"}} variant="square" component={Link} to="/"/>
  )
}
export default MLogo