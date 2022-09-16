import React from "react";
import {useNavigate} from "react-router-dom"

function About  () {
    const navigate = useNavigate()
   
    return(
        <div>
        About
        <button onClick={()=>{navigate("../Navbar")}}>Go to Navbar</button>

        </div>
    )
}

export default About

// import React from "react";
// import {Link} from "react-router-dom"

// function Home  () {
//     return(
//         <div>
//         Home
//         <Link to="./About">Go to About</Link>

//         </div>
//     )
// }

// export default Home

// import React from 'react'
// import {useNavigate} from "react-router-dom"


// function Navbar() {
//     const navigate = useNavigate()
 
//     return(
//         <div>
//         Navbar
//         <button onClick={()=>{navigate("/")}}>Go to Home</button>

//         </div>
//     )
// }

// export default Navbar