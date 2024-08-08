import React, { useState } from "react";
import { MdOutlineWhereToVote } from "react-icons/md";
import Modal from "./Modal";

const ClickVote = () => {
  const [openModal, setOpenModal] = useState(false);



  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpenModal(true);
        }}
        className="inline-flex items-center justify-center bg-white text-lg font-semibold text-pink-600 shadow-sm transition-all duration-150 rounded-xl pl-8 pr-5 py-4 hover:bg-pink-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Click Here to vote
        <MdOutlineWhereToVote className="mx-[7px]" />
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default ClickVote;
