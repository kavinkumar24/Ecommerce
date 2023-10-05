import React, { useState } from 'react';
import './products.css'
import Product from '../DummyData/Product';
import { useEffect } from 'react';
import Product1 from '../DummyData/Product1';
import Product2 from '../DummyData/Product2';
import ProductSnakcs1 from '../DummyData/Product2_filter'
import ProductSauce from '../DummyData/Product2_filter1'
import { Button, Offcanvas } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import NavigationBar from '../navbar/Navbar';
import { Col, Row, Nav, NavDropdown, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import CookieIcon from '@mui/icons-material/Cookie';
import KebabDiningIcon from '@mui/icons-material/KebabDining';

import { FaChevronDown, FaChevronUp,FaAppleAlt,FaDrumstickBite,FaRegHeart } from 'react-icons/fa';
import AppleIcon from '@mui/icons-material/Apple';
import Carousel from 'react-bootstrap/Carousel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { gql, useQuery } from "@apollo/client";

const Products = ({ cartItems, setCartItems}) => {

  const GET_SECONDARY_CATEGORIES = gql`
  query Products($filter: productfilter) {
    products(filter: $filter) {
      category
      categoryId
      description
      discount
      id
      name
      prize
      quantity {
        quantity
      }
    }
  } 
    `;
    const{
      loading:categoryLoading,
      error:categoryError,
      data:categoryData,
      refetch:categoryRefetch,
    }= useQuery(GET_SECONDARY_CATEGORIES,{
      variables:{
        "filter": {
          "categoryId": 19,
          "shopId": 1000,
        }
      },
    })
    console.log(categoryData)

    useEffect(() => {
      if (categoryData && categoryData.products) {
        setProducts(categoryData.products);
      }
    }, [categoryData]);
    
    
  const navigate = useNavigate();

  const [products, setProducts] = useState(Product.products);
  const [quantities, setQuantities] = useState(new Array(products.length).fill(1));
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(
    new Array(filteredProducts.length).fill(false)
  );
  const [show, setShow] = useState(false);
  
  const uniqueItems = [...new Set(cartItems)];
  const [showLikedProducts, setShowLikedProducts] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  
  const [showQuantityForm, setShowQuantityForm] = useState(new Array(filteredProducts.length).fill(false));


  const handleAddClick = (product, index, event) => {
    event.stopPropagation();
    addToCart(product, index);
    setShowQuantityForm((prevShowQuantityForm) =>
      prevShowQuantityForm.map((value, i) => (i === index ? true : value))
    );

    toast.success("Item added to the cart")
  };

  const handleLikeClick = (products, selectedIndex, event) => {
    setLikedProducts((prevLikedProducts) => [...prevLikedProducts, products[selectedIndex]]);
    toast.success("Item added to like list")
    
  };
  const showLike = ()=>{
    setShowLikedProducts(true);
  }
  
  

  const handleItemClick = () => {
    setShow(false);
    setProducts(Product1.products);
  };
  const [open, setOpen] = useState({
    fruits: false,
    meat: false,
    snacks: false,
    pet: false,
    home: false,
    dairy: false,
    cooking: false,
    breakfast: false,
    beverage: false,
    health: false
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleOpen = (key) => {
    setOpen((prevOpen) => {
      const newOpen = { ...prevOpen };
      Object.keys(newOpen).forEach((k) => {
        newOpen[k] = k === key ? !prevOpen[k] : false;
      });
      return newOpen;
    });
    if (key === 'fruits') {
      setProducts(Product.products);
    } else if (key === 'meat') {
      setProducts(Product1.products);
    }
    else if(key==='snacks'){
      setProducts(Product2.products)
    }
  };
  
  useEffect(() => {
    const savedLikedProducts = localStorage.getItem('likedProducts');
    if (savedLikedProducts) {
      setLikedProducts(JSON.parse(savedLikedProducts));
    }
  }, []);

  const [showLogo, setShowLogo] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); 
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);
  
  const handleNoodles = ()=>{
    setShow(false)
    setProducts(ProductSnakcs1.products)
  }

  const [showProgressBar, setShowProgressBar] = useState(false);
 
  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(Array.isArray(products) ? products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())) : []);
    } else {
      setFilteredProducts(Array.isArray(products) ? products : []);
    }
  }, [products, searchTerm]);
  

  const handleIncrease = (index) => {
    console.log('Increase clicked:', index);
    setQuantities(quantities.map((q, i) => i === index ? q + 1 : q));
  }

  const handleclose = ()=>{
    setShowPopup(false);
    document.querySelector('.overlay').style.display = 'none';

  }
  
  const handleDecrease = (index) => {
    console.log('Decrease clicked:', index);
    setQuantities(quantities.map((q, i) => i === index && q > 1 ? q - 1 : q));
  }
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
    document.querySelector('.overlay').style.display = 'block';

  }
  
  const handleSauce = ()=>{
    setShow(false)
    setProducts(ProductSauce.products)
  }
  let selectedIndex;
