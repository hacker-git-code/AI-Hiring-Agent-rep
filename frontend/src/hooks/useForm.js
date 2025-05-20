import { useState, useCallback } from 'react';

const useForm = (initialState, validate, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' 
      ? checked 
      : type === 'file' 
        ? files[0] 
        : value;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: inputValue
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validate form
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    // If no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors(prevErrors => ({
          ...prevErrors,
          form: error.message || 'An error occurred while submitting the form.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, validate, values]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  // Set field value programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  // Set field error programmatically
  const setFieldError = useCallback((name, error) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues,
    setErrors,
  };
};

export default useForm;
