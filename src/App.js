import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { Signup } from "./components/Signup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { AddProducts } from "./components/AddProducts";
import { Cart } from "./components/Cart";



function App() {
  return (
  
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        
        
        
        </Routes>
      </Router>
     
   
  );
}

export default App;


{/* <Router>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/navbar" element={<Navbar />} />

</Routes>
</Router> */}
