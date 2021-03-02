import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { CREATE_ORDER } from '../components/api';
import { Textarea, SpamQtd, ProductsOrders, SpanNameOrders, SpanFlavor, DivTotal, Complement, Soma, Total, Itens } from '../components/stylesMenu';

function Cart({ total, cart, menu, reduceCart }) {
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState('')
    const [client, setClient] = useState('');
    const [response, setResponse] = useState('');
    const [observation, setObservation] = useState('')
    
    const createOrder = async () => {
        const newOrder =  order.map((item) => ({
            id: `${item.id}`,
            qtd: 1,
        }))

        const { url, options } = CREATE_ORDER({
            client,
            table,
            products: newOrder,
        })

        const response = await fetch(url, options);
        const json = await response.json();
        setOrder(json)
        setResponse(json)
    }

    return (
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
                    Object.keys(cart).map((sku, index) => (
                        <ProductsOrders className="cart-item" key={index}>
                            <SpanNameOrders className="item-text">
                                <Itens >
                                    {menu[sku].name}
                                </Itens>
                                <Itens>{cart[sku]}</Itens>
                                <span className="item-total">
                                    R${menu[sku].price},00
                                    <button 
                                        className = "remove-button" 
                                        onClick = {() => reduceCart(sku)}
                                        style = {{
                                            'border': 'none',
                                            'outline': 'none',
                                            'backgroundColor': 'transparent',
                                            'padding': '5px',
                                            'color': '#E65100',
                                            'cursor': 'pointer'
                                        }}>
                                            <FaTrashAlt />
                                        </button>
                                </span>
                            </SpanNameOrders>
                            <SpanFlavor>
                                <Itens >
                                    {menu[sku].flavor}
                                </Itens>
                                <Complement>
                                    {menu[sku].complement} 
                                </Complement>
                            </SpanFlavor>
                        </ProductsOrders >
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
                            R$ <span id="total-amount">{total},00</span>
                        </Soma>
                    </DivTotal>
                    {response && response.ok && <p>Seu pedido foi enviado</p>}
                    <button 
                        id="setOrder"
                        type="submit"
                        onClick={(event) => {
                            const allOrders = [{cart}];
                            localStorage.setItem('order', JSON.stringify(allOrders));
                            createOrder(event); 
                        }}
                    > Enviar pedido</button>
                </div>
            </div>
        </div>
    );
}
export default Cart;