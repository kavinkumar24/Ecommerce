import React, { useState,useEffect } from 'react';
import './Showpage.css'
import NavigationBar from '../navbar/Navbar';


import { Carousel } from 'react-bootstrap'; 
import { FaPlus, FaMinus } from 'react-icons/fa'; 

const NewPage = ({products, setProducts,  cartItems, setCartItems}) => {

  const uniqueItems = [...new Set(cartItems)];

  const item_list = JSON.parse(localStorage.getItem('selectedItem'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  }
  const [showQuantityForm, setShowQuantityForm] = useState(new Array(filteredProducts.length).fill(false));
  const [searchTerm, setSearchTerm] = useState('');


  
  return (
    <>
     <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} showImageContainer={false} uniqueItems={uniqueItems}/>
    <div className="shop-page">
     
      <div className="newPageContainer">
        <div className="firstColumn">
          <img src={item_list.image} alt={item_list.title} />
          <h1>{item_list.title}</h1>
          <p>{item_list.address}</p>
          
        </div>
        <div className="secondColumn">
        <div className="row row-cols-1 row-cols-md-4 g-2">
              {products.map((product, index) => (
                <div className="col" key={product.id}>
                  <div className="card shop_container" onClick={() => handleCardClick(product)}>
                    <div className="card-image">
                      <img src={product.image} id="shopimage" alt={product.title} />
                    </div>
                    {!showQuantityForm[index] ? (
                      <button
                        className="btn cart-button cart1 page2_icon" 
                        
                      >
                        <FaPlus/>
                      </button>
                    ) : (
                      <>
                        <form
                          className="quantity-form1"
                          onSubmit={(e) => e.preventDefault()}
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <button
                            className="increment-decrement-button decrement1 padding_dec"
                            
                          >
                            <FaMinus />
                          </button>
                          <input type="text" readOnly />
                          <button
                            className="increment-decrement-button increment1 padding_inc"
                            
                          >
                            <FaPlus />
                          </button>
                        </form>
                      </>
                    )}
                    <div className="card-body custom-card-body">
                      <div className="price"><strong>₹{product.price}</strong>  <del>₹{product.strikethroughPrice}</del></div>
                      <h5 className="card-title">{product.title}</h5>      
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      {showPopup && selectedProduct && (
        <div className="modal show" style={{ display: 'block', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content custom-modal">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>
                <button type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="popup-image">
                      <Carousel data-bs-theme="dark">
                        {selectedProduct.image && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={selectedProduct.image}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        )}
                        {selectedProduct.slide1 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={selectedProduct.slide1}
                              alt="Second slide"
                            />
                          </Carousel.Item>
                        )}
                        {selectedProduct.slide2 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={selectedProduct.slide2}
                              alt="Third slide"
                            />
                          </Carousel.Item>
                        )}
                      </Carousel>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h5 id="heading1">{selectedProduct.title}</h5>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default NewPage
