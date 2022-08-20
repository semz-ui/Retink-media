import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import './Header.css'
import logo from '../image/logo.jpg'
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {Link, useNavigate} from 'react-router-dom'
import Spinner from "./Spinner";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      console.log(data);
  };

  console.log(user)


  useEffect(() => {
    fetchUserName();
  }, [user, loading]);
  if (loading) {
    return <Spinner />
  }
  return (
    <div className='header'>
        <img src={logo} alt="logo" className='header__logo' /> 
        <div className='header__list'>
            <ul className='header__ul'>
              <Link to='/' className="header__link">
                <li>Home</li>
              </Link>
                <li>Services</li>
                <li>About us</li>
            </ul>
        </div>
        <div>
          {user ? (
            <div>
              <button className='header__btn' onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to='/login'>
            <button className='header__btn'>Login</button>
          </Link>
          )}
        </div>
    </div>
  )
}

export default Header