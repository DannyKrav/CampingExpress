import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Register.css';




function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();



  function registerUser() {

    axios.post('/api/registerUser', { username, password })
      .then(res => {
        if (res.data.username) {
          history.push('/')
          document.location.reload()
          alert('You Have Been Registered!')
        }

        console.log(res.data)
        alert("Username is taken")
      })
      .catch(err => {
        console.log(err)
      })
  }




  return (
    <div className='register-main'>
      <div className='register-box'>
        <div className='button-box'>
          <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="register-username" placeholder="Username"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="register-password" placeholder="Password"></input>
          </div>
        </div>
        <button className='register-reg-button' onClick={() => registerUser()}>Register!</button>
      </div>
    </div>

  )
}

export default Register;
