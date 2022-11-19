import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// Navigate se prije zvao Redirect

function Post2() {
  const status = 200;

  const navigate = useNavigate();

  const onClick = () => {
    console.log("Hello");
    //dobro za redirectanje nakon što smo napravili nešto na serveru npr
    navigate("/about");
  };

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }
  return (
    <div>
      <h1>Post2</h1>
      <button className="btn btn-secondary" onClick={onClick}>
        Click to redirect to /about
      </button>
      <Routes>
        {/* Pravi route ovdje je /post2/show */}
        {/* OVAJ DIO ĆE SE POKAZATI USKLJUČIVO AKO JE URL TAKAV, A GORNJI DIO SVAKAKO AKO IDEMO NA /post2/ i na /post2/show */}
        <Route path="/show" element={<h1>Hello from the Route /show</h1>} />
      </Routes>
    </div>
  );
}

export default Post2;
