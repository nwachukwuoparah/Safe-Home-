import React, { useRef, useEffect, useState } from "react";
import "./input.css";
import { MdRemoveRedEye } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Input = ({ errors, name, label, type, placeholder, register }) => {
  return (
    <>
      <label className="input_label">
        <input
          className={errors[name] ? "aut_input1" : "aut_input"}
          placeholder={placeholder}
          {...register(name)}
          type={type}
          name={name}
        />
        {errors[name] && (
          <span style={{ color: errors[name] ? "red" : "#002642" }}>
            {name} field is required
          </span>
        )}
      </label>
    </>
  );
};

export default Input;
