import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <main>
      <section className="mountain-bg login-section">
        <h2>Login</h2>
        <form className="flex-column">
          <div className="login-div">
            <label>Email:</label>
            <input name="email" type="email"></input>
          </div>
          <div className="login-div">
            <label>Password:</label>
            <input name="password" type="password"></input>
          </div>
          <div className="login-div">
            <div className="btn-container">
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </section>
      <section className="login-section flex-column align-center">
        <h3>Not a user yet? No worries!</h3>
        <div className="btn-container">
          <button>Sign Up</button>
        </div>
      </section>
    </main>
  );
};

export default Login;