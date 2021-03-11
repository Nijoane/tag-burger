import styled from 'styled-components';


export const Button = styled.button`
    background: #F57F17;
    width: 200px;
    height: 60px;
    margin-left: 120px;
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
    padding-left: 120px;
    padding-top: 60px;
`;

export const Span = styled.span`
    color: #F57F17;
`;


export const Title = styled.h2`
    font-family: Roboto Slab;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
`;

export const Form = styled.form`
    align-items: center;
    background: #F3ECE5;
    border-radius: 20px 0px 0px 20px;
    display: center;
    height: 600px;
    padding-left: 20px;
    padding-top: 20px;
    justify-content: center;
    width: 500px;
`;

export const Page = styled.div`

    border-radius: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 600px;
    margin-left: 22%;
    margin-top: 2%;
    padding-bottom: 8%;
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5),
             9px -9px 14px rgba(0, 0, 0, 0.5);
`;

export const Images = styled.div`
    // margin-top: -50px;
`;

export const BurgerImage = styled.img`
    width: 400px;
    margin-left: 50px;
`;

export const Template = styled.div`
    align-items: center;
    background: #E65100;
    border-radius: 0 20px 20px 0;
    padding: 15px;
    display: flex;
    height: 600px;
    justify-content: center;
    width: 500px;
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
    outline:none;
    background: linear-gradient(225deg, #b4b4b7, #d6d6d9);
`;

export const EYE = styled.span`
    margin: 380px;
    position:absolute;
    margin-top: -65px;
    color: #E65100;
    cursor: pointer;
`;
