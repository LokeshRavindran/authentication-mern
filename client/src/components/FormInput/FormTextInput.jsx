import React, { forwardRef } from "react";

const FormTextInput = forwardRef((props, ref) => {
  const { type, label, name, error } = props;
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={name} className="mt-4">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className="mt-2 border-black border"
        ref={ref}
        {...props}
      />
      {error?.[name] && (
        <p className="text-red-500 text-xs">{error[name].message}</p>
      )}
    </div>
  );
});

export default FormTextInput;
