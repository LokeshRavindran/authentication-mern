import React, { forwardRef } from "react";

const FormNumberInput = forwardRef((props, ref) => {
  const { label, name, error } = props;
  return (
    <div>
      <label htmlFor={name} className="mt-4">
        {label}
      </label>
      <input
        type={"number"}
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

export default FormNumberInput;
