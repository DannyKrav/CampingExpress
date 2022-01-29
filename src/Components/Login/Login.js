import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Login.css';

function Login() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")


  const history = useHistory();



  function loginUser() {

    axios.post('/api/loginUser', { username, password })
      .then(res => {
        if (res.data.username) {
          history.push('/')
          document.location.reload()
          alert('You have been logged in!')
        }

      })
      .catch(err => {
        console.log(err)
      })

  }







  return (

    <div className='login-main'>
      <div className='login-box'>
        <div className='text-box'>
          <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="login-username" placeholder="Username"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="login-password" placeholder="Password"></input>
          </div>
        </div>
        <button className='login-login-button' onClick={() => loginUser()}>Sign In!</button>
      </div>
    </div>


  )

}

export default Login;
