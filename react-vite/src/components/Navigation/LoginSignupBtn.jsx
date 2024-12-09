/** @format */

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import './Navigation.css'

const LoginSignupBtn = () => {
  return (
    <div className='btn-container'>
      <OpenModalMenuItem
        itemText='Log In'
        modalComponent={<LoginFormModal />}
      />
      
      <OpenModalMenuItem
        itemText='Sign Up'
        modalComponent={<SignupFormModal />}
      />
    </div>
  );
};

export default LoginSignupBtn;
