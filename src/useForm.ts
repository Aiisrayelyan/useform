import { useState, useCallback } from 'react';

type FormValues = {
  [key: string]: any;
};

type FormErrors = {
  [key: string]: string;
};

type UseFormOptions<T> = {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => void;
};

export function useForm<T extends FormValues>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
      }
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    },
    [values, validate, onSubmit]
  );

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}
