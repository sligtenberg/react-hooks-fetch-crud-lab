import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers } = question;
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question.correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => onDelete(question))
  }

  function handleCorrectAnswerChange(event) {
    console.log(event.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"correctIndex": event.target.value})
    })
    setCorrectAnswerIndex(event.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctAnswerIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
