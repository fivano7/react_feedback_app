import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutIconLink() {
  return (
    <div className="about-link">
      {/* <Link> umjesto <a> i to umjesto href. Razlog je što to ne refresha 
      stranicu kao <a> nego ide nazad bez refresha, instantno je, brže */}

      {/* PROŠIRIVANJE MOGUĆNOSTI Link-a
      <Link to={{
        pathname: "/about",
        search: "?sort=name",
        hash: "#hello"
      }}> */}

      <Link to="/about">
        <FaQuestion size={30} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
