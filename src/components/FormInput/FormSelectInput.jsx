import React, { forwardRef } from "react";

const FormSelectInput = forwardRef((props, ref) => {
  const {
    label,
    name,
    options,
    error,
    onChange,
    onBlur,
    additionalClasses = null,
  } = props;
  return (
    <div className={`flex flex-col flex-1`}>
      <label htmlFor={name} className="mt-4">
        {label}
      </label>
      <select
        className={`mt-2 border-black border ${additionalClasses}`}
        disabled={options?.length === 0}
        ref={ref}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option>-- Please select an option --</option>
        {options?.map((option) => (
          <option key={option.name} value={option.name}>{`${option.name} ${
            option?.unicodeFlag ? option.unicodeFlag : ""
          }`}</option>
        ))}
      </select>
      {error?.[name] && (
        <p className="text-red-500 text-xs">{error[name].message}</p>
      )}
    </div>
  );
});

export default FormSelectInput;
