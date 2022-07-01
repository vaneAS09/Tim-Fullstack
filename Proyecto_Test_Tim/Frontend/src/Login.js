import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './CSS/Login.css';

const URI = 'http://localhost:5000/users/login'
 
const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate() 
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post( URI, {
                user: user,
                pass: pass
                
            });
            navigate.push("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }

          
        }
    }
 
    return (
        <section>
            <div cclassName="inicio-body">
                <div className="container">
                    <div ><img class="Imagen_inicio" border-style= "none"></img>
                        <div>
                        
                            <form onSubmit={Auth} method="POST" class= "Inicio-formulario">
                                
                                <div>
                                <img class="logo_uao" border-style= "none"></img>
                                    <label className="label"></label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} autofocus required />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label"></label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={pass} onChange={(e) => setPass(e.target.value)} autofocus required />
                                        <p className="has-text-centered">{msg}</p>
                                    </div>
                                </div>
                                <div>
                               
                                    <button class="btn_iniciar">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Login