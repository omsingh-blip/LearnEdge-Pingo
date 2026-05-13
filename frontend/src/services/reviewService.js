export const reviewCode =
  async ({
    question_name,
    student_id,
    student_solution,
  }) => {

    const response = await fetch(
      `${import.meta.env.VITE_AI_REVIEW_API}/review-code`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          question_name,
          student_id,
          student_solution,
        }),
      }
    );

    return response.json();
  };