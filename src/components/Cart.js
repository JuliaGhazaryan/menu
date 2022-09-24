import React, {useState, useEffect} from 'react'
import { Navbar } from "./Navbar"
import {auth, fs} from "./Config"
import { CartProducts } from './CartProducts'
import StripeCheckout from 'react-stripe-checkout'

// export const Cart = () => {

//     function GetCurrentUser(){
//         const [user,setUser] = useState(null)
//       useEffect(()=>{
//         auth.onAuthStateChanged(user=>{
//           if(user){
//             fs.collection("users").doc(user.uid).get().then(snapshot=>{
//               setUser(snapshot.data().Name)
//             })
      
//           }else{
//             setUser(null)
//           }
      
//         })
      
//       }, [])
      
//         return user
//       }
      
//       const user = GetCurrentUser()

//       const[cartProducts, setCartProducts] = useState([])

//       useEffect(()=>{
//         auth.onAuthStateChanged(user=>{
//             if(user){
//                 fs.collection("Cart" + user.uid).onSnapshot(snapshot=>{
//                     const newCartProduct = snapshot.docs.map((doc)=>({
//                         ID: doc.id,
//                         ...doc.data(),
//                     }))
//                     setCartProducts(newCartProduct)
//                 })
//             }else{
//                 console.log("User is not signed in")
//             }
//         })
//       },[])

//      // console.log(cartProducts)

//      let Product;
    
     
//      const cartProductIncrease=(cartProduct)=>{
//          //console.log(cartProduct);
//          Product=cartProduct;
//          Product.qty=Product.qty+1;
//          Product.TotalProductPrice=Product.qty*Product.price;
         
//          auth.onAuthStateChanged(user=>{
//              if(user){
//                  fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
//                      console.log('increment added');
//                  })
//              }
//              else{
//                  console.log('User is not logged in to increment');
//              }
//          })
//      }

//          // cart product decrease functionality
//     const cartProductDecrease =(cartProduct)=>{
//         Product=cartProduct;
//         if(Product.qty > 1){
//             Product.qty=Product.qty-1;
//             Product.TotalProductPrice=Product.qty*Product.price;
//              // updating in database
//             auth.onAuthStateChanged(user=>{
//                 if(user){
//                     fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
//                         console.log('decrement');
//                     })
//                 }
//                 else{
//                     console.log('user is not logged in to decrement');
//                 }
//             })
//         }
//     }

//   return (
//     <>
//     <Navbar user={user} />
//     <br/> <br/>
//     {cartProducts.length >0 && (
//         <div className='container-fluid'>
//             <h1 className='text-center'>Cart</h1>
//             <div className='Products-box'>
//                 <CartProducts cartProducts = {cartProducts} 
//                 cartProductIncrease={cartProductIncrease} 
//                 cartProductDecrease={cartProductDecrease}
//                 />
//             </div>
//         </div>
//     )}
//     {cartProducts.length < 1 && (
//         <div className='container-fluid'>No product to show</div>
//     )}

//     </>
//   )
// }

//


export const Cart = () => {

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().Name);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    
    const [cartProducts, setCartProducts]=useState([]);

   
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);

       
       const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

       
       const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

       const totalQty = qty.reduce(reducerOfQty,0);
   
       // console.log(totalQty);

        
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);


    let Product;
    
   
    const cartProductIncrease=(cartProduct)=>{
        //console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

   
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
           
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

    const [totalProducts, setTotalProducts]=useState(0);
      
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  
   
    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                           cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total Number of Products: <span>{totalQty}</span>
                        </div>
                        <br/>
                        <div>
                        Total Price to Pay: <span> {totalPrice} AMD</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                        
                        ></StripeCheckout>
                </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}