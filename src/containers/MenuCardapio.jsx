import { useState } from "react";
import coffee from "../images/coffee-cup.png";
import burguer from "../images/hamburguer.png";
import MenuItemCardapio from "../components/MenuItemCardapio";
import { ButtonMenuCardapio, DivButtonCardapio, MenuPedidosCardapio } from '../components/stylesCardapio'
function Menu({ menu, addToCart }) {
    const [show, setShow] = useState(true)
    function complements(item) {
        if (item.complement !== null) {
            return (item.complement)
        }
        else {
            return ('')
        }
    }
    function flavors(item) {
        if (item.flavor !== null) {
            return (item.flavor)
        }
        else {
            return ('')
        }
    }
    return (
        <div>
            <div id="menu-area">
                <DivButtonCardapio>
                    <ButtonMenuCardapio className='menus but' onClick={() => setShow(true)}><img src={coffee} alt="" width='40' /></ButtonMenuCardapio>
                    <ButtonMenuCardapio className='menus but' onClick={() => setShow(false)}><img src={burguer} alt="" width='40'  /></ButtonMenuCardapio>
                </DivButtonCardapio>
                <MenuPedidosCardapio className='menus'>
                    {
                        show ?
                            <div>
                                {Object.keys(menu).slice(0, 4).map((key, index) => (
                                    <MenuItemCardapio
                                        name={menu[key].name}
                                        image={menu[key].image}
                                        flavor={[]}
                                        complement={[]}
                                        price={menu[key].price}
                                        addToCart={addToCart}
                                        key={index}
                                        qtd={key}
                                    />
                                ))
                                }
                            </div>
                            :
                            <div>
                                {Object.keys(menu).slice(4, 28).map((key, index) => (
                                    <MenuItemCardapio
                                        name={menu[key].name}
                                        image={menu[key].image}
                                        flavor={flavors(menu[key])}
                                        complement={complements(menu[key])}
                                        price={menu[key].price}
                                        addToCart={addToCart}
                                        key={index}
                                        qtd={key}
                                    />
                                ))
                                }
                            </div>
                    }
                </MenuPedidosCardapio>
            </div>
        </div>
    );
}
export default Menu;