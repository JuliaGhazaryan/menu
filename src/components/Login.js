import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {auth, fs} from "./Config"
import {useNavigate} from 'react-router-dom'


export const Login = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const [successMsg, setsuccessMsg] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).then(() => {
          
          setEmail('');
          setPassword('');
          setError('');
          
            navigate('/')
        
      }).catch(error => setError(error.message));
  
    }



  return (
    
  <div className='container'>
            <br /><br /><br /><br />
            <h1>Login</h1>
            <hr/>
            {/* {successMsg&&<>
            <div className='success'>{successMsg}</div>
            <br/><br/>
            </>} */}
            <form autoComplete="off" className='form-group' onSubmit={handleLogin}>
               
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br /><br />
                <label>Password</label>
                <input type="password" className='form-control' required
                onChange={(e) => setPassword(e.target.value)} value={password} ></input>
                <br /><br />
                

                <div className='btn-box'>
                    <span> Don't have an account yet? Sign Up
                    <Link to="../Signup" className='link'>  Here   </Link></span>
                    
                    <button type="submit" className='btn btn-success btn-md'> Sign Up </button>
                    
                </div>
                </form>
                {error && <>
                 <div className='error'>{error}</div>
                 <br/><br/>
                 </>}

    </div>
  )
}