if (selectedProduct) {
  selectedIndex = filteredProducts.findIndex(
    (product) => product.id === selectedProduct.id
  );
}


const addToCart = (product, index) => {
  setShowSpinner(true);
  setTimeout(() => {
    setShowSpinner(false);
  }, 1000);
  setCartItems((prevCartItems) => {
    const newCartItems = [...prevCartItems];
    for (let i = 0; i < quantities[index]; i++) {
      newCartItems.push(product);
    }
    return newCartItems;
  });
  setShowProgressBar(true);
  setTimeout(() => setShowProgressBar(false), 3000);
};

  return (
<>
    {showLogo  ? (
    <div className='front_page'>

    <div className="logo-wrap1">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 -60 1000 450"
      style={{ enableBackground: 'new 0 0 855 150' }}
      xmlSpace="preserve"
    >
      <style type="text/css">
        
      </style>
      <text transform="matrix(1 0 0 1 0 125.5508)" className="st10 st11 st12">
        STRACKIT     
      </text>
    </svg>
  </div>


</div>
    ):(
    <div>

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
  
    <Nav.Link className="text-dark link opened" onClick={() => handleOpen('fruits')}>
  <div className="d-flex flex-row justify-content-between">
    <div className="d-flex flex-row">
      <div className="p-2">
        <AppleIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Fruits & Vegetables</div>
    </div>
    <div className="p-2">
      {open.fruits ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  </div>
</Nav.Link>
{open.fruits && (
        <ul className={`ms-1 submenu ${open.fruits ? 'show' : ''}`} id="ul_list1">
        <li>
          <Nav.Link className="text-dark">Fruits</Nav.Link>
        </li>
        <li>
          <Nav.Link className="text-dark" onClick={handleItemClick}>Vegetables</Nav.Link>
        </li>
        <li>
          
        </li>
      </ul>
      )}


<Nav.Link className="text-dark link" onClick={() => handleOpen('meat')}>
  <div className="d-flex flex-row justify-content-between">
    <div className="d-flex flex-row">
      <div className="p-2">
        <KebabDiningIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Meat & Fish</div>
    </div>
    <div className="p-2">
      {open.meat ? <ArrowDropUpIcon  /> : <ArrowDropDownIcon  />}
    </div>
  </div>
</Nav.Link>

      {open.meat && (
        <ul className="ms-1" id="ul_list1">
          <li>
            <Nav.Link className="text-dark">Chicken</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark">Meat</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark">Fish</Nav.Link>
          </li>
        </ul>
      )}
      <Nav.Link className="text-dark link" onClick={() => handleOpen('snacks')}>
  <div className="d-flex flex-row justify-content-between align-items-center">
    <div className="d-flex flex-row">
      <div className="p-2">
        <CookieIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Snacks</div>
    </div>
    <div className="p-2">
      {open.snacks ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  </div>
</Nav.Link>

      {open.snacks && (
        <ul className="ms-1" id ="ul_list1">
          <li>
            <Nav.Link className="text-dark">cookies</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark" onClick={handleNoodles}>Noodles</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark" onClick={handleSauce}>Sauce</Nav.Link>
          </li>
        </ul>
      )}
      


</Nav>
    </Offcanvas.Body>
  </Offcanvas>

    <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} uniqueItems={uniqueItems}/>


    <div className="overlay"></div>

    <div className="container">
      
       

      <Row>
        <Col md={3}>
        <Nav className="flex-column text-dark min-vh-100 bg_side1">
      
        <Nav.Link className="text-dark link opened" onClick={() => handleOpen('fruits')}>
  <div className="d-flex flex-row justify-content-between">
    <div className="d-flex flex-row">
      <div className="p-2">
        <AppleIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Fruits & Vegetables</div>
    </div>
    <div className="p-2">
      {open.fruits ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  </div>
</Nav.Link>

      {open.fruits && (
        <ul className={`ms-1 submenu ${open.fruits ? 'show' : ''}`} id="ul_list1">
        <li>
          <Nav.Link className="text-dark">Fruits</Nav.Link>
        </li>
        <li>
          <Nav.Link className="text-dark" onClick={handleItemClick}>Vegetables</Nav.Link>
        </li>
        <li>
          
        </li>
      </ul>
      )}
      <Nav.Link className="text-dark link" onClick={() => handleOpen('meat')}>
  <div className="d-flex flex-row justify-content-between">
    <div className="d-flex flex-row">
      <div className="p-2">
        <KebabDiningIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Meat & Fish</div>
    </div>
    <div className="p-2">
      {open.meat ? <ArrowDropUpIcon  /> : <ArrowDropDownIcon  />}
    </div>
  </div>
</Nav.Link>

      {open.meat && (
        <ul className="ms-1" id="ul_list1">
          <li>
            <Nav.Link className="text-dark">Chicken</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark">Meat</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark">Fish</Nav.Link>
          </li>
        </ul>
      )}
      <Nav.Link className="text-dark link" onClick={() => handleOpen('snacks')}>
  <div className="d-flex flex-row justify-content-between align-items-center">
    <div className="d-flex flex-row">
      <div className="p-2">
        <CookieIcon id="icons" />
      </div>
      <div className="p-2 side_txt">Snacks</div>
    </div>
    <div className="p-2">
      {open.snacks ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  </div>
</Nav.Link>

      {open.snacks && (
        <ul className="ms-1" id ="ul_list1">
          <li>
            <Nav.Link className="text-dark">cookies</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark" onClick={handleNoodles}>Noodles</Nav.Link>
          </li>
          <li>
            <Nav.Link className="text-dark" onClick={handleSauce}>Sauce</Nav.Link>
          </li>
        </ul>
      )}
      
    </Nav>
        </Col>
        <Col md={9}>
        <ToastContainer />
    
        <div className="row row-cols-1 row-cols-md-3 g-5 ddd">
            {filteredProducts.map((product, index) => (
              <div className="col" key={product.id}>
                <div className="card container1" onClick={() => handleCardClick(product)}>
                  <div className="card-image">
                    <img src={product.image} id="image" alt={product.title} />
                  </div>
                  <div className="card-body custom-card-body">
                    <div className="price"><strong>₹{product.prize}</strong></div>
                    <h5 className="card-title">{product.name}</h5>
                 
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
        </Col>
        </Row>
        <div className='view_like_product'>
        <button id="view_liked" onClick={showLike}><span title="liked products"><FaRegHeart id="heart"/></span></button>
        </div>
      

        {showPopup && selectedProduct && (
          <div className="modal show" style={{ display: 'block', overflow: 'hidden' }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content custom-modal">
      <div className="modal-header">
        <h5 className="modal-title">{selectedProduct.name}</h5>
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



            {/* <div className="strikethrough-price">₹{selectedProduct.strikethroughPrice}</div> */}
            <div className="price1" style={{color:'#089b7d'}}>₹{selectedProduct.prize}</div>
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
  <p id="details">{selectedProduct.description}</p>
</div>


<hr style={{marginTop:'40px'}}/>
<h5 style={{textAlign: 'left', marginTop:'30px',marginLeft: '40px', marginRight: '20px' }}>Related Products:</h5>
<div className="row row-cols-1 row-cols-md-4 g-5 ddd1">
  {filteredProducts.map((product, index) => (
    <div className="col custom-col"  key={product.id}>
      <div className="card container2 custom-card" onClick={() => handleCardClick(product)}>
        <div className="card-image">
          <img id="img_popup"src={product.image} alt={product.name}  />
        </div>
        <div className="card-body custom-card-body">
          <div className="price">
            <strong>₹{product.prize}</strong> 
          </div>
          <h5 className="card-title">{product.name}</h5>
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

  
{showLikedProducts && (
      <div className="modal show" style={{ display: 'block', overflow: 'hidden' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Liked Products</h5>
              <button type="button" className="btn-close" onClick={() => setShowLikedProducts(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-1 row-cols-md-4 g-5 ddd1">
                {likedProducts.map((product, index) => (
                  <div key={index} className="col custom-col" style={{ animation: `fadeIn ${index * 0.2}s` }}>
                    <div className="card container2 custom-card" onClick={() => handleCardClick(product)}>
                    <div className="card-image">
                    <img src={product.image} id="img_popup" alt={product.title} />
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

    )}
    </>
  );
}

export default Products;


