import React from 'react'
import { useState } from 'react';
import './products.css'
import NavigationBar from '../navbar/Navbar';
import Product from '../DummyData/Product1';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

 function ProductItem1({ cartItems, setCartItems}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState(Product.products);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [quantities, setQuantities] = useState(new Array(products.length).fill(1));
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('')
  const [showSpinner, setShowSpinner] = useState(false);


  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const handleIncrease = (index) => {
    console.log('Increase clicked:', index);
    setQuantities(quantities.map((q, i) => i === index ? q + 1 : q));
  }
  
  const handleDecrease = (index) => {
    console.log('Decrease clicked:', index);
    setQuantities(quantities.map((q, i) => i === index && q > 1 ? q - 1 : q));
  }
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  }


  const addToCart = (product, index) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      navigate('/cart');
    }, 1000);
    const newCartItems = [...cartItems];
    for (let i = 0; i < quantities[index]; i++) {
      newCartItems.push(product);
    }
    setCartItems(newCartItems);
    setShowProgressBar(true);
    setTimeout(() => setShowProgressBar(false), 3000);
  }
  
  return (
    <>
    <NavigationBar cartItems={cartItems} showSlideshow={false} showHeader = {false}  onSearch={setSearchTerm} />

    <div className="container">
        <br></br>
      <h1 style={{position:'relative',top:'0px',marginBottom:'1rem'}} id="heading">Fashion</h1>    
      <br></br>    
      <br></br>
      <br></br>
      
      <div className="row row-cols-1 row-cols-md-4 g-5 ddd">
        {filteredProducts.map((product, index) => (
          <div className="col" key={product.id}>
            <div className="card container1" onClick={() => handleCardClick(product)}>
              <div className="card-image">
                <img src={product.image} id="image"alt={product.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="card-footer">
                  <div className="price">₹{product.price}</div>
                  <form className="quantity-form" onSubmit={e => e.preventDefault()}>
                  <button className="increment-decrement-button decrement1" onClick={(e) => { e.stopPropagation(); handleDecrease(index); }}>-</button>
                  <input type="text" value={quantities[index]} readOnly />

                  <button className="increment-decrement-button increment1" onClick={(e) => { e.stopPropagation(); handleIncrease(index); }}>+</button>

                  </form>
                  <button className="btn cart-button cart1" onClick={() => addToCart(product,index)}>
                    <i className="fas fa-shopping-cart carticon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && selectedProduct && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <div className="popup-content">
          <span className="close" onClick={() => setShowPopup(false)}>×</span>

            <div className="popup-image">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
            </div>
            <div className="popup-details">
              <h2 id="head">{selectedProduct.title}</h2>
              <p id='des'>{selectedProduct.description}</p>
              <div className="strikethrough-price">₹{selectedProduct.strikethroughPrice}</div>
        <div className="price1">₹{selectedProduct.price}</div>
        
        <button
            onClick={() => {
              const index = products.findIndex(p => p.id === selectedProduct.id);
              addToCart(selectedProduct, index);
              setShowProgressBar(true);
              setTimeout(() => setShowProgressBar(false), 3000);
            }}
          >
            Add to Cart
          </button>

        <button>Buy Now</button>
        <div class="offer-container">
        <a href="#ee" class="offer-link">
          <i class="fas fa-tag green-icon"></i> Bank OfferFlat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999T&C
        </a>
        <br></br>
        <a href="#ww" class="offer-link">
          <i class="fas fa-tag green-icon"></i> Bank OfferFlat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C
        </a><br></br>
        <a href="#ee" class="offer-link">
          <i class="fas fa-tag green-icon"></i> Bank OfferFlat ₹4,000 Off on HDFC Bank Credit Card EMI Transactions on orders of ₹50,000 and aboveT&C
        </a>
  </div>
      </div>
    </div>
  </div>
)}


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
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <p>Copyright © 2023 Company Name</p>
        </div>
      </div>
    </div>
  </footer>


    </>
  );
}

export default ProductItem1