import React from "react";

const SelectRow = () => {
  const options = [
    'todo',
    'doing',
    'done'
  ]
  return (
    <select className="select-bordered border-[#828FA3] bg-transparent text-[var(--tasks-text)] select w-full max-w-full">
      {options.map((option, index) => {
        return <option value={option} key={index}>{option}</option>
      })}
    </select>
  );
};

export default SelectRow;
