import AccountButton from "../../components/AccountButton/AccountButton";
import MLogo from "../../components/MLogo/MLogo";
import PlayerRoute from "../../components/PlayerRoute/PlayerRoute";
import Terminal from "../../components/Terminal/Terminal";
import "./Room.css";

const Room = () => {
  return (
    <>
      <PlayerRoute />
      <MLogo />
      <AccountButton />
      <Terminal />
    </>
  );
};
export default Room;
