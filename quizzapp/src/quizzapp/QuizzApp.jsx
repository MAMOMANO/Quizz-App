import { useState, useEffect } from "react";
import soal from "./data";
import './QuizzApp.css'

export default function QuizzApp(){

    const[isStarted, setIsStarted]=useState(false);
    const[currentIndex, setCurrentIndex]=useState(0);
    const[selectedAnswer, setSelectedAnswer]=useState('')
    const[score, setScore]=useState(0)
    const[isFinished, setIsFinished]=useState(false)
    const[timer, setTimer]=useState(60)


    function handleClick(){
        setIsStarted(true)
    }
    
    function handleOpsi(opsi){
        setSelectedAnswer(opsi)
        if(opsi === soal[currentIndex].answer){ 
            setScore(score +10)
            }
            setTimeout(() => {
            if(currentIndex === soal.length - 1) {
                setIsFinished(true)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
            setSelectedAnswer('')
            setTimer(60)
        }, 1000)

        }


    useEffect(()=>{
        const time=setInterval(()=>{
           
            setTimer(t => {
    if(t === 1) {
        if(currentIndex === soal.length - 1) {
            setIsFinished(true)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
        return 60
    }
    return t - 1
})
        }, 1000)
        return() => clearInterval(time)        

    },[currentIndex])
    return(

        <div className="quiz-app">
           
            <div className="quiz-card">
                
                {isFinished ? (
                            <div className="screen result-screen">
                                <h2 className="result-title">Quiz Selesai</h2>
                                <h2 className="result-score">Skor Kamu : {score}</h2>
                            </div>
                ):
                  
                isStarted? (
                    <div className="screen quiz-screen">
                    <p className="label">Pertanyaan</p>
                    <h2 className="question">{soal[currentIndex].question}</h2>
                   <div className="options">
                    {soal[currentIndex].options.map((opsi, index)=>(
                        // <li key={index}>{opsi}</li>
                        <button className={"option " + (selectedAnswer === opsi ? (opsi === soal[currentIndex].answer ? "benar" :" salah") : "")} onClick={()=>handleOpsi(opsi)} key={index}>{opsi}</button>
                    ))}
                   </div>
                   <div className="quiz-footer">
                    <p className="timer">{timer}</p>
                    <p className="score">{score}</p>
                   </div>
                   </div>
                   ):
                 <div className="screen start-screen"> <h1>Quizz App</h1>
            <h4>Ada 5 Pertanyaan Yang harus di jawab ,setiap pertnyaan di kasi waktu 1 menit</h4>
            <button className="start-btn" onClick={handleClick}>Mulai Quiz</button>
            </div>}
                
            </div>
        </div>
    )
}