import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';


function Nav() {


  return (
    <div className='nav-container-main'>

      <div className='nav-title-div'><p>Camping Express</p></div>

      <div className='nav-links-box'>
        <Link to='/items'><button className='nav-links-button'>Items</button></Link>
        <Link to='/cart'><button className='nav-links-button'>Cart</button></Link>
        <Link to='/'><button className='nav-links-button'>Home</button></Link>
      </div>

      <div className='nav-user-login-box'>
        <Link to='/login'><button className='nav-user-button'>Login</button></Link>
        <Link to='/register'><button className='nav-user-button'>Register</button></Link>
      </div>

    </div>
  )
}

export default withRouter(Nav);
