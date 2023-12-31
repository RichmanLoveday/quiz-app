import { useEffect } from "react"
import { useQuiz } from "../context/QuizContest";

export default function Timer() {
    const { dispatch, secondsRemaining } = useQuiz();
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function () {
        const id = setInterval(function () {
            //  console.log('tick');
            dispatch({ type: 'tick' })
        }, 1000)

        // clear interval - clean up
        return () => clearInterval(id);
    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && '0'}
            {mins}:{seconds < 10 && '0'}
            {seconds}
        </div>
    )
}