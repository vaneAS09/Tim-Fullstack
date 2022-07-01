import axios from 'axios'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import '../CSS/Formularios.css';
import '../CSS/Crear_objetos.css';

const URI = 'http://localhost:5000/users/'

const CompCreateUsers = () => {
    const [documentType, setdocumentType] = useState('')
    const [Document, setDocument] = useState('')
    const [user, setuser] = useState('')
    const [name, setname] = useState('')
    const [lastName, setlastName] = useState('')
    const [rol, setrol] = useState('')
    const [pass, setpass] = useState('')
    const [confPassword, setConfPassword] = useState('');
    const [Title, setTitle] = useState('')
    const [titleArea, settitleArea] = useState('')
    const [msg, setMsg] = useState('');
    const navigate = useNavigate()    
    
    //procedimiento guardar
    const Guardar = async (e) => {
        e.preventDefault()
        try{
            await axios.post(URI, {
                documentType: documentType, 
                Document:Document, 
                user:user, name:name, 
                lastName:lastName, 
                rol:rol, 
                pass:pass, 
                confPassword: confPassword,
                Title:Title, 
                titleArea:titleArea
        });
          navigate.push("/ShowUsers");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }

    }   

    return (
        <div class="register-form">
           <h1 class="Registrar_font">Agregar un Usuario</h1>

           <form onSubmit={Guardar} class="Registrar_font">
                <div className='mb-3'>

                <label className='form-label'>* Tipo de documento</label>
                <select id="rol" name="documentType" class="select-css" tabindex="1"
                                        value={documentType}
                                        onChange={ (e)=> setdocumentType(e.target.value)} 
                                        type="text"
                                        className='form-control'
                                        required
                > 
                  <option value="Cc" selected>Cédula</option>
                  <option value="Ti">Tarjeta de identidad</option>     
                                 
                </select>

                    
                 </div>   
                 <div className='mb-3'>
                     <label className='form-label'>* Documento de identidad</label>
                    <input
                        value={Document}
                        onChange={ (e)=> setDocument(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="5" 
                        maxlength="14"
                        required 
                        tabindex="2" 
                        autofocus
                    />                 
                 </div>  

                 <div className='mb-3'>
                     <label className='form-label'>* Usuario</label>
                    <input
                        value={user}
                        onChange={ (e)=> setuser(e.target.value)} 
                        type="email"
                        className='form-control'
                        required 
                        tabindex="3" 
                        autofocus
                    />                 
                 </div>  

                 <div className='mb-3'>
                     <label className='form-label'>* Nombres</label>
                    <input
                        value={name}
                        onChange={ (e)=> setname(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="3" maxlength="20" required tabindex="4"
                    />                 
                 </div> 

                 <div className='mb-3'>
                     <label className='form-label'>* Apellidos</label>
                    <input
                        value={lastName}
                        onChange={ (e)=> setlastName(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="3" maxlength="20" required tabindex="5"
                    />                 
                 </div> 
                 <label className='form-label'>* Perfil</label>
                <select id="rol" name="rol" class="select-css" tabindex="6"
                                        value={rol}
                                        onChange={ (e)=> setrol(e.target.value)} 
                                        type="text"
                                        className='form-control'
                                        required
                > 
                <option value="Administrador" selected>Administrador</option>
                <option value="Evaluador">Evaluador</option>    
                                 
                </select>


                 <div className='mb-3'>
                     <label className='form-label'>* Contraseña</label>
                    <input
                        value={pass}
                        onChange={ (e)=> setpass(e.target.value)} 
                        type="password"
                        className='form-control'
                        minlength="5" maxlength="8" required tabindex="7"
                    />                 
                 </div> 

                 <div className='mb-3'>
                     <label className='form-label'>* Confirme Contraseña</label>
                    <input
                        value={confPassword} 
                        onChange={ (e)=> setConfPassword(e.target.value)} 
                        type="password"
                        className='form-control'
                        minlength="5" maxlength="8" required tabindex="8"
                    />                 
                 </div> 

                 <div className='mb-3'>
                     <label className='form-label'>* Cargo</label>
                    <input
                        value={Title}
                        onChange={ (e)=> setTitle(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="4" maxlength="25" required tabindex="9"
                    />                 
                 </div> 

                 <div className='mb-3'>
                     <label className='form-label'>* Área del cargo</label>
                    <input
                        value={titleArea}
                        onChange={ (e)=> settitleArea(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="3" maxlength="25" required tabindex="10"
                    />                 
                 </div> 

                 <button type='submit' class="btn-register">Guardar</button>  
                   
                 <a href="/ShowUsers" class="btn-Cancelar">Cancelar</a> 
                              
           </form>
        </div>
    )
}

export default CompCreateUsers