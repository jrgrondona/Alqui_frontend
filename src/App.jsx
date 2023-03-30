import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './componet/login/Login'
import { Registro } from './componet/login/Registro'
import { Panel } from './componet/inicio/Panel'
import { Principal } from './componet/inicio/Principal'
import { Listado } from './componet/inquilinos/ListaInquilinos'
import { AgregarInquilino } from './componet/inquilinos/CargarInquilino'

function App() {
  const [usuario, setUsuario] = useState('');
  
  useEffect(() => {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario')) 
  if (usuarioLogueado){
    setUsuario(usuarioLogueado)
    console.log('usuario logueado',usuarioLogueado)
  } 
},[])

    return (
<>
{
  !usuario?
     <>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/registro' element={<Registro/>}></Route>
      </Routes>
  
     </>:
     <div className=''>
      <Panel/>    
         <Routes>
         <Route path='/' element={<Principal/>}></Route>
         <Route path='/inquilinos' element={<Listado/>}></Route>
         <Route path='/AgregarInquilino' element={<AgregarInquilino/>}></Route>
         </Routes>
     </div>
    }
 </>
  )
} 

export default App