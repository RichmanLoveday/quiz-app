export default function Options({ question, dispatch, answer }) {
    // console.log(answer)
    const hasAnswer = answer !== null ? true : false;

    return (
        <div className="options">
            {question.options.map((option, index) =>
                <button
                    disabled={hasAnswer}
                    className={`btn btn-option ${index === answer ? 'answer' : ''} 
                    ${hasAnswer ?
                            index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                        }`}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                    key={option}>
                    {option}
                </button>
            )}
        </div>
    )
}