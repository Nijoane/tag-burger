import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Title, Form, Template, Page, Input, Button, Images, BurgerImage } from '../../components/stylesForm';
import Burger from '../../images/burger.png'
import Logo from '../../images/logoBranco.png'
import { CREATE_USER } from '../../components/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const formFields = [
    {
        id: 'name',
        placeholder: 'Nome',
        type: 'text',
    },
    {
        id: 'email',
        placeholder: 'E-mail',
        type: 'text',
    },
    {
        id: 'password',
        placeholder: 'Senha',
        type: 'password',
    },
    {
        id: 'role',
        placeholder: 'Você é do salão ou da cozinha?',
        type: 'text',
    }
]

const Register = () => {
    const [response, setResponse] = useState();
    const [openAlertError, setOpenAlertError] = useState(false);
    const [form, setForm] = useState(
        formFields.reduce((acc, field) => {
            return {
                ...acc,
                [field.id]: '',
                restaurant: 'TAG Burger'
            };
        }, {}),
    );
    const handleClose = (reason) => {
		if (reason === 'clickaway') {
		  return;
        }
        
		setOpenAlertError(false);
	  };

    const history = useHistory();
    const goToHall = () => {
        history.push('/Hall');
    }
    const goToKitchen = () => {
        history.push('/Kitchen');
    }
    function handleChange({ target }) {
        const { id, value } = target;
        setForm({ ...form, [id]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { url, options } = CREATE_USER(form);
        const response = await fetch(url, options);
        const json = await response.json();
        setResponse(json);
        console.log(response)

        if (json.role === 'salao') {
            goToHall();
        }
        else if (json.role === 'cozinha') {
            goToKitchen();
        }else{
            setOpenAlertError(true);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
        }
        

    }
    return (
        <Page>
            <Form onSubmit={handleSubmit}>
                <Link to='/'>
                    <button
                        style={{
                            'border': 'none',
                            'outline': 'none',
                            'backgroundColor': '#F3ECE5',
                            'textAlign': 'center',
                            'fontSize': '50px',
                            'color': '#E65100',
                            'cursor': 'pointer'
                        }}
                    >
                        <FiArrowLeft />
                    </button>
                </Link>
                <Title>Crie seu registro</Title>
                {formFields.map(({ id, placeholder, type }) => (
                    <div key={id}>
                        <Input
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            value={form[id]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {
                    response && response.ok &&
                    <p style={{ 'padding': '10px', }}>Seu registro foi criado com sucesso</p>
                }
                <Snackbar open={openAlertError} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                        Ocorreu um erro. 
                        Talvez esse usuário já exista, ou suas informações não estão corretas!
			        </Alert>
                </Snackbar>
                <Button> Registrar</Button>
            </Form>
            <Template>
                <Images>
                    <img src={Logo} alt='' />
                    <BurgerImage src={Burger} alt='' />
                </Images>
            </Template>
        </Page>
    );
}

export default Register;
