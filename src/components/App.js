import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questionsData => setQuestions(questionsData))
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm addQuestion={newQuestion => setQuestions([...questions, newQuestion])}/> :
        <QuestionList
          questions={questions}
          onDelete={deletedQuestion => setQuestions(questions.filter(question => question.id !== deletedQuestion.id))}
        />}
    </main>
  );
}

export default App;