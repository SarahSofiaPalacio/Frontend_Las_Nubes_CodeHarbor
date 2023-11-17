import * as validations from './validations.js';

const useFormValidation = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const value = formData[field];
    const rules = validationRules[field];
    
    if (rules.required && !validations.isRequired(value)) {
      errors[field] = `${rules.name} es requerido`;
    } else if (rules.validator && !rules.validator(value, formData)) {
      errors[field] = rules.errorMessage;
    }
  });

  return errors;
};

export default useFormValidation;
