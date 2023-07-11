import "./login.css";
import {
  MutationCache,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState, useContext, useEffect, useRef } from "react";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Components/ContexApi/Contex";
import { addUser } from "../../REDUX/features";
import { clearUser } from "../../REDUX/features";
import { useDispatch, useSelector } from "react-redux";
import { HiHome } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User_login, Log_out } from "../../Components/Api/Mutiation";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const dispach = useDispatch();
  const { changeTheme, display, verifyAlert, login_alert } =
    useContext(ThemeContext);
  const user = useSelector((state) => state.Commerce.user);
  const [errAlert, setErralert] = useState(false);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // const { mutate: mutate_log_out } = useMutation(["mutate_log_out"], Log_out, {
  //   onSuccess: (data) => {
  //     dispach(clearUser());
  //     console.log("logged out");
  //     console.log(data);
  //     login_alert();
  //   },
  // });

  const { data, error, isLoading, mutate, status } = useMutation(
    ["user-login"],
    User_login,
    {
      onSuccess: (data) => {
        Navigate("/");
        // console.log("suscess");
        dispach(addUser(data?.data.data));
        // !data?.data.data.verify
        //   ? mutate_log_out(data?.data.data._id)
        // :

        // console.log(data, user);
      },
    }
  );

  const input = [
    {
      id: 1,
      placeholder: "Email",
      type: "email",
      name: "email",
    },
    {
      id: 2,
      placeholder: "Password",
      type: "password",
      name: "password",
    },
  ];

  useEffect(() => {
    if (error) {
      setErralert(true);
      setTimeout(() => {
        setErralert(false);
      }, 2000);
    }
  }, [error]);
  useEffect(() => {
    !display && changeTheme();
  }, []);

  return (
    <div className="login_in">
      {/* {verifyAlert && (
        <a className="verifyAlert" href={"https://mail.google.com"}>
          please click here or check your Email for a verification link
        </a>
      )} */}
      <HiHome
        onClick={() => {
          Navigate("/");
        }}
        className="login_Home pointer"
      />
      <div className="login_in_Wrap">
        <div className="login_in_Wrap_head">
          <img
            className="pointer"
            onClick={() => {
              Navigate("/");
            }}
            style={{ width: 200 }}
            src="/Union.svg"
          />
          <h1> Log into account</h1>
        </div>
        {errAlert && (
          <p style={{ color: "red" }}>{error?.response?.data.message}</p>
        )}
        <form
          className="input_contain"
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
            />
          ))}

          <div className="login_action">
            <button className="login_button pointer">
              {isLoading ? <div className="loader"></div> : "Sign in"}
            </button>
            <span className="login_label">
              <p>Don’t have an account?</p>{" "}
              <p
                className="pointer"
                style={{ color: "#0056FC" }}
                onClick={() => Navigate("/signUp")}
              >
                Sign up
              </p>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
