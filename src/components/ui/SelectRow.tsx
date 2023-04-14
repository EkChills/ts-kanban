import React from "react";
interface Props extends React.ComponentPropsWithoutRef<any> {
  value?:string
  selectList:string[]
  selectedTask?:string;
}

const SelectRow = ({ value, selectList,selectedTask, ...rest }: Props) => {
  const options = [...selectList] || ['todo', 'doing', 'done'];
  
  return (
    <select
      {...rest}
      value={selectedTask}
      className="select-bordered select w-full max-w-full border-[#828FA3] bg-transparent capitalize text-[var(--tasks-text)]"
    >
      {options.map((option, index) => {
        return (
          <option  key={index} value={option} >
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default SelectRow;
