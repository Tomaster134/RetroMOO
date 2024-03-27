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
          <h4 className="home-box-title">Lorem Ipsum</h4>
          <div className="home-divider"></div>
          <div className="home-blurb">
            <p>
              Lorem ipsum dolor sit amet. At doloremque quia hic deleniti
              veritatis ut nulla quisquam eum quia porro ut adipisci voluptas
              sed earum tenetur et nesciunt soluta. Qui omnis deserunt ex
              voluptates alias vel amet vero non internos illum aut porro
              molestiae. A quisquam dignissimos non illum galisum sed voluptates
              voluptas vel quisquam similique.{" "}
            </p>
            <br />
            <p>
              Aut vitae illum ut veritatis beatae qui error illo et facere
              eveniet? Quo voluptas dolorem qui reprehenderit enim et ipsa
              possimus et odit accusamus non consequatur explicabo et voluptatum
              minima eum culpa reprehenderit? Et voluptatem modi ex suscipit
              omnis qui similique voluptates eos incidunt odio et quibusdam
              quisquam. Et accusantium Quis ea quasi error qui consequatur
              commodi sed aperiam veniam est ratione cumque hic omnis beatae ut
              dolores repudiandae.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
