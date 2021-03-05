import styled from 'styled-components';

export const MenuPedidos = styled.div`
    border-radius: 30px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow:  11px 11px 57px #999590,
            -11px -11px 57px #ffffff;
    height: 390px;     
    width: 450px;
    overflow: auto;
    padding: 20px;

    @media screen and (max-width: 1024px) {
        height: 510px;     
        width: 420px;
        margin-left: -50px;
    }

    @media screen and (max-width: 768px) {
        height: 700px;     
        width:350px;
        padding: 20px;
        margin-left: -40px;
    }
`;

export const MenuOrders = styled.div`
    border-radius: 30px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow:  11px 11px 57px #999590,
            -11px -11px 57px #ffffff;
    height: 390px;     
    width: 480px;
    overflow: auto;
    padding: 20px;
    margin-left: 100px;
    margin-right: -150px;
    margin-top: 20px;

    @media screen and (max-width: 1024px) {
    height: 510px;   
    width: 420px;
    margin-right: 120px;
    margin-left: -10px;
    }
    
    @media screen and (max-width: 768px) {
    height: 700px;     
    width:300px;
    margin-right: 250px;
    margin-left: -100px;
    }
`;

export const BtnAdition = styled.input`
    background: #F57F17;
    border: none;
    border-radius: 0 4px 4px 0;
    color: black;
    font-size: 24px;
    width: 60px;
    height: 70px;
    border: none;
    outline: none;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        height: 100px;  
    }

    @media screen and (max-width: 1024px) {
        height: 100px;  
        width: 80px;   
    }
`;

export const ButtonMenu = styled.button`
    background: #F57F17;
    border: none;
    border-radius: 10px;
    color: black;
    width: 200px;
    height: 60px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow:  10px 10px 20px #828284,
    -10px -10px 20px #ffffff;
    margin-bottom: 20px;
    border: none;
    outline: none;
    margin-left: 15px;
    margin-top: 20px;
    cursor: pointer;
    font-family: Roboto Slab;
    font-size: 15px;
    font-weight: 400;

    @media screen and (max-width: 1024px) {
    width: 150px;
    height: 70px;
    }
        
    @media screen and (max-width: 768px) {
    width: 115px;
    height: 80px;
    }
`;

export const DivButton = styled.div`
    display: flex;
    width: 450px;
    justify-content: flex-start;
    margin-left: 300px;
    margin-top: -300px:
    margin-right: 0;
`;

export const Products = styled.div`
    display: flex;
    justify-content: space-between;
    background: #F3ECE5;
    box-shadow: 0 2px 6px rgba(88,116,159,.15);
    border-radius: 4px;
    width: 400px;
    height: 70px;
    margin-top: 3%;
    border-radius: 10px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow:  11px 11px 57px #999590,
            -11px -11px 57px #ffffff;
    
    @media screen and (max-width: 1024px) {
    width: 380px;
    height: 100px;
    }
    
    @media screen and (max-width: 768px) {
    width: 250px;
    height: 100px;
    }
`;

export const DivMenus = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 300px;
    margin-top: -300px:
`;

export const LogoHall = styled.img`
    margin-left: 350px;
    margin-top: 10px;

    @media screen and (max-width: 1024px) {
        margin-left: 270px;
    }
    @media screen and (max-width: 768px) {
        margin-left: 250px;
    }
`;

export const Textarea = styled.textarea`
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    border: none;
    outline: none;
    margin-top: 50px;
    padding: 20px;
    border-radius: 10px;
    color:  #E65100;

    @media screen and (max-width: 1024px) {
        width: 370px;
    }

    @media screen and (max-width: 768px) {
        width:250px;
    }
`;

export const Name = styled.p`
    padding-right: 50px;
    font-family: Roboto Slab;
    font-size: 15px;
`;

export const Complement = styled.p`
    padding-right: 20px;
    color: #E65100;
    font-family: Roboto Slab;
    font-size: 15px;
`;

export const SpamMenuItem = styled.div`
    padding: 15px;
`;

export const SpanFlavor = styled.span`
    display:flex;
    justify-content: space-between;
    width: 160px;
`;

export const SpanName = styled.span`
    display:flex;
    justify-content: space-between;
    width: 270px;

    @media screen and (max-width: 768px) {
    width: 100px;
    }

    @media screen and (max-width: 1024px) {
        width: 200px;
    }
`;

export const SpamQtd = styled.span`
    display:flex;
    justify-content: space-between;
    width: 420px;
    padding: 20px;
    color:  #E65100;
    @media screen and (max-width: 1024px) {   
        width: 380px;
    }
    @media screen and (max-width: 768px) {
        width: 260px;
    }
`;

export const DivOrders= styled.span`
    display:flex;
    justify-content: space-between;
    width: 420px;
`;

export const ProductsOrders = styled.div`
    background: #F3ECE5;
    box-shadow: 0 2px 6px rgba(88,116,159,.15);
    border-radius: 4px;
    width: 435px;
    height: 70px;
    margin-top: 3%;
    border-radius: 10px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow:  11px 11px 57px #999590,
            -11px -11px 57px #ffffff;
    padding: 15px;
    @media screen and (max-width: 1024px) {
        width: 380px;
        height: 90px;
    }
    @media screen and (max-width: 768px) {
        width: 255px;
        height: 90px;
    }
`;

export const SpanNameOrders = styled.span`
    display:flex;
    justify-content: space-between;
    width: 400px;

    @media screen and (max-width: 1024px) {
        width: 350px;
    }
    @media screen and (max-width: 768px) {
        width: 230px;
    }
`;

export const DivTotal = styled.div`
    display:flex;
    justify-content: flex-end;
    width: 430px;
    padding:15px;

    @media screen and (max-width: 1024px) {
    margin-left:-65px
    }
    @media screen and (max-width: 768px) {
        margin-left:-160px
        }
`;

export const Total = styled.span`
    padding-right: 20px;
    padding: 10px;
    font-family: Roboto Slab;
`;

export const Soma = styled.span`
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    height:35px;
    width: 100px;
    padding: 10px;
    text-align:center;
    border-radius: 10px;
    color:  #E65100;
    font-family: Roboto Slab;
    font-weight: bold;
`;

export const Itens = styled.p`
    font-family: Roboto Slab;
`;

export const ButtonPedidos = styled.button`
    border: none;
    outline: none;
    background: #F57F17;
    text-align: center;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    margin-left:1100px;
    border-radius: 0 0 10px 10px;
    height: 50px;
    width: 200px;
    box-shadow : 9px 9px 19px #909092, -9px -9px 19px #fff;

    @media screen and (max-width: 1024px) {
        margin-left: 950px;
        height: 80px;
    }

    @media screen and (max-width: 768px) {
        margin-left:750px;
    }
`;