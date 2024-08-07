import React from 'react'
import { MdWhereToVote } from "react-icons/md";

const VoteButton = () => {
  return (
    <button
    type="button"
    className="inline-flex items-center justify-center bg-pink-700 text-lg font-semibold text-white shadow-sm transition-all duration-150 rounded-xl hover:bg-pink-500 py-3 px-5 sm:py-4 sm:px-16 w-full sm:w-auto"
    href=""
  >
    Vote Your Favorite
    <MdWhereToVote className='text-white' />
  </button>
  )
}

export default VoteButton