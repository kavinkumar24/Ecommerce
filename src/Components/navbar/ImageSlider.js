import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageSlider.css'
import image1 from '../images/offer-5.webp'
import image2 from '../images/offer-3.webp'
import image3 from '../images/offer-4.webp'
import image4 from '../images/offer-2.webp'
import image5 from '../images/offer-1.webp'



const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='offer_scroll'>
    <div class="scrolling-wrapper row flex-row flex-nowrap mt-0 pb-2 pt-2 scroll_image">
			
    <div class="col-2 c1_container">
      
      <div class="card card-block card-1 c1" >

      <div className="card-image scroll_slider">
  <img src={image1} alt="filter1" />
</div>


      </div>
    </div>
    <div class="col-2 c1_container">
      <div class="card card-block card-2 c1" >
    
    
      <div className="card-image scroll_slider" >
  <img src={image2} alt="filter1" />
</div>

      </div>
    </div>
    <div class="col-2 c1_container">
      <div class="card card-block card-3 c1">
      <div className="card-image scroll_slider">
  <img src={image3} alt="filter1" />
</div>
      </div>
    </div>
    <div class="col-2 c1_container">
      <div class="card card-block card-4 c1">
      <div className="card-image scroll_slider">
  <img src={image4} alt="filter1" />

</div>
      </div>
    </div>
    <div class="col-2 c1_container">
      <div class="card card-block card-5 c1">
      <div className="card-image scroll_slider">
      <img src={image5}  alt="filter1" />

    </div>
      </div>
    </div>
  
  </div>
  </div>
  );
};

export default ImageSlider;
