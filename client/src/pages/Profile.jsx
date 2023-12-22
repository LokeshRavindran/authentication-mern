import React, { useState, useEffect, useContext } from "react";
import { getProfileInformation } from "../service/general";
import { errorToast } from "../helper/toastHelper";
import AuthContext from "../context/AuthContext";

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

  return (
    <div className="layout">
      <div className="bg-white rounded-2xl p-4 w-96">
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
          <span className="font-semibold">Country:</span> {profileData.country}
        </p>
        <p>
          <span className="font-semibold">Company:</span> {profileData.company}
        </p>
      </div>
    </div>
  );
};

export default Profile;
