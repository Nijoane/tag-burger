import { ProductsCardapio, NameCardapio, SpamMenuItemCardapio, SpanFlavorCardapio, SpanNameCardapio } from '../components/stylesCardapio';
function MenuItemCardapio({ name, flavor, complement, price }) {
    return (
        <ProductsCardapio className='menus'>
            <SpamMenuItemCardapio>
                <SpanNameCardapio className="menu-text">
                    <NameCardapio>{`${name}`}</NameCardapio>
                    {`R$${price},00`}
                </SpanNameCardapio>
                <SpanFlavorCardapio>
                    <p>{`${flavor}`}  {`${complement}`}</p>
                </SpanFlavorCardapio>
            </SpamMenuItemCardapio>
        </ProductsCardapio>
    )
}
export default MenuItemCardapio;