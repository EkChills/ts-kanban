import React, { useState } from "react";

const Checkbox = ({ isChecked, handleChange }: { isChecked: boolean, handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [isSubtaskChecked, setIsSubtaskChecked] = useState<boolean>(isChecked)
  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const {checked} = e.target
  //   setIsSubtaskChecked(checked)
  // }
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={handleChange}
          className="checkbox-secondary checkbox"
        />
      </label>
    </div>
  );
};

export default Checkbox;
