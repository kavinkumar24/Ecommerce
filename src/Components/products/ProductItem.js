import React, { useState } from 'react';
import './products.css'
import Product from '../DummyData/Product';
import { useEffect } from 'react';
import ProductSnakcs1 from '../DummyData/Product2_filter'
import ProductSauce from '../DummyData/Product2_filter1'
import { Button, Offcanvas } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'; 


import { useNavigate } from 'react-router-dom';
import NavigationBar from '../navbar/Navbar';
import { Col, Row, Nav, NavDropdown, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import {FaRegHeart,FaHeart } from 'react-icons/fa';
import AppleIcon from '@mui/icons-material/Apple';
import Carousel from 'react-bootstrap/Carousel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { gql, useQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';

const Products = ({ cartItems, setCartItems}) => {

  const GET_MAIN_CATEGORIES = gql`
    query MasterCategories($filter: MasterCategoryInput) {
      masterCategories(filter: $filter) {
        category
        shopId
        status
        position
        image
        id
      }
    } 
  `;
  const GET_SECONDARY_CATEGORIES = gql`
  query SecondaryCategories($filter: categoryFilter) {
    secondaryCategories(filter: $filter) {
      category
      id
      image
      shopId
      status
    }
  }
    `;

  const GET_PRODUCTS= gql`
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
  } `
    

    const { loading:Product_loading_main, error:product_main_error_find, data } = useQuery(GET_MAIN_CATEGORIES, {
      variables: {
        "filter": {
          "shopId": 2
        }
      },
    });
    const [selectedMasterCategory, setSelectedMasterCategory] = useState(null);

const { loading: secondaryLoading, error: secondaryError, data: secondaryData } = useQuery(GET_SECONDARY_CATEGORIES, {
  variables: {
    "filter": {
      "shopId": 2,
      "masterCategoryId": selectedMasterCategory ? selectedMasterCategory.id : null,
    }
  },
});



const { loading: productLoading, error: ProductError, data: ProductData } = useQuery(GET_PRODUCTS, {
  variables: {
    "filter": {
      "shopId": 2,
      "masterCategoryId": selectedMasterCategory ? selectedMasterCategory.id : null,
      
    }
  },
});


    useEffect(() => {
      if (ProductData && ProductData.products) {
        setProducts(ProductData.products);
      }
    }, [ProductData]);
    
    
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


  const [showQuantityForm, setShowQuantityForm] = useState(JSON.parse(localStorage.getItem('showQuantityForm')) || new Array(filteredProducts.length).fill(false));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [addedItems, setAddedItems] = useState(JSON.parse(localStorage.getItem('addedItems')) || []);

  const handleAddClick = (product, index, event) => {
    event.stopPropagation();
    if(isLoggedIn===false){
      alert("Please Login to add products")
      return
    }
    addToCart(product, index);
    const newAddedItems = [...addedItems, product.id];
    setAddedItems(newAddedItems);
    
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    localStorage.setItem('addedItems', JSON.stringify(newAddedItems)); 
  };

  
  const [showStarburst, setShowStarburst] = useState(false);
  
  const [liked, setLiked] = useState(new Array(products.length).fill(false));

  const handleLikeClick = (products, selectedIndex, event) => {
  const selectedProduct = products[selectedIndex];

    setLikedProducts((prevLikedProducts) => {
      if (!prevLikedProducts.includes(selectedProduct)) {
        toast.success("Product liked");
        return [...prevLikedProducts, selectedProduct];
      } else {
        toast.info("Like removed");
        return prevLikedProducts.filter(product => product !== selectedProduct);
      }
    });
  
    setLiked(prevLiked => {
      const newLiked = [...prevLiked];
      newLiked[selectedIndex] = !newLiked[selectedIndex];
      return newLiked;
    });
  };
  

  // const handleremovelike = (products,selectedIndex,event)=>{
  //   setLikedProducts((prevLikedProducts)=>)
  // }
  const showLike = ()=>{
    setShowLikedProducts(true);
  }

  function handleSecondaryCategoryClick(secondaryCategory, masterCategory) {
   toast.info(secondaryCategory.category)
    setOpen({ ...open, [masterCategory.id]: false });
    setShow(false)
  }
  

  const [open, setOpen] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
 

  
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
    }, 3400); 
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
      setFilteredProducts(Array.isArray(products) ? products.filter(product => product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) : []);
    } else {
      setFilteredProducts(Array.isArray(products) ? products : []);
    }
  }, [products, searchTerm]);
  
  const handleIncrease = (index) => {
    console.log('Increase clicked:', index);
    setQuantities(prevQuantities => ({ ...prevQuantities, [index]: (prevQuantities[index] || 0) + 1 }));
  localStorage.setItem('quantities', JSON.stringify(quantities));
  }

  const handleclose = ()=>{
    setShowPopup(false);
    document.querySelector('.overlay').style.display = 'none';

  }

