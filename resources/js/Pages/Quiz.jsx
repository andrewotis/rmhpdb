import ProgressBar from "../Components/ProgressBar";

export default function Quiz({ auth }) {
    return (
        <div className="quiz-wrapper">
            <div className="quiz-container">
                <h1>Quiz</h1>
                <ProgressBar percentage={50} text={`50%`} />
                <hr />
                <h2>The Internal Labour Organization’s first Maternity Protection Convention was issued in:</h2>
                <ul>
                    <li>1952</li>
                    <li>2000</li>
                    <li>1919</li>
                    <li>1997</li>
                </ul>
                <button>Next</button>
                <div className="index">
                    1 of 16 questions
                </div>
            </div>
        </div>
    );
}