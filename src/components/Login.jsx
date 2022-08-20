import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { BsEyeSlash, BsEye} from 'react-icons/bs'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import './Login.css'
import Header from './Header';
import Spinner from './Spinner';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error, success] = useAuthState(auth);
  const [passwordHide, setPasswordHide] = useState(false)

  useEffect(() => {
    if (user) navigate("/");
    if (success) {
      alert("Login Successful");
    }
  }, [user, loading]);

   const showText = () => {
    setPasswordHide((passwordHide) => !passwordHide)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    }

    if (loading) {
    return <Spinner />
  }
  return (
    <>
        <Header />
    <div className='login'>
      <div className='register'>
        <h1 className='register_heading'>Login</h1>
      </div>
      <div className='register_form'>
        <form onSubmit={onSubmit}>
          <div className='register_form_div'>
            <input type='text' placeholder='Email'  className='register_form_input' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='register_form_div'>
            <input type={passwordHide ? "text" : "password"} placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div onClick={showText} className="btn_pass">
              {
              passwordHide ? <BsEyeSlash color='black' size={20} /> : <BsEye color='black' size={20} />
            }
            </div>
          <div className='register_form_div'>
            <button className='register_form_btn' onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
          </div>
        </form>
         <div className='forgot_password'>
          <p>forgot password?</p>
          <Link className='register_text' to='/register'>
          <p>Register</p>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login