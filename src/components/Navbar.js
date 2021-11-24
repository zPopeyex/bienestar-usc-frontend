import React from "react";
import Logo from "../resources/logocuds.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <img src={Logo} whidth="70px" height="70px" />

        <div className="col-4 d-flex flex-column justify-content">
          <a className="navbar-brand" href="index">
            CUDS - Cultura universitaria y deporte Santiaguino
          </a>
        </div>

        <div className="" id="navbarText">
          <span className="navbar-text">Leonardo Ospina & Nedith Cortez</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
