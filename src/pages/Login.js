import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useEffect } from "react";
import AppContext from "../state/context";

const Login = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    setEmail,
    setPassword,
    setCount,
    displayError,
    setDisplayError,
  } = useContext(AppContext);

  useEffect(() => {
    setCount(60);
  }, [setCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = { email, password };
    console.log(result);

    fetch("https://quizapp.topdatanig.com/signin.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })
      .then((res) => {
        return res.json();
        // console.log(res.json())
      })
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          sessionStorage.setItem("loggedIn", data.user_id);
          navigate("/home");
        } else if (data.status === "error") {
          setDisplayError(data.message);
          setTimeout(() => {
            setDisplayError("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        setDisplayError("Wrong login details");
        setTimeout(() => {
          setDisplayError("");
        }, 3000);
      });
  };

  return (
    <main>
      <div className="container">
        <h2 className="header">Login</h2>
        <p className="header">Enter Details here</p>
        <div className="login-details">
          <div className="details">
            <div>
              <label htmlFor="email">Email:</label>
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
              />
            </div>
          </div>
          <div className="details">
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
              />
            </div>
          </div>
          <div className="error">{displayError}</div>
          <div className="btn-2">
            <Button onClick={handleSubmit} text="Submit" />
            <Link to="/">Don't have an account? Go back to Homepage</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
