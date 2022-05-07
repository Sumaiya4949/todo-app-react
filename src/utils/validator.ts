export const validatePassword = (_: any, value: any) => {
  if (value?.length >= 8) {
    return Promise.resolve();
  }

  return Promise.reject(new Error("Password must be at least 8 characters."));
};
