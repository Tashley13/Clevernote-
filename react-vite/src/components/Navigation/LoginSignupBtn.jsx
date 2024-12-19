/** @format */

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import "./Navigation.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LoginSignupBtn = ({ navOpen }) => {
	return (
		<div className="btn-container">
			{navOpen ? (
				<>
					<OpenModalMenuItem
						itemText="Sign Up"
						modalComponent={<SignupFormModal />}
					/>
					<OpenModalMenuItem itemText="Log In" modalComponent={<LoginFormModal />} />
				</>
			) : (
				<OpenModalMenuItem icon={faUser} modalComponent={<LoginFormModal />} />
			)}
		</div>
	);
};
export default LoginSignupBtn;
