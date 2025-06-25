export const getErrorMessage = ({ errors, name, label }: any) => {
  switch (errors[name]?.type) {
    case "required":
      return `${label} is required.`;
    case "maxLength":
      return `${label} is too long.`;
    case "pattern":
      return `${label} has wrong format.`;
  }
};
