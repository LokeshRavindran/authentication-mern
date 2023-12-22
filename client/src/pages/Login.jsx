import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import FormTextInput from "../components/FormInput/FormTextInput";
import FormButton from "../components/FormButton/FormButton";
import { checkUser } from "../service/authentication";
import { successToast, errorToast } from "../helper/toastHelper";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // this has to be passed to the input field or we can spread the register directly on input
  // const { name, ref, onChange, onBlur } = register("username");
  const onFormSubmit = async (data) => {
    try {
      const response = await checkUser({
        username: data.username,
        password: data.password,
      });
      if (response.status) {
        localStorage.setItem("isLoggedIn", response.status);
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        authContext.setUser({
          isLoggedIn: response.status,
          token: response.token,
          username: response.username,
        });
        successToast("Login successful");
        navigate("/homepage");
      }
    } catch (error) {
      console.log("error", error.message);
      errorToast(error.message);
    }
  };

  return (
    <div className="layout">
      <div className="bg-white rounded-3xl w-96 p-4 pb-8">
        <h1 className="text-center font-bold text-lg">
          Enter username and password to login
        </h1>
        <form
          className="flex flex-col mt-4"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate // prevents browsers default validations
        >
          <FormTextInput
            type="input"
            label="Username"
            {...register("username", {
              required: "username is required",
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "username will be an email id",
              },
              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== "test@gmail.com" ||
              //     "Enter a valid email address"
              //   );
              // },
              validate: {
                notTestEmail: (fieldValue) => {
                  return (
                    fieldValue !== "test@gmail.com" ||
                    "Enter a valid email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("test.com") ||
                    "This domain username is not supported"
                  );
                },
              },
            })}
            error={errors}
          />
          <FormTextInput
            type="password"
            label="Password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 4,
                message: "password cannot be less than 4 characters",
              },
              maxLength: 20,
            })}
            error={errors}
          />
          <FormButton name="Login" />
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </div>
  );
};

export default Login;
