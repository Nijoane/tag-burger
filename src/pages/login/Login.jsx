import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Title, Form, Template, Page, Input, Button, Register, Images, BurgerImage } from '../../stylesForm';
import Burger from '../../images/burger.png'
import Logo from '../../images/logoBranco.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const history = useHistory();
    const goToHall = () => {
        history.push('/Hall');
    }
    const goToKitchen = () => {
        history.push('/Kitchen');
    }


    window.localStorage.setItem('token', token);
    function handleSubmit(event) {
        event.preventDefault();

        fetch('https://lab-api-bq.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                console.log(response);
                return response.json();

            })
            .then((json) => {
                console.log(json);
                setToken(json.token);
                if (json.role === 'salao') {
                    goToHall();
                }
                else if (json.role === 'cozinha') {
                    goToKitchen();
                }
            });

    }

    return (
        <Page>
                <Form onSubmit={handleSubmit}>
                    <Title>Faça seu Login</Title>
                    <Input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Button>Entrar</Button>
                    Não tem conta? <NavLink
                        to="/register"
                        style={{
                            'color': '#F57F17',
                            'fontWeight': 'bold',
                        }}
                    > Registre-se</NavLink>
                </Register>
            </Form>
            <Template>
                <Images>
                    <img src={Logo} alt='' />
                    <BurgerImage src={Burger} alt='' />
                </Images>
            </Template>
        </Page>
    );
};

export default Login;