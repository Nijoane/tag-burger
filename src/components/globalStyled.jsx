import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all .5s linear;
  }
  p {
    line-height: 1.4rem;
  }
  .btn-primary {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all .5s linear;
  }
  .menus{
    background:${({ theme }) => theme.menus};
    box-shadow:${({ theme }) => theme.shadowInput};
    color: ${({ theme }) => theme.text};
  }
  .btn{
    box-shadow:${({ theme }) => theme.shadow};
  }
  .but{
    &:active {
        background:#33333d;
    }
  }
  .inputShadow{
    background:${({ theme }) => theme.body};
    box-shadow: ${({ theme }) => theme.shadowInput};
  }
  `;

export const lightTheme = {
  text: '#121212',
  primary: '#6200ee',
  shadow: '20px 20px 60px #999590, -20px -20px 60px #ffffff'
};

export const darkTheme = {
  body: '#28282f',
  text: '#fff',
  primary: '#bb86fc',
  menus: '#28282f',
  shadow: '20px 20px 60px #484856, -20px -20px 60px #353540',
  shadowInput: 'inset 17px 17px 24px #222228, inset -17px -17px 24px #2e2e36',
};