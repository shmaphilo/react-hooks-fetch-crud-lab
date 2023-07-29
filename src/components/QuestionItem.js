import React, { useState } from "react";
import QuestionForm from "./QuestionForm";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion}) { 
if(!question){
  return null;
}
  const { id, prompt, answers, correctIndex } = question;
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(question));
  }
  function handleAnswerChange(event) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(event.target.value), // Convert the selected value to an integer
    };

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        
         onUpdateQuestion(updatedQuestion);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
