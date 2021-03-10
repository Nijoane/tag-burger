import { BtnAdition, Products, Name, Complement, SpamMenuItem, SpanFlavor, SpanName } from '../components/stylesMenu';
function MenuItem({ name, flavor, complement, price, addToCart, qtd }) {
    return (
        <Products className='menus'>
            <SpamMenuItem>
                <SpanName className="menu-text">
                    <Name>{`${name}`}</Name>
                    <p>{`R$ ${price},00`}</p>
                </SpanName>
                <SpanFlavor>
                    <p>{` ${flavor}`} </p>
                    <Complement>{`${complement}`}</Complement>
                </SpanFlavor>
            </SpamMenuItem>
            <span className="menu-action">
                <BtnAdition className='btn' onClick={() => addToCart(qtd)}>+</BtnAdition>
            </span>
        </Products>
    )
}
export default MenuItem;