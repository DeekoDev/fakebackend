export const stringToJson = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};
