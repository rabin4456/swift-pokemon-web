//converting string 'APPLE' to 'Apple'
export const stringToTitleCase = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };