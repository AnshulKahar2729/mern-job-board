import React from "react";

function secondaryBtn({ children }) {
  return (
    <button className="bg-gray-400 py-2 px-4 text-white rounded-md ">
      {children}
    </button>
  );
}

export default secondaryBtn;
