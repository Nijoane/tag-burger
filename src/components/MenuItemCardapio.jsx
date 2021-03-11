import { ProductsCardapio, NameCardapio, SpamMenuItemCardapio, SpanFlavorCardapio, SpanNameCardapio, ImagemCardapio} from '../components/stylesCardapio';
function MenuItemCardapio({ name, flavor, complement, price, image }) {
    return (
        <ProductsCardapio className='menus'>
            <ImagemCardapio src={`${image}`} alt="" width='265' height='185'/>
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