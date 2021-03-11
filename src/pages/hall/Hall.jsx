/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Menu from "../../containers/Menu";
import Logo from '../../images/logoLaranja.png';
import { USER } from "../../components/api";
import { FaTrashAlt } from 'react-icons/fa';
import { ButtonSend, InputTable, InputClient, LabelClient, SpanFlavor, Complement, SpanNameOrders, ProductsOrders, MenuOrders, DivMenus, LogoHall, ButtonPedidos, Textarea, SpamQtd, DivTotal, Soma, Total, Itens } from '../../components/stylesMenu';

const Hall = () => {
    const [menuData, setMenuData] = useState({});
    const [cartData, setCartData] = useState({});
    const [cartTotal, setCartTotal] = useState(0);
    const [observation, setObservation] = useState('');
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState('');
    const [client, setClient] = useState('');

    const getToken = async (token) => {
        const { url, options } = USER(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setMenuData(json);
    }
    useEffect(() => {
        getToken(token)
    }, []);

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

    const createOrder = async (client, table, observation) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);
        myHeaders.append("Content-Type", "application/json");

        const products =
            (Object.keys(cartData).map((qtd) => (
                {
                    "id": `${menuData[qtd].id}`,
                    "qtd": `${cartData[qtd]}`
                }
            )));

        const body = JSON.stringify({
            client,
            table,
            observation,
            products: products,
        });

        const options = {
            method: "POST",
            headers: myHeaders,
            body: body,
            redirect: "follow"
        };

        fetch("https://lab-api-bq.herokuapp.com/orders", options)
        .then(response => response.json())
        .then(result => {
            setOrder(result.json);
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
                        <LabelClient htmlFor="client">Cliente</LabelClient>
                        <InputClient
                            type="text"
                            id="client"
                            value={client}
                            onChange={(event) => {
                                setClient(event.target.value);
                                localStorage.setItem('client', client);
                            }}
                        />
                        <LabelClient htmlFor="table">Mesa</LabelClient>
                        <InputTable
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
                                <ProductsOrders key={index}>
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
                                {/* {response && response.ok && <p>Seu pedido foi enviado</p>} */}
                            </div>
                        </div>
                    </div>
                </MenuOrders>
            </DivMenus>
            <ButtonSend onClick={() => createOrder(client, table, observation, order)}>Enviar Pedido</ButtonSend>
        </div>
    );
}
export default Hall;