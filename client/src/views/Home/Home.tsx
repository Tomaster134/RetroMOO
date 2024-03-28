import { Link } from "react-router-dom";
import AccountButton from "../../components/AccountButton/AccountButton";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <AccountButton />
      <h2 className="home-welcome">Welcome to RetroMOO!</h2>
      <div className="home-box">
        <div className="home-box-interior">
          <h4 className="home-box-title">A new world. A new adventure.</h4>
          <div className="home-divider"></div>
          <div className="home-blurb">
            <p>
              Welcome to RetroMOO. If you want to dive right in, just sign up, create an account, and you're ready to join the world!{" "}
            </p>
            <br />
            <p>
              The end goal for RetroMOO is to have a fully realized world that has interactive NPCs, quests, and to give players the freedom to make impactful choices that affect the world they operate in. Any and all suggestions are appreciated. To read more about the background behind the game, visit the <Link to='/about' style={{ textDecoration: "none", color: "dodgerblue" }}><strong>About</strong></Link> page.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
