import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";
import { faArrowRight, faBook, faFileLines, faHouse, faListCheck, faTags } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navigation() {
  const [navOpen, setNavOpen] = useState(true)

  const navViewChanger = () => {
    const navMain = document.getElementById("nav-main")
    const arrow = document.getElementById("viewer-icon")
    const innerText = document.querySelectorAll('.nav-inner-text')
    setNavOpen(!navOpen)

    if(navOpen){
      navMain.style.width = '50px'
      arrow.style.rotate = '360deg'
      innerText.forEach(el => {
        el.style.display = "none"
      })

    }else{
      navMain.style.width = '250px'
      arrow.style.rotate = '180deg'
      innerText.forEach(el => {
        el.style.display = "block"
      })
    }
  }
  return (
      <nav id="nav-main">
        <ul id="nav-list">
          <li className="nav-list-profile">
            <ProfileButton />
          </li>
          <div className="big-btn-container">
              <NavLink className='nav-btn-primary green' to="/">
                <FontAwesomeIcon icon={faFileLines} />
                <span className="nav-inner-text">Note</span>
              </NavLink>

              <NavLink className='nav-btn-primary purple' to="/">
                <FontAwesomeIcon icon={faListCheck} />
                <span className="nav-inner-text">Task</span>
              </NavLink>
          </div>
          <li>
            <NavLink className='nav-btn-primary text-white' to="/"><FontAwesomeIcon icon={faHouse} /><span className="nav-inner-text">Home</span></NavLink>
          </li>
          <li>
            <NavLink className='nav-btn-primary text-white' to="/"><FontAwesomeIcon icon={faFileLines} /><span className="nav-inner-text">Notes</span></NavLink>
          </li>
          <li>
            <NavLink className='nav-btn-primary text-white' to="/"><FontAwesomeIcon icon={faListCheck} /><span className="nav-inner-text">Tasks</span></NavLink>
          </li>
          <li>
            <NavLink className='nav-btn-primary text-white' to="/"><FontAwesomeIcon icon={faBook} /><span className="nav-inner-text">Notebooks</span></NavLink>
          </li>
          <li>
            <NavLink className='nav-btn-primary text-white' to="/"><FontAwesomeIcon icon={faTags} /><span className="nav-inner-text">Tags</span></NavLink>
          </li>
          {/* Maybe add a trash feature */}
        </ul>
      <button id="nav-close-btn" onClick={navViewChanger}>
        <FontAwesomeIcon id="viewer-icon" icon={faArrowRight} />
      </button>
      </nav>
  );
}

export default Navigation;
