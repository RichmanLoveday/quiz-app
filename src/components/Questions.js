import { useQuiz } from "../context/QuizContest";
import Options from "./Options";

export default function Questions() {
    const { question, dispatch, answer } = useQuiz();

    return (
        <div>
            <h4>{question.question}</h4>
            <Options dispatch={dispatch} answer={answer} question={question} />
        </div>
    )
}

