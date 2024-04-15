import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./startScreen"
import Questions from "./Questions"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishedScreen from "./FinishedScreen"
import Footer from "./Footer"
import Timer from "./Timer"

const SECS_PER_QUESTIONS = 30;
const initialState = {
  questions: [],
  status: 'loading',  // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  console.log(action)

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS
      }
    case 'newAnswer':
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return {
        ...state,
        questions: state.questions,
        status: 'ready',
        index: 0,
        points: 0,
        answer: null,
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highscore, secondsRemaining } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`https://quiz-app-h92s.onrender.com/data/questions`);
        console.log(res);
        if (!res.ok) throw new Error("Unable to fetch questions");
        const questions = await res.json();

        // send to state
        dispatch({
          type: 'dataReceived',
          payload: questions
        });

        console.log(questions);
      } catch (error) {
        dispatch({ type: 'dataFailed', })
        console.error(error.message);
      }

    }
    fetchQuestions();
  }, [])
  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === 'active' &&
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        }

        {status === 'finished' && <FinishedScreen highscore={highscore} points={points} dispatch={dispatch} maxPossiblePoints={maxPossiblePoints} />}
      </Main>
    </div>
  )
}