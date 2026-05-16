import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../components/layout/DashboardLayout";

import {

  getAllQuizzes,
  createQuiz,
  deleteQuiz,
  updateQuiz

}
from "../services/quizService";

export default function AdminQuiz() {

  const [quizzes,setQuizzes] =
    useState([]);

  const [loading,setLoading] =
    useState(false);

  const [domain,setDomain] =
    useState("");

  const [editingId,
    setEditingId] =
    useState(null);

  const [questions,
    setQuestions] =
    useState([

      {
        q:"",

        options:[
          "",
          "",
          "",
          ""
        ],

        answer:""
      }

    ]);


  // ================= LOAD =================

  const loadQuizzes =
    async()=>{

      try{

        const data =
          await getAllQuizzes();

        setQuizzes(data);

      }
      catch(err){

        console.log(err);

      }

    };


  useEffect(()=>{

    loadQuizzes();

  },[]);



  // ================= ADD QUESTION =================

  const addQuestion = ()=>{

    setQuestions([

      ...questions,

      {

        q:"",

        options:[
          "",
          "",
          "",
          ""
        ],

        answer:""

      }

    ]);

  };



  // ================= REMOVE QUESTION =================

  const removeQuestion =
    (index)=>{

      const copy =
        [...questions];

      copy.splice(
        index,
        1
      );

      setQuestions(
        copy
      );

    };



  // ================= UPDATE QUESTION =================

  const updateQuestion =
    (
      index,
      field,
      value
    )=>{

      const copy =
        [...questions];

      copy[index][field] =
        value;

      setQuestions(
        copy
      );

    };



  // ================= UPDATE OPTION =================

  const updateOption =
    (
      questionIndex,
      optionIndex,
      value
    )=>{

      const copy =
        [...questions];

      copy[
        questionIndex
      ]

      .options[
        optionIndex
      ] = value;

      setQuestions(
        copy
      );

    };



  // ================= CREATE / UPDATE =================

  const handleCreate =
    async()=>{

      if(!domain){

        return alert(
          "Domain required"
        );

      }

      setLoading(
        true
      );

      try{

        const payload = {

          domain,

          questions

        };

        if(
          editingId
        ){

          await updateQuiz(

            editingId,

            payload

          );

        }

        else{

          await createQuiz(
            payload
          );

        }

        setEditingId(
          null
        );

        setDomain("");

        setQuestions([

          {

            q:"",

            options:[
              "",
              "",
              "",
              ""
            ],

            answer:""

          }

        ]);

        await loadQuizzes();

      }

      catch(err){

        console.log(err);

      }

      setLoading(
        false
      );

    };



  // ================= DELETE =================

  const handleDelete =
    async(id)=>{

      const confirmDelete =
        window.confirm(
          "Delete Quiz?"
        );

      if(
        !confirmDelete
      ) return;

      await deleteQuiz(
        id
      );

      loadQuizzes();

    };



  return(

    <DashboardLayout>

      <div
        className="
        max-w-7xl
        mx-auto
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-8
          text-center
        "
        >

          🧠 Quiz Management

        </h1>



        {/* ANALYTICS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          mb-8
        "
        >

          <div
            className="
            bg-slate-800/60
            rounded-xl
            p-5
          "
          >

            <h3>
              Total Quizzes
            </h3>

            <p
              className="
              text-3xl
              font-bold
            "
            >

              {
                quizzes.length
              }

            </p>

          </div>


          <div
            className="
            bg-slate-800/60
            rounded-xl
            p-5
          "
          >

            <h3>
              Total Questions
            </h3>

            <p
              className="
              text-3xl
              font-bold
            "
            >

              {

                quizzes.reduce(

                  (
                    sum,
                    q
                  ) =>

                    sum +
                    q.questions.length,

                  0

                )

              }

            </p>

          </div>


          <div
            className="
            bg-slate-800/60
            rounded-xl
            p-5
          "
          >

            <h3>
              Domains
            </h3>

            <p
              className="
              text-3xl
              font-bold
            "
            >

              {

                new Set(

                  quizzes.map(
                    q=>q.domain
                  )

                ).size

              }

            </p>

          </div>

        </div>



        {/* CREATE / UPDATE */}

        <div
          className="
          bg-slate-800/60
          p-6
          rounded-2xl
          mb-8
          space-y-6
        "
        >

          <input

            placeholder="Domain"

            value={domain}

            onChange={(e)=>

              setDomain(
                e.target.value
              )

            }

            className="
            w-full
            p-3
            rounded-xl
            text-black
          "
          />


          {

            questions.map(

              (
                question,
                index
              )=>(

                <div

                  key={index}

                  className="
                  p-4
                  rounded-xl
                  bg-slate-900
                  space-y-3
                "
                >

                  <input

                    placeholder="Question"

                    value={question.q}

                    onChange={(e)=>

                      updateQuestion(

                        index,
                        "q",
                        e.target.value

                      )

                    }

                    className="
                    w-full
                    p-3
                    rounded-xl
                    text-black
                  "
                  />


                  {

                    question.options.map(

                      (
                        opt,
                        optIndex
                      )=>(

                        <input

                          key={optIndex}

                          placeholder={`Option ${optIndex+1}`}

                          value={opt}

                          onChange={(e)=>

                            updateOption(

                              index,
                              optIndex,
                              e.target.value

                            )

                          }

                          className="
                          w-full
                          p-3
                          rounded-xl
                          text-black
                        "
                        />

                      )

                    )

                  }


                  <input

                    placeholder="Correct Answer"

                    value={question.answer}

                    onChange={(e)=>

                      updateQuestion(

                        index,
                        "answer",
                        e.target.value

                      )

                    }

                    className="
                    w-full
                    p-3
                    rounded-xl
                    text-black
                  "
                  />


                  <button

                    onClick={()=>

                      removeQuestion(
                        index
                      )

                    }

                    className="
                    bg-red-500
                    px-4
                    py-2
                    rounded-xl
                  "
                  >

                    Remove Question

                  </button>

                </div>

              )

            )

          }


          <div
            className="
            flex gap-4
          "
          >

            <button

              onClick={
                addQuestion
              }

              className="
              bg-green-500
              px-5
              py-3
              rounded-xl
            "
            >

              ➕ Add Question

            </button>


            <button

              onClick={
                handleCreate
              }

              disabled={
                loading
              }

              className="
              bg-blue-500
              px-5
              py-3
              rounded-xl
            "
            >

              {

                loading

                ?

                "Saving..."

                :

                editingId

                ?

                "Update Quiz"

                :

                "Create Quiz"

              }

            </button>

          </div>

        </div>



        {/* QUIZ LIST */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        "
        >

          {

            quizzes.map(

              quiz=>(

                <div

                  key={quiz._id}

                  className="
                  p-5
                  rounded-2xl
                  bg-slate-800/60
                  border
                  border-slate-700
                "
                >

                  <h2
                    className="
                    text-lg
                    font-bold
                  "
                  >

                    {quiz.domain}

                  </h2>

                  <p
                    className="
                    text-gray-400
                    mt-2
                  "
                  >

                    Questions:
                    {" "}
                    {
                      quiz.questions.length
                    }

                  </p>


                  <div
                    className="
                    mt-4
                    flex gap-3
                  "
                  >

                    <button

                      onClick={()=>{

                        setEditingId(
                          quiz._id
                        );

                        setDomain(
                          quiz.domain
                        );

                        setQuestions(
                          quiz.questions
                        );

                      }}

                      className="
                      bg-yellow-500
                      px-4
                      py-2
                      rounded-xl
                    "
                    >

                      ✏ Edit

                    </button>


                    <button

                      onClick={()=>

                        handleDelete(
                          quiz._id
                        )

                      }

                      className="
                      bg-red-500
                      px-4
                      py-2
                      rounded-xl
                    "
                    >

                      Delete

                    </button>

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </DashboardLayout>

  );

}