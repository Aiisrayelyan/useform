import React from 'react';
import { useForm } from './useForm';

type FormValues = {
  username: string;
  email: string;
};

const MyForm: React.FC = () => {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm<FormValues>({
    initialValues: { username: '', email: '' },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log('Form submitted successfully', values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default MyForm;
