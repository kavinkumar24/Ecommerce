import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "./Data";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Products from "./products/ProductItem";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  
`;


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transition: ease 1000ms;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "15px"};
  right: ${(props) => props.direction === "right" && "15px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
`;
const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 59px);
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  padding-top: 50px;
  height: 100%;
  flex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  margin-left: 40px;
`;

const Title = styled.h1`
  margin: 0px 20px;
  font-size: 70px;
  @media (max-width: 768px) {
      text-align: center;
      font-size:'30px'
  }
`;

const Desc = styled.p`
  margin: 30px 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  margin: 0px 20px;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid black;
`;

const Image = styled.img``;

const Slider = () => {
  const [cartItems, setCartItems] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setSlideIndex((currentSlideIndex) =>
          currentSlideIndex < sliderItems.length - 1 ? currentSlideIndex + 1 : 0
        );
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
      } else {
        setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
      }
    };
    return (
      <>
            <Container>
                <Wrapper slideIndex={slideIndex}>
                    {sliderItems.map((items) => (
                        <Slide bg={items.bg} key={items.id}>
                            <InfoContainer>
                                <Title>{items.title}</Title>
                                <Desc>{items.desc}</Desc>
                                <Link to={(items.link)}><Button>
                                    BUY NOW
                                </Button></Link>
                            </InfoContainer>
                            <ImageContainer>
                                <Image src={items.img} style={{ height: items.size }} />
                            </ImageContainer>
                        </Slide>
                    ))}
                </Wrapper>
                <Arrow direction="left" onClick={() => handleClick("left")}>
                    <KeyboardArrowLeftOutlined style={{ color: "white" }} />
                </Arrow>
                <Arrow direction="right" onClick={() => handleClick("right")}>
                    <KeyboardArrowRightOutlined style={{ color: "white" }} />
                </Arrow>
              

            </Container>
            <br></br>
            <br></br>
            <br></br>
            </>
            
    );
};
export default Slider;
