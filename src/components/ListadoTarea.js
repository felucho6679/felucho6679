import React from 'react'
import { Stack, Container, Row, Col, Button} from 'react-bootstrap'

import firebaseApp from '../credenciales';
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
const firestore = getFirestore(firebaseApp);

const ListadoTarea = ({arrayTarea, correoUsuario, setArrayTarea}) => {
    async function eliminarTarea(idTareaEliminar) {
        //crear base de datos
        const nvoArrayTarea = arrayTarea.filter(
            (objetoTarea) => objetoTarea.id !== idTareaEliminar
        );
            // eliminar base de datos
            const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
            updateDoc(docuRef, {tareas: [...nvoArrayTarea]});
            //actualizar tareas
            setArrayTarea(nvoArrayTarea);

    }
    return (
        <Container>
            <Stack>
            {arrayTarea.map((objetoTarea) => {
                return (
                    <>
                    <Row>
                        <Col>{objetoTarea.descripcion}</Col>
                        <Col>
                        <a href={objetoTarea.url}>
                        <Button variant="secondary"> ver archivo </Button>
                        </a>
                        </Col>
                        <Col><Button variant="danger" onClick={() => eliminarTarea(objetoTarea.id)}> Eliminar Tarea </Button></Col>
                        </Row>
                        <hr/>
                        </>
                );
            })}
            </Stack>

        </Container>

    )
}

export default ListadoTarea
