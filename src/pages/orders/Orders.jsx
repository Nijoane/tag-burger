import { useEffect, useState } from 'react';
import { ProductsCardapio, ButtonSendCardapio, MenusCardapio, DivMenus, LogoHallOrders, SpanOrders } from '../../components/stylesMenu';
import Logo from '../../images/logo.png';

const Orders = () => {
    const [done, setDone] = useState([]);
    const [delivered, setDelivered] = useState([]);

    const observation = localStorage.getItem('observation');
    const token = localStorage.getItem('token');
    
    const getAllOrders = async (token) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        };

        fetch('https://lab-api-bq.herokuapp.com/orders', options)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    const allOrders = result;
                    setDone(allOrders.filter((item) =>
                        item.status.includes('done')
                    ));
                    setDelivered(allOrders.filter((item) =>
                        item.status.includes('delivered')
                    ));
                }
            })
    }
    useEffect(() => {
        getAllOrders(token);
    }, [token]);

    setTimeout(() => { getAllOrders(token) }, 30000);

    const handleChange = (id, status, index) => {
        let statusOrder = '';
        let key = `/${id}`

        if (status === 'doing') {
            statusOrder = { 'status': 'done' }
        }
        if (status === 'done') {
            statusOrder = { 'status': 'delivered' }
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(statusOrder),
        };

        fetch(`https://lab-api-bq.herokuapp.com/orders/${key}`, options)
            .then(response => response.json())
            .then((result) => {
                if (status === 'done' && result.id === done[index].id) {
                    done.splice(index, 1)
                    setDone([...done])
                    setDelivered([...delivered, result])
                }
                if (status === 'delivered' && result.id === delivered[index].id) {
                    delivered.splice(index, 1)
                    setDelivered([...delivered])
                }
            })
    }

    return (
        <div>
             <LogoHallOrders src={Logo} alt='' width='400' />
             <DivMenus>
            <section>
                <MenusCardapio >Pedidos prontos</MenusCardapio >
                <div>
                    {done
                        .map(({ id, client_name, table, status, createdAt, updatedAt, Products }, index) => (
                            <ProductsCardapio key={Math.random()}>
                                <div key={Math.random()}>
                                    <p>Pedido n°: <SpanOrders >{id}</SpanOrders ></p>
                                    <p>Cliente: <SpanOrders >{client_name}</SpanOrders > </p>
                                    <p>Mesa: <SpanOrders >{table}</SpanOrders ></p>
                                    <div> Produtos: <SpanOrders >{Products && Products.map((product) => {
                                        const { name, flavor, complement } = product;
                                        const templateOrder = `
                                            ${name} 
                                            ${flavor || ""} 
                                            ${complement || ""}`
                                        return <p key={Math.random()}>{templateOrder}</p>
                                    })}</SpanOrders > 
                                    </div>
                                    <p>Observação: {observation}</p>
                                    <p>Status do pedido: <SpanOrders >{status}</SpanOrders > </p>
                                    <p>Pedido realizado em: <SpanOrders >{createdAt}</SpanOrders ></p>
                                    <p>Pedido atualizado em: <SpanOrders >{updatedAt}</SpanOrders > </p>                        
                                </div>
                                <ButtonSendCardapio 
                                    onClick={() => handleChange(id, status, index)}
                                >Entregue</ButtonSendCardapio >
                            </ProductsCardapio>
                        ))
                    }
                </div>
            </section>
            <section>
                {delivered !== [] &&
                    <>
                        <MenusCardapio >Pedidos entregues</MenusCardapio >
                        <div>
                            {delivered
                                .map(({ id, client_name, table, status, createdAt, updatedAt, Products }, index) => (
                                    <ProductsCardapio key={Math.random()}>
                                        <div key={Math.random()}>
                                            <p>Pedido n°: <SpanOrders >{id}</SpanOrders ></p>
                                            <p>Cliente: <SpanOrders >{client_name}</SpanOrders ></p>
                                            <p>Mesa: <SpanOrders >{table}</SpanOrders ></p>
                                            <div> Produtos: <SpanOrders > {Products && Products.map((product) => {
                                                    const { name, flavor, complement } = product;
                                                    const templateOrder = `
                                                        ${name} 
                                                        ${flavor || ""} 
                                                        ${complement || ""}`
                                                    return <p key={Math.random()}>{templateOrder}</p>
                                                })}</SpanOrders >
                                               
                                            </div>
                                            <p>Observação: {observation}</p>
                                            <p>Status do pedido: <SpanOrders >{status}</SpanOrders > </p>
                                            <p>Pedido realizdo em: <SpanOrders >{createdAt}</SpanOrders > </p>
                                            <p>Pedido atualizado em: <SpanOrders >{updatedAt}</SpanOrders > </p>
                                        </div>
                                    </ProductsCardapio>
                                ))
                            }
                        </div>
                    </>
                }
            </section>
            </DivMenus>
        </div>
    )
}

export default Orders;

