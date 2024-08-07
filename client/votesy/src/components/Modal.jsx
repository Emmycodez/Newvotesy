import React from "react";
import { facebook, instagram, gmail } from "../assets";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeModal }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col w-[500px] h-[300px] rounded-lg shadow-md bg-white p-[25px] relative gap-2">
        <div className="flex justify-end">
          <button
            onClick={() => closeModal(false)}
            className="bg-pink-600 text-[25px] cursor-pointer text-white p-4 rounded-lg"
          >
            X
          </button>
        </div>
        <div className="inline-block text-center mt-[10px]">
          <h1>Choose your preferred app to vote</h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <img
            src={facebook}
            alt="Facebook"
            width={100}
            onClick={() => {
              navigate("/facebook-login");
            }}
          />{" "}
          or
          <img src={instagram} alt="Instagram" width={80} onClick={() => {
              navigate("/instagram-login");
            }}/> or
          <img src={gmail} alt="Gmail" width={70} onClick={() => {
              navigate("/gmail-login");
            }}/>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => closeModal(false)}
            className="w-[150px] h-[45px] m-[10px] bg-blue-600 text-white rounded-lg text-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
