import { useState } from "react";
import MenuItem from "../components/MenuItem";
import { ButtonMenu, DivButton, MenuPedidos, BodyMenu } from '../components/stylesMenu'
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
        <BodyMenu>
            <div id="menu-area">
                <DivButton>
                    <ButtonMenu className='menus but' onClick={() => setShow(true)}>Café da Manhã</ButtonMenu>
                    <ButtonMenu className='menus but' onClick={() => setShow(false)}>Hamburgueria</ButtonMenu>
                </DivButton>
                <MenuPedidos className='menus'>
                    {
                        show ?
                            <div>
                                {Object.keys(menu).slice(0, 4).map((key, index) => (
                                    <MenuItem
                                        name={menu[key].name}
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
                                    <MenuItem
                                        name={menu[key].name}
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
                </MenuPedidos>
            </div>
        </BodyMenu>
    );
}
export default Menu;