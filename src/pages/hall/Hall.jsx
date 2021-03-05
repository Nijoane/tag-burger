
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Menu from "../../containers/Menu";
import Logo from '../../images/logoLaranja.png';
import { USER } from "../../components/api";
import { FaTrashAlt } from 'react-icons/fa';

import { MenuOrders, DivMenus, LogoHall, ButtonPedidos, Textarea, SpamQtd, DivTotal, Soma, Total, Itens } from '../../components/stylesMenu';

const Hall = () => {
    const [menuData, setMenuData] = useState({});
    const [cartData, setCartData] = useState({});
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState('')
    const [client, setClient] = useState('');
    const [response, setResponse] = useState('');
    const [observation, setObservation] = useState('')
    const [status, setStatus] = useState('pending')

    useEffect(async function (token) {
        const { url, options } = USER(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setMenuData(json);
    })
    useEffect(() => {
        let total = (0);
        Object.keys(cartData).map((sku) => {
            let qty = (cartData[sku]);
            let price = (menuData[sku].price);
            return (total += qty * price);
        })
        setCartTotal(total);
    }, [cartData])
    const addToCart = sku => {
        let newCart = { ...cartData };
        if (sku in cartData) {
            newCart[sku] += 1;
        }
        else {
            newCart[sku] = 1;
        }
        setCartData(newCart);
    };
    const reduceFromCart = sku => {
        let newCart = { ...cartData };
        if (sku in cartData) {
            newCart[sku] -= 1;
            if (newCart[sku] < 1) delete newCart[sku];
        }
        setCartData(newCart);
    };
    function createOrder(client, table) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);
        myHeaders.append("Content-Type", "application/json");

        const products = (Object.keys(cartData).map((sku) => ([`
            "qtd": ${cartData[sku]}  
            "id":${menuData[sku].id} 
            ${menuData[sku].name}
         `,])))

        const raw = JSON.stringify({
            "status": status,
            "client": client,
            "table": table,
            "products": products
         });
        console.log(raw);

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
                setResponse(result.json)
                console.log(result);
                setStatus(result.status)
                console.log(result.status)
            })
    }
    const token = localStorage.getItem('token');
    return (
        <div>

            <Link to='/orders'>
                <ButtonPedidos>Pedidos</ButtonPedidos>
            </Link>
            <LogoHall src={Logo} alt='' width='400' />
            <DivMenus>
                <div>
                    <Menu
                        menu={menuData}
                        addToCart={addToCart}
                    />
                </div>
                <MenuOrders>

                    <div id="cart">
                        <label htmlFor="client">Cliente</label>
                        <input
                            type="text"
                            id="client"
                            value={client}
                            onChange={(event) => {
                                setClient(event.target.value);
                                localStorage.setItem('client', client);
                            }}
                        />
                        <label htmlFor="table">Mesa</label>
                        <input
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
                            {
                                Object.keys(cartData).map((sku, index) => (
                                    <div className="cart-item" key={index}>
                                        <div className="item-text">
                                            <p>
                                                {menuData[sku].name}
                                            </p>
                                            <p>{cartData[sku]}</p>
                                            <span className="item-total">
                                                R${menuData[sku].price},00
                                    <button
                                                    className="remove-button"
                                                    onClick={() => reduceFromCart(sku)}
                                                    style={{
                                                        'border': 'none',
                                                        'outline': 'none',
                                                        'backgroundColor': 'transparent',
                                                        'padding': '5px',
                                                        'color': '#E65100',
                                                        'cursor': 'pointer'
                                                    }}>
                                                    - </button>
                                            </span>
                                        </div>
                                        <span>
                                            <p>
                                                {menuData[sku].flavor}
                                            </p>
                                            <div>
                                                {menuData[sku].complement}
                                            </div>
                                        </span>
                                    </div>
                                ))
                            }
                            
                            <div id="cart-total">
                                <Textarea
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
                                    <Soma>
                                        R$ <span id="total-amount">{cartTotal},00</span>
                                    </Soma>
                                </DivTotal>
                                {response && response.ok && <p>Seu pedido foi enviado</p>}
                                <button onClick={() => createOrder(client, table, order)}>Enviar Pedido</button>
                            </div>
                        </div>
                    </div>
                </MenuOrders>
            </DivMenus>
        </div>
    );

}
export default Hall;