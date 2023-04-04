import React from "react";

const Checkbox = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          className="checkbox-secondary checkbox"
        />
      </label>
    </div>
  );
};

export default Checkbox;
