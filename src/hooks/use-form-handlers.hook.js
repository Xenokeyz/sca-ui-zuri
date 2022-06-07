import { useState } from "react";

export const useFormHandlers = (props) => {
  const { onSubmit, initialValues = {} } = props;
  const [values, setValues] = useState(initialValues);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(values);
    setValues({ ...initialValues });
  };

  return { handleChange, values, handleSubmit };
};
