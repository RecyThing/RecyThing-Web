import React, { useState } from "react";

const TabButton = ({ label, count, active, onClick }) => {
  return (
    <div
      className={`w-[${label.length * 10}px] h-[60px] px-10 py-4 ${
        active ? "bg-green-500" : "bg-[zinc-500]"
      } rounded-[11px] justify-center items-center gap-2.5 inline-flex`}
      onClick={onClick}
    >
      <div
        className={`text-center text-${
          active ? "white" : "green-500"
        } text-base font-normal font-['Inter']`}
      >
        {label}
      </div>
      <div
        className={`px-3 py-0.5 ${
          active ? "bg-white" : "bg-green-500"
        } rounded-full flex-col justify-start items-start gap-2.5 inline-flex`}
      >
        <div
          className={`text-center text-${
            active ? "green-500" : "white"
          } text-sm font-semibold font-['Inter'] leading-normal`}
        >
          {count}
        </div>
      </div>
    </div>
  );
};
export default TabButton;
