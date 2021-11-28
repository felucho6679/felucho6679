import React, {useState, useEffect} from 'react';
import { getAuth, signOut } from 'firebase/auth'; 
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import { Container, Button } from 'react-bootstrap';
import firebaseApp from '../credenciales';
import AgregarTarea from './AgregarTarea';
import ListadoTarea from './ListadoTarea';
const auth =  getAuth(firebaseApp );
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayTarea, setArrayTarea] = useState(null);
  
  const fakeData = [
    { id: 1, descripcion: "tarea1", url:"https//picsum.photos/420"},
    { id: 2, descripcion: "tarea2", url:"https//picsum.photos/420"},
    { id: 3, descripcion: "tarea3", url:"https//picsum.photos/420"},
];

async function buscarDocumentoOrCrearDocumento(idDocumento){
  const docuRef = doc(firestore, `usuarios/${idDocumento}`);
  const consulta = await getDoc(docuRef);

  if (consulta.exists()) {
    const infoDocu = consulta.data();
    return infoDocu.tareas;
  } else {
    await setDoc(docuRef, {tareas: [... fakeData]});
    const consulta = await getDoc(docuRef);
    const infoDocu = consulta.data();
    return infoDocu.tareas;
  }
}

useEffect(() => {
async function fetchTarea() {
  const tareaFechada = await buscarDocumentoOrCrearDocumento(correoUsuario);
  setArrayTarea(tareaFechada);
}
fetchTarea();

},[]);


  return (
        <container>
          <h4> Hola, sesion iniciada </h4>
          <button onClick={() => signOut(auth)} >cerrar sesion</button>
        <hr/>
        
        {arrayTarea ? <ListadoTarea 
        arrayTarea={arrayTarea}
        setArrayTarea= {setArrayTarea}
        correoUsuario= {correoUsuario}
        /> : null}
        
        <AgregarTarea
        arrayTarea={arrayTarea}
        setArrayTarea= {setArrayTarea}
        correoUsuario= {correoUsuario}
        />        
        </container>
    )
}

export default Home;
