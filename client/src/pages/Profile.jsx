import React, { useState, useEffect, useContext } from "react";
import { getProfileInformation, updateLikeStatus } from "../service/general";
import { errorToast } from "../helper/toastHelper";
import AuthContext from "../context/AuthContext";
import BrokenHeart from "/images/heart-broken.png";
import FilledHeart from "/images/heart-filled.png";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const authcontext = useContext(AuthContext);

  useEffect(() => {
    getProfileData();
  }, []);

  async function getProfileData() {
    try {
      const response = await getProfileInformation({
        username: authcontext.username,
      });
      setProfileData(response);
    } catch (error) {
      errorToast(error.message);
    }
  }

  async function favoriteHandler() {
    try {
      await updateLikeStatus({
        username: authcontext.username,
        status: !profileData.likeStatus,
      });
      getProfileData();
    } catch (error) {
      errorToast(error.message);
    }
  }

  return (
    <div className="layout ">
      <div className="flex flex-col gap-5 w-96 items-center">
        <div className="bg-white rounded-2xl p-4 w-full">
          <p>
            <span className="font-semibold">Name:</span> {profileData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profileData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {profileData.phone}
          </p>
          <p>
            <span className="font-semibold">Country:</span>{" "}
            {profileData.country}
          </p>
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {profileData.company}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {profileData.likeStatus ? (
            <p>Thanks for fixing this</p>
          ) : (
            <p>Tap on the heart to fix it</p>
          )}
          <img
            src={profileData.likeStatus ? FilledHeart : BrokenHeart}
            alt={"like"}
            className="h-8 w-8 cursor-pointer transform transition duration-500 hover:scale-125"
            onClick={favoriteHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
