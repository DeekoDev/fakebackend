import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {}

const Switch = ({ ...props }: Props) => {
  return (
    <input
      {...props}
      type="checkbox"
      className="disabled-input relative  h-8 w-14 appearance-none rounded-full bg-gray-700 transition-colors ease-out before:absolute before:left-1 before:top-1/2 before:block before:h-6 before:w-6 before:-translate-y-1/2  before:rounded-full before:bg-gray-300 before:transition-transform before:duration-75 before:ease-out before:content-['']  checked:bg-sky-500 checked:before:right-1 checked:before:translate-x-full  hover:cursor-pointer hover:bg-gray-600 checked:hover:bg-sky-500 disabled:before:bg-gray-400 disabled:checked:bg-gray-700"></input>
  );
};

export { Switch };
