/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Menu from "../../containers/Menu";
import Logo from '../../images/logo.png';
import Logout from '../../images/logout1.png';
import { USER } from "../../services/api";
import { FaTrashAlt } from 'react-icons/fa';
import { Toggle } from '../../components/toggle';
import { useDarkMode } from '../../components/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from '../../components/globalStyled';
import { ThemeProvider } from 'styled-components';
import { ButtonSend, InputTable, InputClient, LabelClient, SpanFlavor, Complement, SpanNameOrders, ProductsOrders, MenuOrders, DivMenus, LogoHall, ButtonPedidos, Textarea, SpamQtd, DivTotal, Soma, Total, Itens, ButtonLogout } from '../../components/stylesMenu';
import Swal from "sweetalert2";

const Hall = () => {
    const history = useHistory();
    const [menuData, setMenuData] = useState({});
    const [cartData, setCartData] = useState({});
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState('')
    const [client, setClient] = useState('');
    const [observation, setObservation] = useState('')

    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    
    const getToken = async (token) => {
        try{
            const { url, options } = USER(token);
            const response = await fetch(url, options);
            const json = await response.json();
            setMenuData(json);
        } catch(error){
            error.message('error')
        }
    }

    useEffect(() => {
        getToken(token)
    }, [])

    useEffect(() => {
        let total = (0);
        Object.keys(cartData).map((qtd) => {
            let qty = (cartData[qtd]);
            let price = (menuData[qtd].price);
            return (total += qty * price);
        })
        setCartTotal(total);
    }, [cartData]);

    const addToCart = qtd => {
        let newCart = { ...cartData };
        if (qtd in cartData) {
            newCart[qtd] += 1;
        }
        else {
            newCart[qtd] = 1;
        }
        setCartData(newCart);
    };

    const reduceFromCart = qtd => {
        let newCart = { ...cartData };
        if (qtd in cartData) {
            newCart[qtd] -= 1;
            if (newCart[qtd] < 1) delete newCart[qtd];
        }
        setCartData(newCart);
    };

    function alertSwal() {
        Swal.fire({
            title: 'Pedido enviado!',
            text: '',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            width: 250,
        });
    }

    function createOrder(client, table,) {
        const myHeaders = new Headers();

        myHeaders.append("Authorization", `${token}`);
        myHeaders.append("Content-Type", "application/json");

        const products = (Object.keys(cartData).map((qtd) => (
            {
                "id": `${menuData[qtd].id}`,
                "qtd": `${cartData[qtd]}`
            }
        )));

        const raw = JSON.stringify({
            client,
            table,
            observation,
            products: products
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://lab-api-bq.herokuapp.com/orders", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrder(result.json)
            })
    }

    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        history.push("/");
    }

    const token = localStorage.getItem('token');
    return (
        <div>
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={toggleTheme} />
                <Link to='/orders'>
                    <ButtonPedidos className='btn'>Pedidos</ButtonPedidos>
                </Link>
                <LogoHall src={Logo} alt='' width='400' />
                <ButtonLogout className="btn-logout" onClick={(event) => logout(event)}><img src={Logout} alt="" width='30'  srcset=""/></ButtonLogout>
                <DivMenus>
                    <div>
                        <Menu
                            menu={menuData}
                            addToCart={addToCart}
                        />
                    </div>
                    <MenuOrders className='menus'>
                        <div id="cart">
                            <LabelClient htmlFor="client">Cliente</LabelClient>
                            <InputClient className='inputShadow'
                                type="text"
                                id="client"
                                value={client}
                                onChange={(event) => {
                                    setClient(event.target.value);
                                    localStorage.setItem('client', client);
                                }}
                            />
                            <LabelClient htmlFor="table">Mesa</LabelClient>
                            <InputTable className='inputShadow'
                                type="text"
                                id="table"
                                value={table}
                                onChange={(event) => {
                                    setTable(event.target.value);
                                    localStorage.setItem('table', table);
                                }}
                            />
                            <SpamQtd>
                                <Itens>Item</Itens>
                                <Itens>Qtd.</Itens>
                                <Itens>Valor</Itens>
                            </SpamQtd>
                            <div id="cart-area">
                                {Object.keys(cartData).map((qtd, index) => (
                                    <ProductsOrders className='inputShadow' key={index}>
                                        <SpanNameOrders key={index}>
                                            <p>
                                                {menuData[qtd].name}
                                            </p>
                                            <p > {cartData[qtd]}</p>
                                            <span className="item-total">
                                                R${menuData[qtd].price},00
                                    <button
                                                    className="remove-button"
                                                    onClick={() => reduceFromCart(qtd)}
                                                    style={{
                                                        'border': 'none',
                                                        'outline': 'none',
                                                        'backgroundColor': 'transparent',
                                                        'padding': '5px',
                                                        'color': '#E65100',
                                                        'cursor': 'pointer'
                                                    }}><FaTrashAlt /></button>
                                            </span>
                                        </SpanNameOrders>
                                        <SpanFlavor>
                                            <p>
                                                {menuData[qtd].flavor}
                                            </p>
                                            <Complement>
                                                {menuData[qtd].complement}
                                            </Complement>
                                        </SpanFlavor>
                                    </ProductsOrders>
                                ))
                                }
                                <div id="cart-total">
                                    <Textarea
                                        className='inputShadow'
                                        name="Observations"
                                        cols="47" rows="2"
                                        placeholder="Observações"
                                        value={observation}
                                        onChange={(event) => {
                                            setObservation(event.target.value);
                                            localStorage.setItem('observation', observation);
                                        }}
                                    >
                                    </Textarea>
                                    <DivTotal>
                                        <Total>Total </Total>
                                        <Soma className='inputShadow'>
                                            R$ <span id="total-amount">{cartTotal},00</span>
                                        </Soma>
                                    </DivTotal>
                                </div>
                            </div>
                        </div>
                    </MenuOrders>
                </DivMenus>
                <ButtonSend className='btn' onClick={() => createOrder(client, table, order, alertSwal())}>Enviar Pedido</ButtonSend>
            </ThemeProvider>
        </div>
    );
}
export default Hall;