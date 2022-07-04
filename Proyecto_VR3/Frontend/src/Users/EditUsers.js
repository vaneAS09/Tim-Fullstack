import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:5000/users/'

const CompEditUsers = () => {
    const [documentType, setdocumentType] = useState('')
    const [Document, setDocument] = useState('')
    const [user, setuser] = useState('')
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [lastName, setlastName] = useState('')
    const [rol, setrol] = useState('')
    const [pass, setpass] = useState('')
    const [Title, setTitle] = useState('')
    const [titleArea, settitleArea] = useState('')    
    const navigate = useNavigate()
    const {id} = useParams()

    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id, {
            documentType: documentType, 
            Document:Document, 
            user:user, 
            email:email,
            name:name, 
            lastName:lastName, 
            rol:rol, pass:pass, 
            Title:Title, 
            titleArea:titleArea
        })
        navigate('/ShowUsers')
    }

    useEffect( ()=>{
        getUserById()
    },[])

    const getUserById = async () => {
        const res = await axios.get(URI+id)
        setdocumentType(res.data.documentType)
        setDocument(res.data.Document)
        setuser(res.data.user)
        setemail(res.data.email)
        setname(res.data.name)
        setlastName(res.data.lastName)
        setrol(res.data.rol)
        setpass(res.data.pass)
        setTitle(res.data.Title)
        settitleArea(res.data.titleArea)
    }

    return (
        <div class="register-form">
           <h1 class="Registrar_font">Editar un Usuario</h1>

           <form onSubmit={update} class="Registrar_font">
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
                     <label className='form-label'>* Email</label>
                    <input
                        value={email}
                        onChange={ (e)=> setemail(e.target.value)} 
                        type="email"
                        className='form-control'
                        required 
                        tabindex="4" 
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
                        minlength="3" maxlength="20" required tabindex="5"
                    />                 
                 </div> 

                 <div className='mb-3'>
                     <label className='form-label'>* Apellidos</label>
                    <input
                        value={lastName}
                        onChange={ (e)=> setlastName(e.target.value)} 
                        type="text"
                        className='form-control'
                        minlength="3" maxlength="20" required tabindex="6"
                    />                 
                 </div> 
                 <label className='form-label'>* Perfil</label>
                <select id="rol" name="rol" class="select-css" tabindex="7"
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

export default CompEditUsers