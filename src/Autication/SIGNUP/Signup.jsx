import "./signup.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useContext } from "react";
import Input from "../Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Components/ContexApi/Contex";
import { HiHome } from "react-icons/hi";
import { User_signUp } from "../../Components/Api/Mutiation";
import { Admin_signUp } from "../../Components/Api/Mutiation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Signup({}) {
  const { changeTheme, display, setUsers, login_alert } =
    useContext(ThemeContext);
  const [errAlert, setErralert] = useState(false);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required(),
          email: yup.string().required(),
          brandname: yup.string(),
          password: yup.string().required(),
        })
        .required()
    ),
  });

  let agent = watch("brandname");

  const { data, error, isLoading, mutate, status } = useMutation(
    ["Admin_signUp"],
    agent ? Admin_signUp : User_signUp,
    {
      onSuccess: () => {
        Navigate("/login");
        login_alert();
      },
    }
  );


  const input = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 3,
      name: "password",
      type: "text",
      placeholder: "Password",
    },
    {
      id: 4,
      name: "brandname",
      type: "text",
      placeholder: "Brand Name (Agents only)",
    },
  ];

  useEffect(() => {
    !display && changeTheme();
  }, []);

  useEffect(() => {
    if (error) {
      setErralert(true);
      setTimeout(() => {
        setErralert(false);
      }, 2000);
    }
  }, [error]);

  return (
    <>
      <div className="sign_in">
        <HiHome
          onClick={() => {
            Navigate("/");
          }}
          className="signup_Home pointer"
        />
        <div className="sign_in_Wrap">
          <div className="sign_in_Wrap_head">
            <img
              className="pointer"
              onClick={() => {
                Navigate("/");
              }}
              style={{ width: 200 }}
              src="/Union.svg"
            />
            <h1> Create an account</h1>
          </div>
          {errAlert && (
            <p style={{ color: "red" }}>{error.response?.data.message}</p>
          )}
          <form
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
            onSubmit={handleSubmit((data) => mutate(data))}
          >
            {input.map((i) => (
              <Input
                register={register}
                key={i.id}
                name={i.name}
                placeholder={i.placeholder}
                label={i.label}
                type={i.type}
                errors={errors}
                readOnly={i.readOnly}
              />
            ))}
            {errors["select"] && (
              <span style={{ color: errors["select"] ? "red" : "#002642" }}>
                select field is required
              </span>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
                gap: 15,
              }}
            >
              <button disabled={isLoading} className="button pointer">
                {isLoading ? <div className="loader"></div> : " Sign up"}
              </button>

              <span className="signup_label">
                <p>Already have an account?</p>{" "}
                <p
                  style={{ color: "#0056FC" }}
                  onClick={() => Navigate("/login")}
                  className="pointer"
                >
                  Sign in{" "}
                </p>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
