import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";
import { faArrowRight, faBook, faFileLines, faHouse, faListCheck, faTags} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as noteActions from "../../redux/note"
import CreateTaskModal from "../CreateTaskModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import NotebookAddModal from "../NotebookAddModal/NotebookAddModal";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(true);
  const { user } = useSelector(state => state.session);
  const { setModalContent } = useModal();

  const navViewChanger = () => {
    const navMain = document.getElementById("nav-main");
    const arrow = document.getElementById("viewer-icon");
    const innerText = document.querySelectorAll('.nav-inner-text');
    setNavOpen(!navOpen);

    if (navOpen) {
      navMain.style.width = '90px';
      arrow.style.rotate = '360deg';
      innerText.forEach(el => {
        el.style.display = "none";
      });
    } else {
      navMain.style.width = '250px';
      arrow.style.rotate = '180deg';
      innerText.forEach(el => {
        el.style.display = "block";
      });
    }
  };

  const openTaskModal = () => {
    setModalContent(<CreateTaskModal />);
  };

	const openTagModal = () => {
    setModalContent(<TagCreate />)
  };

  const handleNewNote = async (e) => {
    e.preventDefault();
    const newNote = await dispatch(noteActions.createNote())
    // console.log("OK: " , newNote)
    if (newNote) {
      navigate(`/notes/${newNote.id}/edit`)
    }
    // console.log("NEWNOTE: ",newNote)
  }

  return (
    <nav id="nav-main">
      <ul id="nav-list">
        <li className="nav-list-profile">
          {!user ? (
            <ProfileButton />
          ) : (
            <div id="nav-logged-in-profile">
              <ProfileButton />
              {navOpen && (
                <div>
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                </div>
              )}
            </div>
          )}
        </li>
        <div className="big-btn-container">
          <button className="nav-btn-primary green" onClick={handleNewNote}>
            <FontAwesomeIcon icon={faFileLines} />
            <span className="nav-inner-text">Note</span>
          </button>
          <button className="nav-btn-primary purple" disabled= {!user} onClick={openTaskModal}>
            <FontAwesomeIcon icon={faListCheck} />
            <span className="nav-inner-text">Task</span>
          </button>
        </div>
        <li>
          <NavLink className="nav-btn-primary text-white" to="/">
            <FontAwesomeIcon icon={faHouse} />
            <span className="nav-inner-text">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-btn-primary text-white" to="/notes">
            <FontAwesomeIcon icon={faFileLines} />
            <span className="nav-inner-text">Notes</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-btn-primary text-white" to="/tasks">
            <FontAwesomeIcon icon={faListCheck} />
            <span className="nav-inner-text">Tasks</span>
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-btn-primary text-white" to="/notebooks">
            <FontAwesomeIcon icon={faBook} />
            <span className="nav-inner-text">Notebooks</span>
          </NavLink>
        </li>

        <li>
				<NavLink className='nav-btn-primary text-white' to="/tags"><FontAwesomeIcon icon={faTags} /><span className="nav-inner-text">Tags</span></NavLink>
        </li>
      </ul>
      <button id="nav-close-btn" onClick={navViewChanger}>
        <FontAwesomeIcon id="viewer-icon" icon={faArrowRight} />
      </button>
    </nav>
  );
}

export default Navigation;
