import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import firebaseApp from '../credenciales'
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarTarea = ({correoUsuario, setArrayTarea, arrayTarea}) => {
let urlDescarga;

    async function añadirTarea(e){
    e.preventDefault();
    const descripcion = e.target.formDescripcion.value;
    // crea un nuevo array de tarea
    const nvoArrayTarea = [
     ...arrayTarea,
     {
        id: + new Date(),
        descripcion: descripcion,
        url: urlDescarga,
     },
    ];
    
    //actualizar base
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, {tareas: [...nvoArrayTarea] });
    
    //actualizar estado
    setArrayTarea(nvoArrayTarea);
    //limpiar form
    e.target.formDescripcion.value ="";
}

async function fileHandler(e) {
//detectar el archivo
const archivoLocal = e.target.files[0];
// cargar a fiberbase
const archivoRef = ref(storage, `documento/${archivoLocal.name}`);
await uploadBytes(archivoRef, archivoLocal);
// obtener url de descarga
urlDescarga = await getDownloadURL(archivoRef);

}

    return (
        <Container>
            <Form onSubmit={añadirTarea}>
            <Row className="mb-5">
                <Col><Form.Control type="text" placeholder="Describe tu tarea" id="formDescripcion" /></Col>
                <Col><Form.Control type="file" placeholder="Añade Archivo" onChange={fileHandler} /></Col>
                <Col><Button type="submit"> Agregar Tarea</Button></Col>
            </Row>
            </Form>
       </Container>      



    )
}

export default AgregarTarea
