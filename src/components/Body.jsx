import React, {useState, useEffect} from 'react'
import './Body.css'
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {FaGraduationCap} from 'react-icons/fa'
import image from '../image/Ikbal 3.png'
function Body() {
    const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const fetchUserName = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      console.log(data);
  };

  useEffect(() => {
    fetchUserName();
  }, [user]);
  return (
    <div className='body' data-aos="fade-up" data-aos-duration="3000">
        <div className='re'></div>
        <div className='re1'></div>
        <div className='re2'></div>
        <div className='re3'></div>
        <div className='body__1'>
            <div  className='body__user'>
                {user ? (<p>Welcome {name}</p>) : <>Welcome</>}
            </div>
            <div className='body__header'>
                <h1>What are you looking for?</h1>
            </div>
            <div className='body__div'>
                <div className='body__div__1'><FaGraduationCap size={22} color="#F08080" /></div>
                <div>
                    <h2>Help me create a marketing Plan!</h2>
                    <p className='body__text'>The Arctic Ocean freezes every winter and much <br />of the sea-ice then thaws every summer, and that</p>
                </div>
            </div>
            <div className='body__div1'>
                <div className='body__div__1'><FaGraduationCap size={22} color="#F08080" /></div>
                <div>
                    <h2>I know what I am looking for.</h2>
                    <p className='body__text'>The Arctic Ocean freezes every winter and much <br />of the sea-ice then thaws every summer, and that</p>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex' }} className='o'>
            <div className='img__anime'>
            <img src={image} className='body_img' />
            </div>
            <div className='imag_text'>
                <div className='body__text1'>
                    <b>Hi there!</b> Need help in createing a <br/> Marketing plan foryour business?
                    <br /> I can help to createone using <br /> <b>Retink AI engine </b>
                </div>
                <div className='body__text2'>
                    <p>Click on the options to get started</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body