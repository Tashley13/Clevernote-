import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navigation() {
  const [navOpen, setNavOpen] = useState(true)

  const navViewChanger = (e) => {
    let navMain = document.getElementById("nav-main")
    let arrow = document.getElementById("viewer-icon")
    setNavOpen(!navOpen)

    if(navOpen){
      navMain.style.width = '50px'
      arrow.style.rotate = '360deg'
    }else{
      navMain.style.width = '250px'
      arrow.style.rotate = '180deg'
    }
  }
  return (
      <nav id="nav-main">
        <ul id="nav-list">
          <li className="nav-list-profile">
            <ProfileButton />
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      <button id="nav-close-btn" onClick={navViewChanger}>
        <FontAwesomeIcon id="viewer-icon" icon={faArrowRight} />
      </button>
      </nav>
  );
}

export default Navigation;
