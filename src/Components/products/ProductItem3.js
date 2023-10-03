import React from 'react'
import { useState } from 'react';
import './products.css'
import NavigationBar from '../navbar/Navbar';
import Product from '../DummyData/Page_4_fil1';
import Product1 from '../DummyData/Page4_fil2'
import Product2  from '../DummyData/Page_4_fil3';
import Product3 from '../DummyData/Page_4_fil4'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import fil1 from '../images/Dress/hoodie.png'
import fil2 from '../images/Dress/shirt.png'

import fil3 from '../images/Dress/tshirt.png'
import fil4 from '../images/Dress/trousers.png'
import fil5 from '../images/Bakery_dropdown/Pice_Cake-2_uhialp-transformed.png'
import { Button, Offcanvas } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';


import fil6 from '../images/Bakery_dropdown/Pies-7_wlpzfd-transformed.png'
import fil7 from '../images/Bakery_dropdown/Pita_Bread-2_daz412-transformed.png'
import fil8 from '../images/Bakery_dropdown/Round_Cake-3_pigscm-transformed.png'
import { FaMinus, FaPlus,FaRegHeart } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';

import { ToastContainer, toast } from 'react-toastify';
 function ProductItem1({ cartItems, setCartItems}) {

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [products, setProducts] = useState(Product.products);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [quantities, setQuantities] = useState(new Array(products.length).fill(1));
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('')
  const [showSpinner, setShowSpinner] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(
    new Array(filteredProducts.length).fill(false)
  );

  const [showQuantityForm, setShowQuantityForm] = useState(new Array(filteredProducts.length).fill(false));
  const [likedProducts, setLikedProducts] = useState([]);
  
  const [showLikedProducts, setShowLikedProducts] = useState(false);
  const handleclose = () => {
    setShowPopup(false);
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  };
  const [open, setOpen] = useState({
    Hoodie: false,
    Shirts: false,
    tshirts: false,
    Tea: false,
    pants: false,
  });
  const uniqueItems = [...new Set(cartItems)];


  const handleOpen = (key) => {
    setOpen((prevOpen) => {
      const newOpen = { ...prevOpen };
      Object.keys(newOpen).forEach((k) => {
        newOpen[k] = k === key ? !prevOpen[k] : false;
      });
      return newOpen;
    });
    if (key === 'Hoodie') {
      setShow(false)
      setProducts(Product.products);
    } else if (key === 'Shirts') {
      setShow(false)
      setProducts(Product1.products);
    }

    else if (key === 'tshirts') {
      setShow(false)
      setProducts(Product2.products);
    }
    else if (key === 'pants') {
      setShow(false)
      setProducts(Product3.products);
    }
    // else if(key==='Croissant'){
    //   setProducts(Product1.products)

    // }
  };

  const handleHoodie = ()=>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setProducts(Product.products)

  }
  const handleshirts = () =>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setProducts(Product1.products)

  }

  const handletshirts =()=>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setProducts(Product2.products)
  }

  const handlepants =()=>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setProducts(Product3.products)

  }
  const handleLikeClick = (products, selectedIndex, event) => {
    setLikedProducts((prevLikedProducts) => [...prevLikedProducts, products[selectedIndex]]);
    toast.success("Item added to like list")
    
  };
  const showLike = ()=>{
    setShowLikedProducts(true);
  }
  
  
  let selectedIndex;
  if (selectedProduct) {
    selectedIndex = filteredProducts.findIndex(
      (product) => product.id === selectedProduct.id
    );
  }
  

  const handleAddClick = (product, index, event) => {
    event.stopPropagation();
    addToCart(product, index);
    setShowQuantityForm((prevShowQuantityForm) =>
      prevShowQuantityForm.map((value, i) => (i === index ? true : value))
    );

    toast.success("Item added to the cart")
  };
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
     <div class="topnav">

    <Button variant="primary" className="btn1"onClick={handleShow}>
        Filter
      </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="flex-column text-dark min-vh-100 bg_side">
      
      <Nav.Link className="text-dark link opened" onClick={() => handleOpen('Hoodie')}>
<div className="d-flex flex-row justify-content-between">
  <div className="d-flex flex-row">
    <div className="p-2">
    </div>
    <div className="p-2 side_txt">Hoodie</div>
  </div>
</div>
</Nav.Link>

  
    <Nav.Link className="text-dark link" onClick={() => handleOpen('Shirts')}>
<div className="d-flex flex-row justify-content-between">
  <div className="d-flex flex-row">
    <div className="p-2">
      </div>
    <div className="p-2 side_txt">Shirts</div>
  </div>
  
</div>
</Nav.Link>

    <Nav.Link className="text-dark link" onClick={() => handleOpen('tshirts')}>
<div className="d-flex flex-row justify-content-between align-items-center">
  <div className="d-flex flex-row">
    <div className="p-2">
    </div>
    <div className="p-2 side_txt">tshirts</div>
  </div>
  
</div>
</Nav.Link>

<Nav.Link className="text-dark link" onClick={() => handleOpen('pants')}>
<div className="d-flex flex-row justify-content-between align-items-center">
  <div className="d-flex flex-row">
    <div className="p-2">
    </div>
    <div className="p-2 side_txt">pants</div>
  </div>
  
