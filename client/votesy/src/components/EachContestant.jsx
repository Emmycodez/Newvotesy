import React from 'react';
import ClickVote from './ClickVote';

const EachContestant = ({ name, image }) => {

  console.log(name, image);
  return (
    <div className="border-solid border-4 border-white rounded-lg px-6 py-8 flex flex-col justify-center items-center">
      <div className="flex items-center justify-start">
        <div className="inline-flex px-2 py-2 w-full items-center justify-center bg-blue-600 text-xl font-bold text-white shadow-lg rounded-lg">
          {name}
        </div>
      </div>
      <div className="w-full max-w-[600px] h-64 rounded-lg overflow-hidden mt-6">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover object-center"
            alt={name}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="text-sm font-normal text-gray-700 mt-2 sm:text-base sm:mt-3 text-center h-14 py-[10px]">
        <ClickVote />
      </div>
    </div>
  );
};

export default EachContestant;
