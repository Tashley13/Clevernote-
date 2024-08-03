import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";
import { faArrowRight, faFileLines, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navigation() {
  const [navOpen, setNavOpen] = useState(true)

  const navViewChanger = () => {
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
          <div className="big-btn-container">
              <NavLink className='nav-btn-primary green' to="/"><FontAwesomeIcon icon={faFileLines} /> <span>Note</span></NavLink>

              <NavLink className='nav-btn-primary purple' to="/"> <FontAwesomeIcon icon={faListCheck} />Task</NavLink>
          </div>
          <li>
            <NavLink className='nav-btn-primary' to="/"></NavLink>
          </li>
        </ul>
      <button id="nav-close-btn" onClick={navViewChanger}>
        <FontAwesomeIcon id="viewer-icon" icon={faArrowRight} />
      </button>
      </nav>
  );
}

export default Navigation;
