import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.primary ? '#f37300' : '#6b686b'};
  color: ${props => props.primary ? 'black' : 'white'};
  border-radius: ${props => props.primary ? '200px' : '50%'};
  border-width: 0px;
  font-size: 14px;
  margin: 8px;
  padding: 4px 8px;
  position: relative;
  box-sizing: border-box;
  min-width: ${props => props.primary ? '64' : '45px'};
  height: 36px;
  border: none;
  outline: none;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  transition: all 0.3s ease-in-out;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    border-radius: 200px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  };

  &:hover {
    filter: brightness(110%);
  }

  &:hover:after {
    opacity: 1;
  }

  &:active {
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    filter: brightness(120%);
  }
`
export default Button