</div>
</Nav.Link>




    
  </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} uniqueItems={uniqueItems}/>
  <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-2 pt-2">
			
			<div class="col-2">
        
				<div class="card card-block card-1" onClick={handleHoodie}>

        <div className="card-image scroll_filter1_img_logo">
    <img src={fil1} alt="filter1" />
    <p className='text_card'>Hoodie</p>
  </div>


        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-2" onClick={handleshirts}>
      
      
        <div className="card-image scroll_filter1_img_logo" >
    <img src={fil2} alt="filter1" />
    <p className='text_card'>Shirts</p>
  </div>

        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-3" onClick={handletshirts}>
        <div className="card-image scroll_filter1_img_logo">
    <img src={fil3} alt="filter1" />
    <p className='text_card'>T-shirts</p>
  </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-4" onClick={handlepants}>
        <div className="card-image scroll_filter1_img_logo">
    <img src={fil4} alt="filter1" />
    <p className='text_card'>Pants</p>

  </div>
        </div>
			</div>
		
		
			
			
		
    </div>
    <div className="container"> 
      
    <div className="row row-cols-1 row-cols-md-4 g-5 ddd">
            {filteredProducts.map((product, index) => (
              <div className="col" key={product.id}>
                <div className="card container3" onClick={() => handleCardClick(product)}>
                  <div className="card-image">
                    <img src={product.image} id="image" alt={product.title} />
                  </div>
                  {!showQuantityForm[index] ? (
                     <button
                     className="btn cart-button cart1 page2_icon" 
                     onClick={(event) => handleAddClick(product, index, event)}
                    
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(index);
                            }}
                          >
                            <FaMinus />
                          </button>
                          <input type="text" value={quantities[index]} readOnly />
                          <button
                            className="increment-decrement-button increment1 padding_inc"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(index);
                            }}
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
        {showPopup && selectedProduct && (
          <div className="modal show" style={{ display: 'block', overflow: 'hidden' }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content custom-modal">
      <div className="modal-header">
        <h5 className="modal-title">{selectedProduct.title}</h5>
        <button type="button" className="btn-close" onClick={handleclose}></button>
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
          <FaRegHeart id="like" onClick={(event) => handleLikeClick(products, selectedIndex, event)} />
            
            <h5 id="heading1">{selectedProduct.title}</h5>
            
            <p id="des" style={{ color: '#6b7280' }}>
  {showFullDescription[selectedIndex]
    ? selectedProduct.description
    : selectedProduct.description.split(' ').slice(0, 30).join(' ')}
  {!showFullDescription[selectedIndex] && (
  <a id="read_more"
      href="#2"
      onClick={(event) => {
        event.preventDefault();
        setShowFullDescription((prevShowFullDescription) =>
          prevShowFullDescription.map((value, i) =>
            i === selectedIndex ? true : value
          )
        );
      }}
    >
      <br></br>
      Read More
    </a>
  )}
</p>



            <div className="strikethrough-price">₹{selectedProduct.strikethroughPrice}</div>
            <div className="price1" style={{color:'#089b7d'}}>₹{selectedProduct.price}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
  className="btn cart-button cart1"
  onClick={(event) =>
    handleAddClick(selectedProduct, selectedIndex, event)
  }
  id="pop_up_button"
  style={{ color: 'white', paddingLeft: '12px', width: '300px', marginTop: '20px' }}
>
  Add to shopping cart
</button>

  <p id="available">Available product</p>
</div>



          </div>
        </div>
        <hr />
        <div className="col-md-4" style={{ textAlign: 'left', marginTop:'30px',marginLeft: '40px', marginRight: '20px' }}>
  <h5>Details:</h5>
  <p id="details">{selectedProduct.details}</p>
</div>


<hr style={{marginTop:'40px'}}/>
<h5 style={{textAlign: 'left', marginTop:'30px',marginLeft: '40px', marginRight: '20px' }}>Related Products:</h5>
<div className="row row-cols-1 row-cols-md-4 g-5 ddd1 p-3">
  {filteredProducts.map((product, index) => (
    <div className="col custom-col"  key={product.id}>
      <div className="card container3 custom-card" onClick={() => handleCardClick(product)}>
        <div className="card-image">
          <img id="img_popup"src={product.image} alt={product.title}  />
        </div>
        <div className="card-body custom-card-body">
          <div className="price">
            <strong>₹{product.price}</strong> <del>₹{product.strikethroughPrice}</del>
          </div>
          <h5 className="card-title">{product.title}</h5>
          <div className="card-footer bg_foot">
            {!showQuantityForm[index] ? (
              <button
                className="btn cart-button cart1"
                onClick={(event) => handleAddClick(product, index, event)}
                style={{ width: '100%' }}
              >
                Add
              </button>
            ) : (
              <>
                <form
                  className="quantity-form"
                  onSubmit={(e) => e.preventDefault()}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <button
                    className="increment-decrement-button decrement1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrease(index);
                    }}
                  >
                    <FaMinus />
                  </button>
                  <input type="text" value={quantities[index]} readOnly />
                  <button
                    className="increment-decrement-button increment1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrease(index);
                    }}
                  >
                    <FaPlus />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

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
  
  {showSpinner && (
  <div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    zIndex: 9999,
    transform: "translate(-50%, -50%)"
  }}
  >
    <div>
      <div className="spinner-border" role="status"></div>
      <div>Loading...</div>
    </div>
  </div>
)}

    </>
  );
}

export default ProductItem1