import {useState} from 'react'
import {Stack, Container, Form, Button} from 'react-bootstrap';

import firebaseApp from '../credenciales';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,

} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider()

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);
    async function submitHandler(e) {
        e.preventDefault();
        const correo= e.target.formBasicEmail.value;
        const contra= e.target.formBasicPassword.value;
        
        if (estaRegistrandose){
        const usuario =  await createUserWithEmailAndPassword(auth, correo, contra);
        } else {
            signInWithEmailAndPassword(auth, correo, contra);
        }
    }


    return (
        <Container>
            <Stack gap={3}>
<h1> {estaRegistrandose ? "Registrate" : "Inicia sesion"} </h1>
  <Form onSubmit={submitHandler} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    {estaRegistrandose ? "Registrate" : "Inicia sesion"}
  </Button>
</Form>

<Button variant="primary" type="submit" style={{width: "300px"}}
onClick={() => signInWithRedirect(auth, googleProvider)}>
   acceder con google
  </Button>

  <Button style={{width: "300px"}} variant="primary" 
  onClick={() => setEstaRegistrandose(!estaRegistrandose)}
   >
   {estaRegistrandose ? "ya tienes cuenta? inicia sesion" : "no tiene cuenta, registrate"}
  </Button>
            </Stack>
        </Container>
 
    )
}

export default Logueo
