import React from 'react'
import { useState } from 'react';
import './products.css'
import NavigationBar from '../navbar/Navbar';
import Product from '../DummyData/Page_2_fil1';
import Product1 from '../DummyData/Page_2_fil2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import fil1 from '../images/Bakery_dropdown/Juice-1_lx8xnf-transformed.png'
import fil2 from '../images/Bakery_dropdown/Cookies-1_d8mfwp-transformed.png'
import fil3 from '../images/Bakery_dropdown/Croissant-4_m87lsz-transformed.png'
import fil4 from '../images/Bakery_dropdown/Coffee_Tea-2_gblecp-transformed.png'
import fil5 from '../images/Bakery_dropdown/Pice_Cake-2_uhialp-transformed.png'
import { Button, Offcanvas } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { gql, useQuery } from "@apollo/client";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import fil6 from '../images/Bakery_dropdown/Pies-7_wlpzfd-transformed.png'
import fil7 from '../images/Bakery_dropdown/Pita_Bread-2_daz412-transformed.png'
import fil8 from '../images/Bakery_dropdown/Round_Cake-3_pigscm-transformed.png'
import { FaMinus, FaPlus,FaRegHeart,FaCheck} from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; 
 function ProductItem1({ cartItems, setCartItems}) {

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

const { loading, error, data } = useQuery(GET_MAIN_CATEGORIES, {
  variables: {
    "filter": {
      "shopId": 12
    }
  },
});
const [selectedMasterCategory, setSelectedMasterCategory] = useState(null);

const { loading: secondaryLoading, error: secondaryError, data: secondaryData } = useQuery(GET_SECONDARY_CATEGORIES, {
  variables: {
    "filter": {
      "shopId": 12,
      "masterCategoryId": selectedMasterCategory ? selectedMasterCategory.id : null,
    }
  },
});
useEffect(() => {
  if (secondaryError) {
    setShowSpinner(false);
    console.error('An error occurred:', secondaryError.message);
  } else if (!secondaryLoading) {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }
}, [secondaryLoading, secondaryError]);



const [selectedSecondaryCategory, setSelectedSecondaryCategory] = useState(null);
const { loading: secondaryproductLoading, error: secondaryProductError, data: ProductData } = useQuery(GET_PRODUCTS, {
  variables: {
      "filter": {
        "shopId": 12,
        "categoryId": selectedSecondaryCategory ? selectedSecondaryCategory.id : null,
      }
  },
});
useEffect(() => {
  if (secondaryProductError) {
    setShowSpinner(false);
    alert("error")
  } else if (!secondaryproductLoading) {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }
}, [secondaryproductLoading, secondaryProductError]);




console.log(ProductData)
console.log(secondaryData);

useEffect(() => {
  if (ProductData && ProductData.products) {
    setProducts(ProductData.products);
  }
}, [ProductData]);
console.log(data)


  const navigate = useNavigate();
  const [products, setProducts] = useState(Product.products);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [quantities, setQuantities] = useState(new Array(products.length).fill(1));
  const [showPopup, setShowPopup] = useState(false);
  const[showcategories,setShowCategories] = useState(false);
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
    Juice: false,
    Cookies: false,
    Croissant: false,
    Tea: false,
    Slicecake: false,
    Feeter_pies: false,
    pitabread: false,
    Roundcake: false,
  });

  const [open_drop, setOpen_drop] = useState(null);

 

  const uniqueItems = [...new Set(cartItems)];

  const handleJuice = ()=>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setShowCategories(true);
    setProducts(Product.products)

  }
  const handleCookies = () =>{
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setProducts(Product1.products)

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

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

 
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  }


  function handleSecondaryCategoryClick(secondaryCategory, masterCategory) {
    toast.info(secondaryCategory.category)
     setOpen({ ...open, [masterCategory.id]: false });
   }
   const handleMasterCategoryClick =(masterCategory) => {
    setShowSpinner(true);
    setOpen((prevOpen) => {
      let newOpenState = { ...prevOpen };
      if (newOpenState[masterCategory.id]) {
        newOpenState[masterCategory.id] = false;
      } else {
        for (let key in newOpenState) {
          newOpenState[key] = false;
        }
        newOpenState[masterCategory.id] = true;
      }
  
      return newOpenState;
    });
  
    setSelectedMasterCategory(masterCategory);

    
  };
  



  
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
    
    <ToastContainer />

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
        {data && data.masterCategories.map((masterCategory) => (
          <Nav.Link className="text-dark link opened" onClick={() => handleMasterCategoryClick(masterCategory)}>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <div className="p-2">
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
</Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} uniqueItems={uniqueItems}/>
  <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-2 pt-2">
			
			<div class="col-2">
        
				<div class="card card-block card-1" onClick={handleJuice}>

        <div className="card-image scroll_filter_img">
    <img src={fil1} alt="filter1" />
    <p className='text_card'>Juice</p>
  </div>


        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-2" onClick={handleCookies}>
      
      
        <div className="card-image scroll_filter_img" >
    <img src={fil2} alt="filter1" />
    <p className='text_card'>Cookies</p>
  </div>

        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-3">
        <div className="card-image scroll_filter_img">
    <img src={fil3} alt="filter1" />
    <p className='text_card'>Croissant</p>
  </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-4">
        <div className="card-image scroll_filter_img">
    <img src={fil4} alt="filter1" />
    <p className='text_card'>Tea</p>

  </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-5">
        <div className="card-image scroll_filter_img">
        <img src={fil5} alt="filter1" />
    <p className='text_card'>Slice cake</p>

      </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-6">

        <div className="card-image scroll_filter_img">
    <img src={fil6} alt="filter1" />
    <p className='text_card'>Feeter & Pies</p>

  </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-7">
        <div className="card-image scroll_filter_img">
    <img src={fil7} alt="filter1" />
    <p className='text_card'>Pita Bread</p>

  </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-8">
        <div className="card-image scroll_filter_img">
        <img src={fil8} alt="filter1" />
    <p className='text_card'>Round cake</p>

      </div>
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-9">
        </div>
			</div>
			<div class="col-2">
				<div class="card card-block card-10"></div>
			</div>
    </div>
    <div className="container"> 
      
        {/* this is the desktop sidebar */}
        <Row>
        <Col md={3}>
        <Nav className="flex-column text-dark min bg_side1">
        {data && data.masterCategories.map((masterCategory) => (
          <Nav.Link className="text-dark link opened" onClick={() => handleMasterCategoryClick(masterCategory)}>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <div className="p-2">
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
</Nav>
</Col>
<Col md={9}>
    <div className="row row-cols-1 row-cols-md-3 g-5 ddd">
            {filteredProducts.map((product, index) => (
              <div className="col" key={product.id}>
                <div className="card container3" onClick={() => handleCardClick(product)}>
                  <div className="card-image">
                    <img src={product.image} id="image" alt={product.title} />
                  </div>
                 
                  {addedItems.includes(product.id) ? (
    <div className="quantity-label_check">
      <FaCheck id="check_item" title='item added to the cart'/>
    </div>
  ) : (
    <button
    className="btn cart-button cart1 page2_icon" 
    onClick={(event) => handleAddClick(product, index, event)}
   
  >
   <FaPlus/>
  </button>
  )}
                  <div className="card-body custom-card-body">
                    <div className="price"><strong>₹{product.prize}</strong>  
                    
                    </div>
                    <h5 className="card-title">{product.name}</h5>      
                </div>
              </div>
            
            </div>
          ))}
        </div>
        </Col>
        </Row>
        {showPopup && selectedProduct && (
          <div className="modal show" style={{ display: 'block', overflow: 'hidden' }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content custom-modal">
      <div className="modal-header">
        <h5 className="modal-title">{selectedProduct.category}</h5>
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
            
            <h5 id="heading1">{selectedProduct.name}</h5>
            
            <p id="des" style={{ color: '#6b7280' }}>
  {showFullDescription[selectedIndex]
    ? selectedProduct.description
    : `${selectedProduct.description.split(' ').slice(0, 30).join(' ')}...`}
  {!showFullDescription[selectedIndex] && (
    <a
      id="read_more"
      href="#2"
      onClick={(event) => {
        event.preventDefault();
        let newShowFullDescription = [...showFullDescription];
        newShowFullDescription[selectedIndex] = true;
        setShowFullDescription(newShowFullDescription);
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