import AccountButton from "../../components/AccountButton/AccountButton";
import NavBar from "../../components/NavBar/NavBar";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <NavBar />
      <AccountButton />
      <h2 className="about-welcome">About RetroMOO</h2>
      <div className="about-box">
        <div className="about-box-interior">
          <h4 className="about-box-title">A homage to the 90s</h4>
          <div className="about-divider"></div>
          <div className="about-blurb">
            <p>
              Inspired by the MUDs and MOOs ("Multi-User Dungeons" and "MUD,
              Object Oriented", respectively) of the late 90s and early 00s,
              RetroMOO is an attempt to capture the nostalgia of text based
              multiplayer RPGs, without the barriers to play that were inherent
              in many of those games. RetroMOO does not require a telnet client,
              instead relying on a web-based terminal that connects to the
              server as soon as it loads. Player creation is also managed
              independently of the server, and the actively selected player is
              then loaded into the server. Every 
            </p>
            <br />
            <p>
              RetroMOO is still very much a WIP, but can be played in its
              current state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
