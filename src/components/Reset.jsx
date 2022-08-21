import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import Header from "./Header";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  const onSubmit = (e) => {
    e.preventDefault();
    sendPasswordReset(email);
  }
  return (
    <>
        <Header />
    <div className='login'>
      <div className='register'>
        <h1 className='register_heading'>Reset Password</h1>
      </div>
      <div className='register_form'>
        <form onSubmit={onSubmit}>
          <div className='register_form_div'>
            <input type='text' placeholder='Email Address'  className='register_form_input' id='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email}  />
          </div>
          <div className="register_form_div">
              <button
           className="register_form_btn">Reset Password</button>
          </div>
        </form>
         <div className='forgot_password1'>
          <Link className='register_text' to='/register'>
          <p>Don't have an account?. Register</p>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
export default Reset;
