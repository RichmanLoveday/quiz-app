import { useQuiz } from "../context/QuizContest"

export default function StartScreen() {
    const { numQuestions, dispatch } = useQuiz();
    return (
        <div className="start">
            <h2>Welcome to The React Quiz</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button onClick={() => dispatch({ type: 'start' })} className="btn">Let's start</button>
        </div>
    )
}
