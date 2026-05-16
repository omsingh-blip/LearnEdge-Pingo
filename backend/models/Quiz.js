import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  q: {
    type: String,
    required: true,
  },

 options: {
  type:[String],

  required:true,

  validate:{

    validator:(arr)=>
      arr.length===4,

    message:
      "Question must contain exactly 4 options"

  }

},
  answer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
    },

    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;