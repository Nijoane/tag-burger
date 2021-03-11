import React from 'react';
import on from '../images/on.png';
import off from '../images/off.png';
import styled from 'styled-components';

let Sun, Moon;

Sun = Moon = styled.div`
  position: absolute;
  top: 4rem;
  right: 4rem;
  transition: all .5s linear;
  cursor:pointer; 
`;

export const Toggle = ({ theme, toggleTheme }) => {
  return (
    <div onClick={toggleTheme}>
      { theme === 'light' ? <Sun><img src={on} alt="" width='50'  srcset=""/></Sun>
      : 
      <Moon><img src={off} alt="" width='50' srcset=""/></Moon>}
    </div>
  )
}