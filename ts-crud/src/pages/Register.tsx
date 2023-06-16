import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../features/Credentials";
import { useNavigate } from 'react-router-dom';

export default function Register() {

  // Initializing States
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [nameError, setNameError] = React.useState<boolean>(false)
  const [passError, setPassError] = React.useState<boolean>(false)
  const [formError, setFormError] = React.useState<boolean>(false)

  // Validates Errors onBlur and then onChange if Error is currently true.
  function handleError(e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>){ 
    const {name, value} = e.target
    if(name === 'username' && value.length < 6){
        setNameError(true)
        return
    }
    if (name === 'password' && value.length < 8) {
        setPassError(true);
        return   
    }


   setNameError(false)
   setPassError(false)
   setFormError(false)
  }
  
  // Registers and does a final validation for errors, if there's no error, dispatches our function and navigates to login.
  function handleSubmit(name: string, pass: string, nameError: boolean, passError: boolean){
    if(!name || !pass || nameError || passError){
         setFormError(true)
         return
    }

      dispatch(
            addUser({
              name,
              pass,
            })
          );

        navigate('/')
  }



  return (
    <div className='Container'>
      <div className='loginDiv'>
        <h2>Register</h2>
        <div className="InpDiv">
          {/* Displaying errors + respective inputs. */}
          { formError && (
                <span style={{ color: 'red', fontSize: '14px', }}>
                  Please Fill out your Credentials Correctly.
                </span>
              )}
          <div className='flex column justify-center align-center no-margin'>
          <input onBlur={(event) => handleError(event)} name='username' className='Inp' placeholder='username' onChange={(event) => {
            setName(event.target.value);
            nameError && handleError(event)
          }}/>
          {nameError &&   (
                <span style={{ color: 'red', fontSize: '14px', }}>
                  Username must be at least 6 letters.
                </span>
              )}

          </div>
          <div className='flex column justify-center align-center no-margin'>
          <input onBlur={(event) => handleError(event)} name='password' type="password" className='Inp' placeholder='password' onChange={(event) => {
            setPass(event.target.value);
            passError && handleError(event)
          }}/>
          {passError && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Password must be at least 8 letters.
                </span>
              )}
          </div>
        </div>

        {/* Sending data in our states to our function */}
        <button className='loginBtn' onClick={() => handleSubmit(name, pass, nameError, passError)}>Register</button>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}






