import { useState, useEffect } from "react";
import ProgressBar from "../Components/ProgressBar";

export default function Quiz({ auth, quizQuestions }) {
    const [index, setIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let obj = {};
        quizQuestions.map(question => obj[question.question_number] = null);
        setSelectedAnswers(obj);
    },[quizQuestions]);

    useEffect(() => {
        if(selectedAnswers !== null) {
            let c = 0;
            Object.entries(selectedAnswers).map(a => {
                if(a[1] !== null) c++;
            });
            const newPercentage = (100 / quizQuestions.length) * (c);
            setPercentage(newPercentage);
        }
    },[selectedAnswers]);

    const handleAnswerClick = answer => {
        if(selectedAnswers[index+1] == answer) {
            setSelectedAnswers({...selectedAnswers, [index+1] : null});
        } else {
            setSelectedAnswers({...selectedAnswers, [index+1] : answer});
        }
    }

    const calculateScore = _ => {
        let correctAnswerCount = 0;
        Object.entries(selectedAnswers).map(answer => {
            const q = answer[0];    // question
            const a = answer[1];    // answer
            const ca = quizQuestions[q-1].answer;   // correct answer
            if(a == ca) {
                correctAnswerCount += 1;
            }
        });
        const percentCorrect = (correctAnswerCount / quizQuestions.length) * 100;
        return percentCorrect;
    }
    
    return quizQuestions && selectedAnswers !== null &&
    (
        <div className="quiz-wrapper">
            <div className="quiz-container">
                {
                    showResults ?
                        <>
                            {
                                calculateScore() < 50 ? 
                                    'Unfortunately, this time you didn\'t achieve a passing grade. We understand that it can be disappointing, but we believe with a bit more practice and focus, you can improve your understanding in the future.' :
                                        'Great job!'
                            } <br /><br />You got {calculateScore()}% of the questions correct
                            {
                                calculateScore() < 50 ? '.' : '!'
                            }
                        </> :
                            <>
                                <div>
                                    <h1>RMHP Quiz</h1> <div style={{float: 'right', fontSize: '11pt'}}>{index+1} of {quizQuestions.length} questions</div>
                                </div>
                                <ProgressBar 
                                    percentage={percentage}
                                    text={`${percentage}%`}
                                />
                                <h2>{quizQuestions[index].question}</h2>
                                <ul>
                                    <li
                                        onClick={() => handleAnswerClick('a')}
                                        className={selectedAnswers[index+1] == 'a' ? 'active' : ''}
                                    >
                                        {quizQuestions[index].option_a}
                                    </li>
                                    <li
                                        onClick={() => handleAnswerClick('b')}
                                        className={selectedAnswers[index+1] == 'b' ? 'active' : ''}
                                    >
                                        {quizQuestions[index].option_b}
                                    </li>
                                    <li
                                        onClick={() => handleAnswerClick('c')}
                                        className={selectedAnswers[index+1] == 'c' ? 'active' : ''}
                                    >
                                        {quizQuestions[index].option_c}
                                    </li>
                                    <li
                                        onClick={() => handleAnswerClick('d')}
                                        className={selectedAnswers[index+1] == 'd' ? 'active' : ''}
                                    >
                                        {quizQuestions[index].option_d}
                                    </li>
                                </ul>
                                <div className="button-container">
                                    <button
                                        onClick={index > 0 ? () => setIndex(index-1) : undefined}
                                        disabled={index==0}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={index < (quizQuestions.length-1) ? () => setIndex(index+1) : () => setShowResults(true)}
                                        disabled={selectedAnswers[index+1] == null}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                }
            </div>
        </div>
    );
}