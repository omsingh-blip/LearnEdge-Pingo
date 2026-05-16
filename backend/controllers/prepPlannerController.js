import { GoogleGenerativeAI }
from "@google/generative-ai";

export const generatePrepPlan =
async (req, res) => {

  try {

    const {
      domain,
      topics,
      level
    } = req.body;

    const genAI =
      new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY.trim()
      );

    const model =
      genAI.getGenerativeModel({
        model:
          "gemini-2.5-flash"
      });

    const prompt = `
Create a one-day study plan.

Domain:
${domain}

Topics:
${topics}

Level:
${level}

Return ONLY valid JSON:

{
"study_plan_title":"",
"daily_schedule":[
{
"time_block":"",
"topic":"",
"tasks":"",
"focus":""
}
],
"important_questions":[],
"tips":""
}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    let text =
      response.text();

    text = text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    let data;

    try {

      data =
        JSON.parse(text);

    } catch {

      data = {
        study_plan_title:
          "AI Study Plan",

        daily_schedule:[
          {
            time_block:
              "9AM-11AM",

            topic:
              topics,

            tasks:
              text,

            focus:
              "Concept building"
          }
        ],

        important_questions:[],

        tips:
          "Practice consistently."
      };

    }

    res.status(200)
    .json(data);

  }

  catch(error){

    console.log(
      "Gemini Error:",
      error
    );

    res.status(500)
    .json({
      success:false,
      message:
        error.message
    });

  }

};