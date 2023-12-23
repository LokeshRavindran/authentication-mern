import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DownArrow from "/assets/images/down-arrow.png";
import ProfileIcon from "/assets/images/profile-icon.png";

const ProfileOptions = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);

  const logoutHandler = () => {
    authContext.setUser({
      isLoggedIn: false,
      token: "",
      username: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  };

  const profileHandler = () => {
    setIsProfileOptionsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-0.5">
        <img src={ProfileIcon} alt="profile-icon" className="h-10 w-10" />
        <p>Profile</p>
        <img
          src={DownArrow}
          alt="down-arrow"
          className="h-6 w-6 cursor-pointer"
          onClick={profileHandler}
        />
      </div>
      {isProfileOptionsOpen && (
        <ul className="bg-white absolute child:p-2 child:px-4 child:cursor-pointer rounded-md border-black border w-max top-11 right-0">
          <li
            onClick={() => {
              navigate("/profile");
              profileHandler();
            }}
            className="border-b border-black"
          >
            My Profile
          </li>
          <li
            onClick={() => {
              logoutHandler();
              profileHandler();
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileOptions;
