import React,{useState} from "react";
import { MdWhereToVote } from "react-icons/md";
import Modal from "./Modal";

const VoteButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setOpenModal(true);
      }}
      className="inline-flex items-center justify-center bg-pink-600 text-lg font-semibold text-white shadow-sm transition-all duration-150 rounded-xl pl-8 pr-5 py-4 hover:bg-pink-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Vote Your Favorite
      <MdWhereToVote className="text-white mx-[7px]" />
      {openModal && <Modal closeModal={setOpenModal} />}
    </button>
  );
};

export default VoteButton;
