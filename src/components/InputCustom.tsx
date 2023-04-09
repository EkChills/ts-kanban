import React from "react";

interface Props extends React.ComponentPropsWithoutRef<any> {
  Element: React.ElementType<any>;
  labelText: string;
  type?:string;
  inputId: string;
  className:string;
  placeholderText:string;
}

const InputCustom = React.forwardRef(({
  Element,
  labelText,
  type,
  inputId,
  // inputName,
  // inputValue,
  placeholderText,
  className,
  ...rest
}: Props, ref:any) => {
  return (
    <div className="flex flex-col space-y-[.5rem]">
      <label
        htmlFor={inputId}
        className="text-[.75rem] font-bold capitalize text-[var(--select-label)]"
      >
        {labelText}
      </label>
      <Element
        placeholder={placeholderText}
        className={`${className} placeholder:text-[.813rem]`}
        {...rest}
      ></Element>
    </div>
  );
});

export default InputCustom;
