import React from 'react';
import './Shops.css'; 
import data from '../DummyData/Shopdata';
import NavigationBar from './Navbar';
import { useState } from 'react';
import location_image from '../images/map-pin.png'
import Product1_grocery from '../DummyData/Product';

import NewPage from '../products/ShopPage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ProductData from '../DummyData/Page3_fil1'
import Product1Data from '../DummyData/Page_2_fil2'
import Product2Data from '../DummyData/Page3_fil2'
import Product_clothing from '../DummyData/Page4_fil2'

const Card = ({ item,onClick}) => (
   <>
    
    <div className="card_shops" onClick={() => onClick(item)}>

    <img src={item.image} alt={item.title} id="card-image1"  />
    <div className="card-content1">
      <h2>{item.title}</h2> <h6 id="address">{item.address}</h6>
    </div>
  </div>
  </>
  
);

const CardList = ({ cartItems, setCartItems}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [showNewPage, setShowNewPage] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const uniqueItems = [...new Set(cartItems)];


    const handleCardClick = (item) => {
      setSelectedTitle(item.title);
      setShowNewPage(true);
      localStorage.setItem('selectedItem', JSON.stringify(item));
      localStorage.setItem('showNewPage', 'true');
      if (item.title === "Furniture shop") {
        setProducts(Product2Data.products);
      } 
      if(item.title === "Bakery Shop"){
        setProducts(Product1Data.products);
      }

      if(item.title === "Clothing shop"){
        setProducts(Product_clothing.products);
      }

      if(item.title === "Grocery Shop"){
        setProducts(Product1_grocery.products);
      }

      if(item.title === "Bakery Shop"){
        setProducts(Product1Data.products);
      }
      console.log(products)
    };
    
    useEffect(() => {
      const storedItem = JSON.parse(localStorage.getItem('selectedItem'));
      const storedShowNewPage = localStorage.getItem('showNewPage') === 'true';
      if (storedItem) {
        setSelectedTitle(storedItem.title);
      }
      setShowNewPage(storedShowNewPage);
    
      window.onpopstate = () => {
        localStorage.removeItem('selectedItem');
        localStorage.removeItem('showNewPage');
        setShowNewPage(false);
        navigate('/shops')
      };
    }, []);
    
    
    return showNewPage ?  <NewPage item={selectedItem} products={products} setProducts={setProducts} cartItems={cartItems} setCartItems={setCartItems}  /> : (
      <>
       <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} showImageContainer={false} uniqueItems={uniqueItems}/>
        <h1 id= "shop_heading">All Shops</h1>
        <div className="card-list">
          {data
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(item => (
              <Card key={item.id} item={item} onClick={handleCardClick} />
            ))}
        </div>
      </>
    );
    
  };

export default CardList;
