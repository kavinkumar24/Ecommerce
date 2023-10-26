import React, { useState,useEffect } from 'react';
import './Showpage.css'
import NavigationBar from '../navbar/Navbar';
import { useQuery, gql } from '@apollo/client';
import { Offcanvas } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap'; 
import { FaPlus, FaMinus, FaBars } from 'react-icons/fa'; 
import { Modal, ListGroup } from 'react-bootstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ToastContainer, toast } from 'react-toastify';
const NewPage = ({products, setProducts,  cartItems, setCartItems}) => {


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

const GET_PRODUCTS = gql`
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



  const uniqueItems = [...new Set(cartItems)];
  const [show, setShow] = useState(false);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMasterCategory, setSelectedMasterCategory] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleIncrease = (index) => {
    console.log('Increase clicked:', index);
    setQuantities(quantities.map((q, i) => i === index ? q + 1 : q));
  }
  
  const handleDecrease = (index) => {
    console.log('Decrease clicked:', index);
    setQuantities(quantities.map((q, i) => i === index && q > 1 ? q - 1 : q));
  }
    
  
  let selectedIndex;
  if (selectedProduct) {
    selectedIndex = filteredProducts.findIndex(
      (product) => product.id === selectedProduct.id
    );
  }
  

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  }
  const [showQuantityForm, setShowQuantityForm] = useState(new Array(filteredProducts.length).fill(false));
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [open, setOpen] = useState({});

  const handleMasterCategoryClick =(masterCategory) => {
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
  const handleCategoriesClose = () => setShowCategories(false);
  const handleCategoriesShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const item_list = JSON.parse(localStorage.getItem('selectedItem'));

  let filterValue;
  if (item_list.title === "Grocery Shop") {
    filterValue = 2;
  } else if (item_list.title === "Bakery Shop") {
    filterValue = 12;
  }

  const { loading, error, data } = useQuery(GET_MAIN_CATEGORIES, {
    variables: {
      "filter": {
        "shopId": filterValue
      }
    },
  });


  const { loading: secondaryLoading, error: secondaryError, data: secondaryData } = useQuery(GET_SECONDARY_CATEGORIES, {
    variables: {
      "filter": {
        "shopId": filterValue,
        "masterCategoryId": selectedMasterCategory ? selectedMasterCategory.id : null,
      }
    },
  });
  const { loading: productLoading, error: ProductError, data: ProductData } = useQuery(GET_PRODUCTS, {
    variables: {
      "filter": {
        "shopId": filterValue,
        "masterCategoryId": selectedMasterCategory ? selectedMasterCategory.id : null,
        
      }
    },
  });

  useEffect(() => {
    if (ProductData && ProductData.products) {
      setProducts(ProductData.products);
      setFilteredProducts(ProductData.products);
      setShowQuantityForm(new Array(ProductData.products.length).fill(false));
      setQuantities(new Array(ProductData.products.length).fill(1));
    }
  }, [ProductData]);

  function handleSecondaryCategoryClick(secondaryCategory, masterCategory) {
    toast.info(secondaryCategory.category)
     setOpen({ ...open, [masterCategory.id]: false });
    handleClose();

   }
  useEffect(() => {
    if (ProductData && ProductData.products) {
      setProducts(ProductData.products);
    }
  }, [ProductData]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const [quantities, setQuantities] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(
    new Array(filteredProducts.length).fill(false)
  );

  const handleAddClick = (product, index,event) => {
    event.stopPropagation()
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setShowPopup(false);
    addToCart(product, index,event);
    setShowQuantityForm((prevShowQuantityForm) =>
      prevShowQuantityForm.map((value, i) => (i === index ? true : value))
    );
  };

  const addToCart = (product, index,event) => {
    event.preventDefault();
    setShowPopup(false);

    const newCartItems = [...cartItems];
    for (let i = 0; i < quantities[index]; i++) {
      newCartItems.push(product);
    }
    setCartItems(newCartItems);
  };

  return (
    <>
     <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} showImageContainer={false} uniqueItems={uniqueItems}/>


     <button onClick={handleCategoriesShow}  className='show_categories'><FaBars /></button>
     <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
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
</ListGroup>
      </Modal.Body>
    </Modal>
    <div className="shop-page">
     
      <div className="newPageContainer">
        <div className="firstColumn">
          <img src={item_list.image} alt={item_list.title} />
          <h1>{item_list.title}</h1>
          <p>{item_list.address}</p>
          
        </div>
        <div className="secondColumn">
        <div className="row row-cols-1 row-cols-md-4 g-2">
              {filteredProducts.map((product, index) => (
                <div className="col" key={product.id}>
                  <div className="card shop_container" onClick={() => handleCardClick(product)}>
                    <div className="card-image">
                      <img src={product.image} id="shopimage" alt={product.title} />
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
                      <div className="price"><strong>₹{product.prize}</strong>  </div>
                      <h5 className="card-title">{product.name}</h5>      
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
                <h5 className="modal-title">{selectedProduct.category}</h5>
                <button type="button" className="btn-close"onClick={() => setShowPopup(false)}></button>
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
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p style={{position:'relative',top:'50px',left:'-50px'}}>Loading...</p>
    </div>
  )}
  
    </>
  );
};

export default NewPage
