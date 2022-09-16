import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {auth, fs} from "./Config"

import {useNavigate} from 'react-router-dom'

export const Signup = () => {

  const navigate = useNavigate();
  
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setsuccessMsg] = useState('');

    const handleSignup = (e) =>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((cred)  => {
          fs.collection('users').doc(cred.user.uid).set({
              Name: name,
              Email: email,
              Password: password
          }).then(() => {
              setsuccessMsg("Welcome! You have signed up successfully.")
              setName('');
              setEmail('');
              setPassword('');
              setError('');
              setTimeout(()=>{
              setsuccessMsg("")
              navigate('/')
          }, 3000)
        }).catch(error => setError(error.message));
                
          }).catch((error) => {
            setError(error.message)
          })
    }
    

    return (

  <div className='container'>
            <br /><br /><br /><br />
            <h1>Sign up</h1>
            <hr/>
            {successMsg&&<>
            <div className='success'>{successMsg}</div>
            <br/><br/>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleSignup}>
                <label>Name</label>
                <input type="text" className='form-control' required
                onChange={(e) => setName(e.target.value)} value={name}>
                </input>
                <br /><br />
                <label>Email</label>
                <input type="email" className='form-control' required
                onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br /><br />
                <label>Password</label>
                <input type="password" className='form-control' required
                onChange={(e) => setPassword(e.target.value)} value={password} ></input>
                <br /><br />
                

                <div className='btn-box'>
                    <span>If you already have an account, just Login
                    <Link to="../Login" className='link'>  Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>Sign Up</button>
                </div>
                </form>
                {error && <>
                 <div className='error'>{error}</div>
                 <br/><br/>
                 </>}

    </div>
  )
}
