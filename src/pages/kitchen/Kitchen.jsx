import { useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import { ProductsCardapio, ButtonSendCardapio, LogoHallOrders, MenusCardapio, DivMenus, SpanOrders} from '../../components/stylesMenu';
const Kitchen = () => {
    const [pending, setPending] = useState([]);
    const [doing, setDoing] = useState([]);
  
    const observation = localStorage.getItem('observation')
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
                    setPending(allOrders.filter((item) =>
                        item.status.includes('pending')
                    ));
                    setDoing(allOrders.filter((item) =>
                        item.status.includes('doing')
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
        if (status === 'pending') {
            statusOrder = { 'status': 'doing' }
        }
        if (status === 'doing') {
            statusOrder = { 'status': 'done' }
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
                if (status === 'pending' && result.id === pending[index].id) {
                    pending.splice(index, 1)
                    setPending([...pending])
                    setDoing([...doing, result])
                }
                if (status === 'doing' && result.id === doing[index].id) {
                    doing.splice(index, 1)
                    setDoing([...doing])
                }
            })
    }
    return (
        <div>
             <LogoHallOrders src={Logo} alt='' width='400' />
             <DivMenus>
            <section>
                <MenusCardapio>Pedidos pendentes</MenusCardapio>
                <div>
                    {pending
                        .map(({ id, client_name, table, status, createdAt, Products }, index) => (
                            <ProductsCardapio key={Math.random()}> 
                                <div key={Math.random()}>
                                    <p>Pedido n°: <SpanOrders>{id}</SpanOrders> </p>
                                    <p>Cliente: <SpanOrders>{client_name}</SpanOrders> </p>
                                    <p>Mesa: <SpanOrders>{table}</SpanOrders></p>
                                    <div> Produtos: <SpanOrders>{Products && Products.map((product) => {
                                        const { name, flavor, complement } = product;
                                        const templateOrder = `
                                            ${name} 
                                            ${flavor || ""} 
                                            ${complement || ""}`
                                        return <p key={Math.random()}>{templateOrder}</p>
                                    })}</SpanOrders>
                                    </div>
                                    <p>Observação: {observation}</p>
                                    <p>Status do pedido: <SpanOrders>{status}</SpanOrders></p>
                                    <p>Pedido realizdo em: <SpanOrders>{createdAt}</SpanOrders></p>
                                </div>
                                <ButtonSendCardapio 
                                    onClick={() => handleChange(id, status, index)}
                                >Iniciar Pedido</ButtonSendCardapio >
                            </ProductsCardapio>
                        ))
                    }
                </div>
            </section>
            <section>
                {doing !== [] &&
                    <>
                        <MenusCardapio>Pedidos em preparo</MenusCardapio >
                        <div>
                            {doing
                                .map(({ id, client_name, table, status, createdAt, updatedAt, Products }, index) => (
                                    <ProductsCardapio key={Math.random()}>
                                        <div key={Math.random()}>
                                            <p>Pedido n°: <SpanOrders> {id}</SpanOrders></p>
                                            <p>Cliente: <SpanOrders> {client_name}</SpanOrders></p>
                                            <p>Mesa: <SpanOrders> {table}</SpanOrders></p>
                                            <div> Produtos: <SpanOrders> {Products && Products.map((product) => {
                                                    const { name, flavor, complement } = product;
                                                    const templateOrder = `
                                                        ${name} 
                                                        ${flavor || ""} 
                                                        ${complement || ""}`
                                                    return <p key={Math.random()}>{templateOrder}</p>
                                                })}</SpanOrders>
                                                
                                            </div>
                                            <p>Observação: {observation}</p>
                                            <p>Status do pedido: <SpanOrders> {status}</SpanOrders></p>
                                            <p>Pedido realizdo em: <SpanOrders> {createdAt}</SpanOrders></p>
                                            <p>Pedido atualizado em: <SpanOrders> {updatedAt}</SpanOrders></p>
                                        </div>
                                        <ButtonSendCardapio 
                                            onClick={() => handleChange(id, status, index)}
                                        >Finalizar Pedido</ButtonSendCardapio >
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
export default Kitchen;