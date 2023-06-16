import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'

export default function Login(){
  // Calling the value of our state in Credentials.js and storing it in userCred using useSelector
  const userCred = useSelector((state: RootState) => state.users.value);
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false)


  // login Function which checks if password and username matches to the one in our state || Displays Error if not.
  function handleLogin(){
      if(name !== userCred.name || pass !== userCred.pass){
        setLoginError(true)
        return
     }
sessionStorage.setItem('Auth', 'true') // Sets Auth to true.
navigate('/Home') // Proceed to Home.
  }


  return (
    <div className='Container'>
      <div className='loginDiv'>
        <h2>Log In</h2>
        <div className="InpDiv">
            {loginError && (
                <span style={{ color: 'red', fontSize: '14px', }}>
                  Wrong Username or Password.
                </span>)} 
          <input className='Inp' placeholder='username' onChange={(event) => {
            setName(event.target.value);
          }}/>
          <input type="password" className='Inp' placeholder='password' onChange={(event) => {
            setPass(event.target.value);
          }}/>
        </div>

        {/* Calling our Login Function on Click*/}
        <button className='loginBtn' onClick={() => handleLogin()}>Login</button>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
