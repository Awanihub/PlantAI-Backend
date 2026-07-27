export const validateLearnQuestion = (body: any) => {
  const errors: string[] = [];

  if (!body.question || body.question.trim() === "") {
    errors.push("Question is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};