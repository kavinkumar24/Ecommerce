import './App.css';
import NavigationBar from './Components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import ProductItem1 from './Components/products/ProductItem1';
import ProductItem2 from './Components/products/ProductItem2';
import Cart from './Components/Cart/Cart';
import { useState } from 'react';
import Products from './Components/products/ProductItem';
import SignIn from './Components/Authentic/SignIn';
import ProductItem3 from './Components/products/ProductItem3';
import AddressForm from './Components/Cart/Addressform';
import OffersPage from './Components/navbar/Offer';
import CardList from './Components/navbar/Shops';
import ContactPage from './Components/navbar/Contact';
import NewPage from './Components/products/ShopPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Products cartItems={cartItems} setCartItems={setCartItems} searchTerm={searchTerm}/>}/>
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />



        <Route path="/ProductItem1" element={<ProductItem1 cartItems={cartItems} setCartItems={setCartItems}  />} />
        
        <Route path="/ProductItem2" element={<ProductItem2 cartItems={cartItems} setCartItems={setCartItems} />} />
        
        
        <Route path="/SignIn" element={<SignIn/>}></Route>
       
        <Route path="/offer" element={<OffersPage cartItems={cartItems} setCartItems={setCartItems}  />} ></Route>

        <Route path="/contact" element={<ContactPage cartItems={cartItems} setCartItems={setCartItems}  />} ></Route>

        <Route path="/shops" element={<CardList cartItems={cartItems} setCartItems={setCartItems}  />} ></Route>
 
      <Route path="/ProductItem3" element={<ProductItem3 cartItems={cartItems} setCartItems={setCartItems} />}></Route>

      <Route path="/orderform" element={<AddressForm cartItems={cartItems} />}></Route>
      
      <Route path="/shopss" element={<NewPage selectedTitle={selectedTitle} />}></Route>
      
      </Routes>
      
    </div>
  );
}

export default App;
