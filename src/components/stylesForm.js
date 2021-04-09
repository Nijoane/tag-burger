import styled from 'styled-components';

export const Button = styled.button`
    background: #F57F17;
    width: 200px;
    height: 60px;
    margin-left: 35%;
    margin-top: 15px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    font-size: 24px;
    outline:none;
    background: linear-gradient(25deg, #F57F17, #F57F17);
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5),
            9px -9px 14px #ffffff;

    &:active {
        background:#e0700d;
        position: relative;
        height: 58px;
        box-shadow: none;
    }
`;

export const Register = styled.p`
    margin-left: 30%;
    margin-top: 10%;
`;

export const Span = styled.span`
    color: #F57F17;
`;

export const Title = styled.h2`
    font-family: Roboto Slab;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    margin-top: 30px;
`;

export const Form = styled.form`
    align-items: center;
    background: #F3ECE5;
    display: center;
    height: 100vh;
    justify-content: center;
    width: 100vw;

`;

export const Teste = styled.div`

`;
export const Page = styled.div`
    background: red;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

export const Images = styled.div`
`;

export const BurgerImage = styled.img`
    width: 500px;
    display: flex;
    justify-content: center;
`;

export const Template = styled.div`
    align-items: center;
    background: #E65100;
    padding: 15px;
    padding-button: 155px;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
`;

export const Input = styled.input`
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    padding: 30px;
    margin: 30px;
    height: 60px;
    width: 400px;
    border: none;
    border-radius: 20px;
    display: block;
    color: #f57f17;
    font-size: 20px;
    outline: none;
    background: linear-gradient(225deg, #b4b4b7, #d6d6d9);
    margin-left: 20%;
`;

export const EYE = styled.span`
    margin: 480px;
    position:absolute;
    margin-top: -65px;
    color: #E65100;
    cursor: pointer;
`;
