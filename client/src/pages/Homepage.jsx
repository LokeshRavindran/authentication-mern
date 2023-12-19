import React, { useEffect, useState, useContext } from "react";
import { getHomepageSections } from "../service/general";
import { errorToast } from "../helper/toastHelper";
import AuthContext from "../context/AuthContext";

const Homepage = () => {
  const authContext = useContext(AuthContext);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState("frontend");
  const isLoggedIn = authContext.isLoggedIn;

  useEffect(() => {
    async function getHomepageData() {
      try {
        const response = await getHomepageSections();
        setSections(response.data);
      } catch (error) {
        errorToast(error.message);
      }
    }
    if (isLoggedIn) {
      getHomepageData();
    } else {
      setSections([]);
    }
  }, [isLoggedIn]);

  return (
    <div className="text-center m-auto mt-8 max-w-2xl px-6 pb-6">
      <h1>Homepage</h1>
      <ul className="flex mt-6 justify-center gap-12">
        {sections.length > 0 ? (
          sections.map((section) => (
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
    </div>
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
        <span className="text-red-500">mongoose</span> package is used to{" "}
        <span className="text-red-500">
          database connectivity along with schema creation for data
        </span>
        .
      </li>
      <li>
        There are 3 apis currently created for this application such as
        <ol className="ml-8 list-decimal list-inside">
          <li>Login</li>
          <li>Signup</li>
          <li>Homepage sections - Frontend, Backend</li>
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
