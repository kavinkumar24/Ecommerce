import React, { useState } from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationBar from '../navbar/Navbar';
function Cart({ cartItems, setCartItems }) {

  const [showSpinner, setShowSpinner] = useState(false);


  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const itemCounts = {};
  cartItems.forEach(item => {
    if (itemCounts[item.id]) {
      itemCounts[item.id]++;
    } else {
      itemCounts[item.id] = 1;
    }
  });

  const uniqueItems = [...new Set(cartItems)];

  function onAddItem(item) {
    setCartItems([...cartItems, item]);
  }

  function onDecrement(item) {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      const index = cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
    }
    },1000)
  }  

  return (
    <>
      <NavigationBar cartItems={cartItems} showSlideshow={false} showHeader={false} showDropdown={false} />
      <div className="container-fluid">
        <h1 id="heading">Cart</h1>
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <h3 id="Sub_heading">added products</h3>
            <div className="card" id="Card1" style={{ width: '650px' }}>
              <div className="card-body">
                <div className="row row-cols-1 g-4" style={{ rowGap: '0' }} id="innercard">
                  {uniqueItems.map(item => (
                    <div className="col" id="col" key={item.id}>
                      <div style={{ display: 'flex' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
                        <div style={{ marginLeft: '10px' }}>
                          <h5 style={{ marginTop: '20px', textAlign: 'left', fontWeight: 'bold' }}>{item.title}</h5>
                          <p style={{ textAlign: 'left' }}>Price:
                            ₹{item.price}</p>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <p>Quanity: {itemCounts[item.id]}</p>
                        <button id="increment" onClick={() => onAddItem(item)} style={{ color: '#5928c4' }}>+</button>
                        <button id="decrement" onClick={() => onDecrement(item)} style={{ color: '#5928c4' }}> <i className="fas fa-trash-alt" style={{ color: '#5928c4' }}></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12">
          <div className="card" id="Checkout" style={{ marginTop: '50px' }}>
            <div className="card-body" style={{ textAlign: 'left' }}>
              <h4>Bill</h4>
              {uniqueItems.map(item => (
                <div key={item.id} style={{ display: 'flex', color:'black',justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span>{item.title}</span>
                  <span>₹{item.price * itemCounts[item.id]}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px',fontSize:'20px',fontWeight:'bolder'}} >
                <strong>Total:</strong>
                <strong>₹{total}</strong>
              </div>
              {cartItems.length > 0 ? (
        <Link to="/orderform">
        <button className="btn btn" id="Check_btn">Check Out</button>
        </Link>
        ) : (
        <button
        className="btn btn"
        id="Check_btn"
        onClick={() => toast.error('Your cart is empty')}
        >
        Check Out
        </button>
        )}

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    {showSpinner && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(211,211,211,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )}
    </>
  );
}

export default Cart;
