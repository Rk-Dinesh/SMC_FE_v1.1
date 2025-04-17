import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../Host';
import { AiOutlineLoading } from 'react-icons/ai';

const Exam = () => {
    const { state } = useLocation();
    const { topic, courseId, questions } = state;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [passedQuiz, setPassed] = useState(false);
    const [quizData, setQuizData] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const topLevelKeys = Object.keys(questions);
        const quiz = {
            title: topic + " Quiz",
            questions: questions[topLevelKeys[0]].map((item) => ({
                question: item.question,
                options: item.options,
                correctAnswer: item.answer,
            }))
        };
        setQuizData(quiz);
    };

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        setShowCorrectAnswer(true);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            // Add the selected answer to userAnswers
            setUserAnswers([...userAnswers, selectedAnswer]);
        }

        // Check if we are at the last question
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowCorrectAnswer(false);
        } else {
            // If it's the last question, evaluate the quiz
            setCompleted(true);
            evaluateQuiz();
        }
    };

    const evaluateQuiz = () => {
        const correctAnswers = userAnswers.filter((answer, index) => 
            answer === quizData.questions[index].correctAnswer
        ).length;

        if (correctAnswers > 4) {
            setPassed(true);
        } else {
            setPassed(false);
        }
    };

    async function updateResult() {
        const correctAnswersCount = userAnswers.filter((answer, index) => 
            answer === quizData.questions[index].correctAnswer
        ).length;
    
        const marks = correctAnswersCount * 10;
        const marksString = marks.toString(); 

        console.log(marksString);
        
    
       const respone = await axios.post(API + '/api/updateresult', { courseId, marksString });
       console.log(respone);
       

    }

    const exitFullScreen = async() => {
        await updateResult()
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        setTimeout(() => {
            window.history.back();
        }, 100);
    };

    async function sendEmail(subject, msg) {
        const userName = sessionStorage.getItem('mName');
        const email = sessionStorage.getItem('email');

        const html = `
        <html>
            <body>
                <h1>${topic} Quiz Result</h1>
                <p>Hello <strong>${userName}</strong>,</p>
                <p>${msg}</p>
                <p>Best,<br>The <strong>Seek my Course</strong> Team</p>
            </body>
        </html>
        `;

        try {
            const postURL = API + '/api/sendexammail';
            await axios.post(postURL, { html, email, subjects: subject });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen flex flex-col'>
            <div className='flex flex-1 justify-center items-center'>
                {Object.keys(quizData).length === 0 ? (
                    <div className="text-center h-screen w-screen flex items-center justify-center">
                        <AiOutlineLoading size="xl" className='fill-white' />
                    </div>
                ) : (
                    <div className='flex-1 flex justify-center items-center flex-col content-center text-center'>
                        {completed ? (
                            <div>
                                <p className='text-center font-black text-xl mt-4 text-white'>
                                    {passedQuiz ? "You Have Passed The Quiz 🎉" : "You Have Failed The Quiz 😔 Try again"}
                                </p>
                                <p className='text-center mt -2'>
                                    You scored {userAnswers.filter((answer, index) => answer === quizData.questions[index].correctAnswer).length} out of {quizData.questions.length} questions.
                                </p>
                                <p className='text-center mt-2'>
                                    Total Score: {userAnswers.filter((answer, index) => answer === quizData.questions[index].correctAnswer).length * 10} out of {quizData.questions.length * 10}.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className='text-xl text-white'>
                                    Question {currentQuestionIndex + 1} of {quizData.questions.length}
                                </h2>
                                <h3 className='text-xl text-white'>{quizData.questions[currentQuestionIndex].question}</h3>
                                <div className='flex flex-col'>
                                    {quizData.questions[currentQuestionIndex].options.map((option, index) => {
                                            const optionLetter = String.fromCharCode(65 + index); // Convert index to A, B, C, D
                                            const isCorrect = optionLetter === quizData.questions[currentQuestionIndex].correctAnswer;
                                            const isSelected = selectedAnswer === optionLetter;
                                            const isWrong = showCorrectAnswer && isSelected && !isCorrect;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(optionLetter)}
                                                    className={`m-2 p-2 ${isWrong ? 'bg-red-500' : isCorrect && showCorrectAnswer ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                                                >
                                                    {optionLetter}: {option}
                                                </button>
                                            );
                                        })}
                                </div>
                                {showCorrectAnswer && (
                                    <p className='text-red-500 mt-2'>
                                        {selectedAnswer !== quizData.questions[currentQuestionIndex].correctAnswer && 
                                        `Correct Answer: ${quizData.questions[currentQuestionIndex].correctAnswer}`}
                                    </p>
                                )}
                                <button
                                    onClick={handleNext}
                                    className='mt-4 bg-black text-white px-4 py-2'
                                    disabled={currentQuestionIndex === quizData.questions.length - 1 && !selectedAnswer}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {completed && (
                            <div className='flex flex-col'>
                                <button onClick={exitFullScreen} className='bg-black text-white items-center justify-center content-center w-52 px-5 py-2 mt-1 mb-4 font-medium dark:bg-white dark:text-black'>
                                    Finish
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exam;