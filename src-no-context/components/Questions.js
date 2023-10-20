import Options from "./Options";

export default function Questions({ question, dispatch, answer }) {
    console.log(question);
    return (
        <div>
            <h4>{question.question}</h4>
            <Options dispatch={dispatch} answer={answer} question={question} />
        </div>
    )
}

