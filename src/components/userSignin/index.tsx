import './styles.css';

export const Signin = () => (
  <>
    <div className="main-sign-container">
      <div className="sub-container">
        <div className="welcome-back">
          <h2>Welcome Back</h2>
        </div>
      </div>
      <div className="sign-container">
        <h1 className="head">Sign In</h1>
        <div>
          <form className="details-container">
            <input
              className="name-container"
              type="text"
              name="email"
              placeholder="Enter your email *"
              required
            />
            <input
              className="details-container"
              type="text"
              name="password"
              placeholder="Enter your Password *"
            />
          </form>
          <span className="forgot-password">forgot password</span>
        </div>
        <button className="sign-up">Sign In</button>
        <p className="sign-account">New here?Create an Account</p>
      </div>
    </div>
  </>
);
