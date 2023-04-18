import React from "react";
import { Outlet, useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const QuestionLayout = () => {
  const questions = useLoaderData();

  return (
    <div>
      <div className="questions">
        {questions.map((question) => (
          <p key={question.id} className="question-number">
            {<Link to="/">{question.id}</Link>}
          </p>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;