import React, { useEffect, useState, useContext } from "react";
import { getHomepageSections } from "../service/general";
import { errorToast } from "../helper/toastHelper";
import AuthContext from "../context/AuthContext";
import FilledHeart from "/assets/images/heart-filled.png";

const Homepage = () => {
  const authContext = useContext(AuthContext);
  const [homepageData, setHomepageData] = useState({});
  const [activeSection, setActiveSection] = useState("frontend");
  const isLoggedIn = authContext.isLoggedIn;

  useEffect(() => {
    async function getHomepageData() {
      try {
        const response = await getHomepageSections();
        setHomepageData(response);
      } catch (error) {
        errorToast(error.message);
      }
    }
    if (isLoggedIn) {
      getHomepageData();
    } else {
      setHomepageData({});
    }
  }, [isLoggedIn]);

  return (
    <main className="text-center m-auto mt-8 max-w-2xl px-6 pb-6">
      <h1>Homepage</h1>
      {isLoggedIn && (
        <>
          <div className="flex items-center justify-center">
            <p>No of Hearts: {homepageData.likesCount}</p>
            <img src={FilledHeart} alt={"heart"} className="h-8 w-8" />
          </div>
          <p>
            Get to know about the application by going through the below tabs.
          </p>
        </>
      )}
      <ul className="flex mt-6 justify-center gap-12">
        {homepageData?.data?.length > 0 ? (
          homepageData?.data.map((section) => (
            <li key={section}>
              <button
                className="capitalize border-2 border-black rounded-md p-2"
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            </li>
          ))
        ) : (
          <p>Please login to view the content</p>
        )}
      </ul>
      {activeSection === "frontend" && isLoggedIn && <FrontendContent />}
      {activeSection === "backend" && isLoggedIn && <BackendContent />}
    </main>
  );
};

const FrontendContent = () => {
  return (
    <ul className="mt-4 list-disc list-inside text-start">
      <li>
        This application's frontend is created using{" "}
        <span className="text-red-500">React with vite.</span>
      </li>
      <li>
        This application is created to{" "}
        <span className="text-red-500">
          practice authentication of an application using jwt token
        </span>{" "}
        sent from backend and the authentication state is managed with the help
        of React context in frontend.
      </li>
      <li>
        It also has a <span className="text-red-500">protected route</span> so
        that even if the user tries to directly access it, he/she will be
        <span className="text-red-500"> redirected to the login page.</span>
      </li>
      <li>
        The login and signup pages are created using{" "}
        <span className="text-red-500">react-hook-form package </span>
        which also helps in{" "}
        <span className="text-red-500">
          form validation and error handling.
        </span>
      </li>
      <li>
        <span className="text-red-500">Api calls</span> are handled with{" "}
        <span className="text-red-500">axios package.</span>
      </li>
      <li>
        The application's <span className="text-red-500">CSS</span> are handled
        with the help of{" "}
        <span className="text-red-500">tailwind css package.</span>
      </li>
    </ul>
  );
};

const BackendContent = () => {
  return (
    <ul className="mt-4 list-disc list-inside text-start">
      <li>
        This application's backend is created using{" "}
        <span className="text-red-500">node with express js</span> and
        <span className="text-red-500"> database as mongodb.</span>
      </li>
      <li>
        This application uses <span className="text-red-500">jsonwebtoken</span>{" "}
        package to create{" "}
        <span className="text-red-500">
          jwt tokens to handle authorization of the api requests.
        </span>{" "}
        Tokens have a validity of 24h to prevent the wrongful use of tokens.
      </li>
      <li>
        <span className="text-red-500">bcryptjs</span> package is used to{" "}
        <span className="text-red-500">
          encrypt and decrypt sensitive data.
        </span>
      </li>
      <li>
        <span className="text-red-500">mongoose</span> package is used for{" "}
        <span className="text-red-500">
          database connectivity along with schema creation for data
        </span>
        .
      </li>
      <li>
        There are 5 apis currently created for this application such as
        <ol className="ml-8 list-decimal list-inside">
          <li>Login - POST</li>
          <li>Signup - POST</li>
          <li>Homepage sections - GET</li>
          <li>Profile - POST</li>
          <li>UpdateLikeStatus - POST</li>
        </ol>
      </li>
      <li>
        Auth middleware is created to validate each api request for its
        authenticity.
      </li>
    </ul>
  );
};

export default Homepage;