const handleMasterCategoryClick = (category) => {

  setSelectedMasterCategory(category);

  console.log(category.id)
  
  setOpen((prevOpen) => ({
    ...prevOpen,
    [category.id]: !prevOpen[category.id],
  }));
};


  const handleDecrease = (index) => {
    console.log('Decrease clicked:', index);
    setQuantities(prevQuantities => ({ ...prevQuantities, [index]: Math.max((prevQuantities[index] || 0) - 1, 0) }));
  localStorage.setItem('quantities', JSON.stringify(quantities));
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

useEffect(() => {
  localStorage.setItem('quantities', JSON.stringify(quantities));
}, [quantities]);

// const ADD_TO_CART = gql`
//   mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!, $shopId: ID!) {
//     AddToCart(userId: $userId, productId: $productId, quantity: $quantity, shopId: $shopId) {
//       id
//       quantity
//     }
//   }
// `;

// const [addProductToCart] = useMutation(ADD_TO_CART);


const addToCart = (product, index) => {
  setShowSpinner(true);
  
  // addProductToCart({ variables: { userId: 2 ,productId: 2, quantity: 1, shopId: 2 } })
    
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
        STRA<tspan style={{color:'black'}}>CK</tspan>IT     
      </text>
    </svg>
   
  </div>

  <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >


</div>
    ):( 
    <div>

<div class="topnav">
<ToastContainer />

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
    <Nav.Link className="text-dark link">
  {data.masterCategories && data.masterCategories.map((masterCategory) => (
  <Nav.Link className="text-dark link opened" onClick={() => handleMasterCategoryClick(masterCategory)}>
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-row">
        <div className="p-2">

          <AppleIcon id="icons" />
        </div>
        <div className="p-2 side_txt">{masterCategory.category}</div>
      </div>
      <div className="p-2">
        {open[masterCategory.category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
    </div>
      {open[masterCategory.id] && (
      <ul className={`ms-1 submenu ${open[masterCategory.id] ? 'show' : ''}`} id="ul_list1">
        {secondaryData && secondaryData.secondaryCategories && secondaryData.secondaryCategories.map((secondaryCategory) => (
  <li key={secondaryCategory.id}>
    <Nav.Link className="text-dark" onClick={() => handleSecondaryCategoryClick(secondaryCategory, masterCategory)}>
      {secondaryCategory.category}
    </Nav.Link>
  </li>
))}
      </ul>
    )}
  </Nav.Link>
    
))}
 
</Nav.Link>



</Nav>
    </Offcanvas.Body>
  </Offcanvas>

    <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} uniqueItems={uniqueItems}/>


    <div className="overlay"></div>

    <div className="container">
      
       

      <Row>
        <Col md={3}>
          {/* this is the desktop sidebar */}
        <Nav className="flex-column text-dark min-vh-100 bg_side1">
        
    <Nav.Link className="text-dark link opened">
  {data.masterCategories.map((masterCategory) => (
  <Nav.Link className="text-dark link opened" onClick={() => handleMasterCategoryClick(masterCategory)}>
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-row">
        <div className="p-2">

          <AppleIcon id="icons" />
        </div>
        <div className="p-2 side_txt">{masterCategory.category}</div>
      </div>
      <div className="p-2">
        {open[masterCategory.category] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
    </div>
      {open[masterCategory.id] && (
      <ul className={`ms-1 submenu ${open[masterCategory.id] ? 'show' : ''}`} id="ul_list1">
        {secondaryData && secondaryData.secondaryCategories && secondaryData.secondaryCategories.map((secondaryCategory) => (
  <li key={secondaryCategory.id}>
    <Nav.Link className="text-dark" onClick={() => handleSecondaryCategoryClick(secondaryCategory, masterCategory)}>
      {secondaryCategory.category}
    </Nav.Link>
  </li>
))}
      </ul>
    )}
  </Nav.Link>
    
))}
 
</Nav.Link>


      {/* {open.fruits && (
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
       */}
    </Nav>
        </Col>
        <Col md={9}>
        <ToastContainer />
    
        <div className="row row-cols-1 row-cols-md-3 g-5 ddd">
            {filteredProducts && filteredProducts.map((product, index) => (
              <div className="col" key={product.id}>
                <div className="card container1" onClick={() => handleCardClick(product)}>
                  <div className="card-image">
                    <img src={product.image} id="image" alt={product.title} />
                  </div>
                  <div className="card-body custom-card-body">
                    <div className="price"><strong>₹{product.prize}</strong></div>
                    <h5 className="card-title">{product.name}</h5>
                 
                  <div className="card-footer bg_foot">
                  {addedItems.includes(product.id) ? (
    <div className=" btn cart-button cart1" id="quantity-label">
      Item added to cart
    </div>
  ) : (
    <button
      className="btn cart-button cart1" 
      onClick={(event) => handleAddClick(product, index, event)}
      style={{ width: '100%' }}
    >
      Add
    </button>
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
          <div className="modal show" style={{ display: 'block', overflow: 'hidden' }} onClick={(e) => {
            if (e.target.className === 'modal show') {
              handleclose();
            }}}>
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
          {liked[selectedIndex] ? <FaHeart className='liked' id="like" onClick={(event) => handleLikeClick(products, selectedIndex, event)} /> : <FaRegHeart id="like" onClick={(event) => handleLikeClick(products, selectedIndex, event)} />}


            
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
            className={`btn cart-button cart1 ${addedItems.includes(selectedProduct.id) ? 'disabled' : ''}`}
            onClick={(event) =>
              !addedItems.includes(selectedProduct.id) && handleAddClick(selectedProduct, selectedIndex, event)
            }
            id="pop_up_button"
            style={{ color: 'white', paddingLeft: '12px', width: '300px', marginTop: '20px' }}
          >
            {addedItems.includes(selectedProduct.id) ? 'Item added to cart' : 'Add to shopping cart'}
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
                  {addedItems.includes(product.id) ? (
    <div className="quantity-label">
      Item added to cart
    </div>
  ) : (
    <button
      className="btn cart-button cart1" 
      onClick={(event) => handleAddClick(product, index, event)}
      style={{ width: '100%' }}
    >
      Add
    </button>
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
                    <img src={product.image} id="img_popup" alt={product.name} />
                    </div>
                    <div className="card-body custom-card-body">
          <div className="price">
            <strong>₹{product.prize}</strong> 
          </div>
          <h5 className="card-title">{product.title}</h5>
          <div className="card-footer bg_foot">
                  {addedItems.includes(product.id) ? (
          <div className="quantity-label">
            Item added to cart
          </div>
        ) : (
          <button
            className="btn cart-button cart1" 
            onClick={(event) => handleAddClick(product, index, event)}
            style={{ width: '100%' }}
          >
            Add
          </button>
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


