import React from "react";
import "./Header.css"


const Header = () =>{
    return(
        <header>
            <div className="container">
                <div className="col-md-6">
                    <h2 id="text">“Good food is the foundation of genuine happiness.” </h2>
                    <p id="par">A great restaurant is one that just makes you feel like you're not sure whether you went out or you came home and confuses you. If it can do both of those things at the same time, you're hooked.</p>
                <button>Order now</button>
                <button>Learn more</button>
                </div >

            </div>
        </header>
    )
}

export default Header