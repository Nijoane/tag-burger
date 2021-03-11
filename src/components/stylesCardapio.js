import styled from 'styled-components';

export const BodyCardapio = styled.div`
    height: 640px;     
    width: 360px;
    background: #F57F17;
`;

export const LogoHall = styled.img`
    margin-left: 15px;
    margin-top: 10px;
`;

export const MenuPedidosCardapio = styled.div`
    border-radius: 10px;
    background: #F57F17;
    height: 320px;     
    width: 280px;
    overflow: auto;
    padding: 10px;
`;

export const ButtonMenuCardapio = styled.button`
    background: #F57F17;
    border: none;
    border-radius: 10px;
    color: black;
    width: 110px;
    height: 60px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    margin-bottom: 20px;
    border: none;
    outline: none;
    margin-left: 20px;
    margin-top: 20px;
    cursor: pointer;
    font-family: Roboto Slab;
    font-size: 15px;
    font-weight: 400;

    &:active {
        background:#dbd4ce;
        position: relative;
        top: 5px;
        box-shadow: none;
    }
`;

export const DivButtonCardapio = styled.div`
    width:450px;
`;

export const ProductsCardapio = styled.div`
    display: flex;
    justify-content: space-between;
    background: #F3ECE5;
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    height: 280px;     
    width: 255px;
    margin-top: 3%;
    border-radius: 10px;
    background: linear-gradient(145deg, #fffdf5, #dbd4ce);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
`;

export const LogoHallCardapio = styled.img`
    margin-left: 350px;
    margin-top: 10px;
    @media screen and (min-width:321px) and (max-width:768px) {
        margin-left: 250px;
    }
    @media screen and (max-width: 1024px) {
        margin-left: 270px;
`;

export const NameCardapio = styled.p`
    padding-right: 50px;
    font-family: Roboto Slab;
    font-size: 15px;
`;

export const ComplementCardapio = styled.p`
    padding-right: 20px;
    font-family: Roboto Slab;
    font-size: 15px;
`;

export const SpamMenuItemCardapio = styled.div`
    padding: 15px;
    height: 90px;     
    width: 255px;
    border-radius: 10px;
    background: #F57F17;
box-shadow: inset 50px 50px 100px #c46612,
            inset -50px -50px 100px #ff981c;

`;

export const SpanFlavorCardapio = styled.span`
    display:flex;
    justify-content: space-between;
    width: 160px;
`;

export const SpanNameCardapio = styled.span`
    display:flex;
    justify-content: space-between;
    width: 250px;
    @media screen and (min-width:321px) and (max-width:768px) {
    width: 100px;
    }
    @media screen and (max-width: 1024px) {
        width: 200px;
    }
`;