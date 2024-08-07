import React from "react";
import { facebook, instagram, gmail } from "../assets";

const Modal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col w-[500px] h-[500px] rounded-lg shadow-md bg-white p-[25px] relative">
        <div className="flex justify-end">
          <button
            onClick={() => closeModal(false)}
            className="bg-pink-600 text-[25px] cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="inline-block text-center mt-[10px]">
          <h1>Choose your preferred app to vote</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <img src={facebook} alt="Facebook" /> or
          <img src={instagram} alt="Instagram" /> or
          <img src={gmail} alt="Gmail" />
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => closeModal(false)}
            className="w-[150px] h-[45px] m-[10px] bg-blue-600 text-white rounded-sm text-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
