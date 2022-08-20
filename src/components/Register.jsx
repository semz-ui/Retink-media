import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import Spinner from './Spinner';

function Register() {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [passwordHide, setPasswordHide] = useState(false)

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name");
      return;
    } else if (password !== password2) {
      alert("Passwords do not match");
      return;
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

   useEffect(() => {
    if (error) {
      alert(error.message);
      return;
    }
    if (user) navigate("/");
  }, [user, loading, error]);

    const onSubmit = (e) => {
    e.preventDefault()
  }
  if (loading) {
    return <Spinner />
  }
    const showText = () => {
    setPasswordHide((passwordHide) => !passwordHide)
  }
  return (
    <div className='login'>
      <div className='register'>
        <h1 className='register_heading'>Register</h1>
      </div>
      <div className='register_form'>
        <form onSubmit={register}>
          <div className='register_form_div'>
            <input  className='register_form_input' type='text' placeholder='Full Name' id='fullname' name='fullname' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='register_form_div '>
            <input type='text' placeholder='Email'  className='register_form_input' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='register_form_div'>
            <input type={passwordHide ? "text" : "password"} placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
            <div onClick={showText} className="btn_pass">
              {
              passwordHide ? <BsEyeSlash color='black' size={20} /> : <BsEye color='black' size={20} />
            }
            </div>
          <div  className='register_form_div'>
            <input  className='register_form_input' type='password' placeholder="Confirm Password" name='password2' id='password2' value={password2} onChange={(e) => setPassword2(e.target.value)} required />
          </div>
          <div className='register_form_div'>
            <button className='register_form_btn'>Register</button>
          </div>
        </form>
        <div className='forgot_password'>
          <p>forgot password?</p>
          <Link className='register_text' to='/login'>
          <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register