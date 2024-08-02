import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul id="nav-list">
        <li className="nav-list-profile">
          <ProfileButton />
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>


      </ul>
    </nav>
  );
}

export default Navigation;
