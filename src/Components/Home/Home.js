import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


function Home() {






  return (
    <div className='home-container-main'>

      <div className='home-main-div'>
        <div className='home-welcome'>
          <p>Welcome To Camping Express!</p>
        </div>
        <Link to='/items'><button className='deals-button'>
          <p>Check out these Deals!</p>
        </button>
        </Link>


      </div>

    </div>
  )
}

export default Home;
