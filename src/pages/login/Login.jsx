import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { TOKEN } from '../../components/api';
import Password from '../../components/Password';
import { Title, Form, Template, Page, Input, Button, Register, Images, BurgerImage, EYE } from '../../components/stylesForm';
import Burger from '../../images/burger.png'
import Logo from '../../images/logoBranco.png'

const Login = () => {
    const [PasswordInputType, TogleIcon] = Password();
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
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { url, options } = TOKEN({
            email,
            password,
            token,
        })

        const response = await fetch(url, options);
        const json = await response.json();
        setToken(json.token);

        if (json.role === 'salao') {
            goToHall();
        }
        else if (json.role === 'cozinha') {
            goToKitchen();
        }
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
                    type={PasswordInputType}
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <EYE>{TogleIcon}</EYE>
                <Button>Entrar</Button>
                <Register>
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