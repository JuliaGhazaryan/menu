import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../pictures/logo2.png"
import Icon from 'react-icons-kit'
import {shoppingCart} from "react-icons-kit/feather/shoppingCart"
import {auth} from "./Config"
import { useNavigate } from 'react-router-dom'


export const Navbar = ({user, totalProducts}) => {

  const navigate = useNavigate()

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/')
    })
  }

  return (
    <div className='navbar'>
    <div className='leftside'>
        <img src={logo} alt="logo" />
    </div>
    <div className='rightside'>
      {!user&&<>
        <div><Link to="signup" className='navlink'>SIGN UP</Link></div>
        <div><Link to="login" className='navlink'>LOGIN</Link></div>
        </>}
        {user &&<>
         
  <div><Link to="/" className='navlink'>{user}</Link></div>
  <div className="cart-menu-btn">
    <Link to="cart" className='navlink' >
      <Icon icon={shoppingCart} size={20}/>
    </Link>
    <span className='cart-indicator'>{totalProducts}</span>
  </div>
  <div className='btn btn-danger btn-md'
  onClick={handleLogout}>Sign out</div>

 </>}
    </div>
    </div>
  )
  

}
