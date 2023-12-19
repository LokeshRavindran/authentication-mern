import React, { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormTextInput from "../components/FormInput/FormTextInput";
// import FormNumberInput from "../components/FormInput/FormNumberInput";
import FormSelectInput from "../components/FormInput/FormSelectInput";
import { getCountriesList } from "../service/otherServices";
import { sortObjectOnParticularStringKey } from "../utils/dataUtilityHelper";
import FormButton from "../components/FormButton/FormButton";
import { addUser } from "../service/authentication";
import { successToast, errorToast } from "../helper/toastHelper";

const Signup = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { control, register, watch, handleSubmit, formState } = form;
  const { errors } = formState;
  const [countriesList, setCountriesList] = useState([]);
  const watchPasswordValue = watch("password");

  useEffect(() => {
    async function getCountries() {
      try {
        const countries = await getCountriesList();
        await sortObjectOnParticularStringKey(countries, "name");
        setCountriesList(countries);
      } catch (error) {
        console.log("error", error);
      }
    }
    getCountries();
  }, []);

  const onFormSubmit = async (data) => {
    try {
      const user = await addUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        country: data.country,
        company: data.company,
      });
      if (user.status) {
        successToast("Sign-up successful. Please login.");
        navigate("/login");
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div className="layout">
      <div className="bg-white rounded-3xl p-4 pb-8 w-[520px] max-sm:w-auto">
        <h1 className="text-center font-bold text-lg">
          Please fill the required details to signup
        </h1>
        <form
          className="flex flex-col mt-8"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate // prevents browsers default validations
        >
          <div className="flex gap-4 max-sm:flex-col">
            <FormTextInput
              type="text"
              label="Name*"
              error={errors}
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormTextInput
              type="text"
              label="Phone*"
              error={errors}
              {...register("phone", {
                required: "Mobile number is required",
                maxLength: {
                  value: 10,
                  message: "Phone number should not exceed 10 digits",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Phone number can only contain numbers",
                },
              })}
            />
          </div>
          <FormTextInput
            type="text"
            label="Email* (This will be your username)"
            error={errors}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "username will be an email id",
              },
            })}
          />
          <FormTextInput
            type="password"
            label="Password*"
            error={errors}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should not be less than 6 characters",
              },
            })}
          />
          <FormTextInput
            type="password"
            label="Confirm Password*"
            error={errors}
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (fieldValue) => {
                if (fieldValue !== watchPasswordValue) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          <div className="flex gap-4 child:w-2/4 max-sm:flex-col max-sm:child:w-auto">
            <FormSelectInput
              label="Country*"
              error={errors}
              options={countriesList}
              {...register("country", {
                required: "Country is required",
                validate: (fieldValue) => {
                  if (fieldValue === "-- Please select an option --") {
                    return "Please select your country";
                  }
                },
              })}
              additionalClasses={"w-full"}
            />
            <FormTextInput
              type="text"
              label="Company"
              error={errors}
              {...register("company")}
            />
          </div>
          <FormButton name="Sign-Up" />
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </div>
  );
};

export default Signup;
