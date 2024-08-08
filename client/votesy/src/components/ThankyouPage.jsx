import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const ThankyouPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col w-[500px] h-[300px] rounded-lg shadow-md bg-white p-[25px] relative gap-2">
        <div className="flex justify-center text-pink-600">
          DONE <FaCheckCircle />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 text-gray-700">
          You've successfully voted for the candidate of you choice, we will go throw the results and give the deserving winner their deserved reward. Thanks for you time once again
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
  )
}

export default ThankyouPage