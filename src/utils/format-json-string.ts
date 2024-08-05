export const formatJsonString = (jsonString: string): string => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 4);
  } catch (error) {
    console.log("ERROR!", jsonString)
    return jsonString;
  }
};
