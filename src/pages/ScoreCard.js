import React, { useContext, useEffect } from "react";
// import {useHistory} from "react-router-dom"
import Button from "../components/Button";
import AppContext from "../state/context";

const ScoreCard = () => {
  const { score, initial, setInitial, submit, setSubmit, setCount } = useContext(AppContext);
  // const history = useHistory()
  useEffect(() => {
    setCount(0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = { initial, score };
    console.log(result);

    fetch("https://quipapp.000webhostapp.com/send_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    }).then((res) => {
      console.log("new blog added");
      setSubmit("Submitted")

    });
  };



  return (
    <div>
      <h2>All done!</h2>
      <p>Your final score is {score}</p>
      <div className="initials">
        <span>Enter initials:</span>
        <div>
          <input
            type="text"
            value={initial}
            onChange={(e) => setInitial(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div>
          <Button text="Submit" onClick={handleSubmit} />
        </div>
      </div>
      <p>{submit}</p>
    </div>
  );
};

export default ScoreCard;
