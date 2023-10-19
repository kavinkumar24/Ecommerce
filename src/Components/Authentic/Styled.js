
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components'; 

export const Button1  = styled.button`
  width: 100%;
  border:none;
  padding: 12px 20px;
  border-radius:8px;
  margin: 8px 0;
  svg {
    margin-right: 10px;
  }
  box-sizing: border-box;
`;
export const Form1 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input1 = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
box-sizing: border-box;
border: 1px solid #919191;
border-radius:4px;


&:focus {
  outline-color: #5b7570;
}
`;


export const Hr = styled.hr`
  width: 100%;
`;


export const GlobalStyle = createGlobalStyle`
  .ReactModal__Content {
    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #089b7d;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    ::-webkit-scrollbar-button {
      height: 5px; /* height of the top and bottom buttons */
      display: block;
      background-color: transparent;
    }
  }
`;
export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '440px',
    zIndex                 :1000,
    height                : '90%',
    display               : 'flex',
    flexDirection         : 'column',
    justifyContent        : 'center',
    alignItems            : 'center',
    overflowY             : 'scroll', 
    paddingRight          : '20px',
    scrollbarWidth        : '3px', 
    scrollbarColor        : '#888 #f1f1f1' 
  },
  overlay: {
    zIndex: 1000,
  }

};
