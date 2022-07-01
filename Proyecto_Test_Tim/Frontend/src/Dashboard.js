import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import './CSS/Home.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom';


const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate.push("/");
            }
        }
    }

    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
 
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>    
        <div className="Home-body">
         <div class="Home-header">
         <div class="btn-menu">
         <label for="btn-menu">☰</label>
         </div>
         <img class="uao-logo"></img>
         <div class="Home-titleFont">PORTAL DE MERCADEO</div>  
         <button onClick={Logout} className="button is-light" class="Home_logout">Log Out</button>
         </div>
         
        <div className="Home-dashboard">
 
           <div class="Home-dashboardFont">
             Dashboard
           </div>
 
           <div class="Home-user">
             <div class="Home-userImage"></div>
             <div class="Home-userFont">
             <Nav.Link as={Link} to="/ShowUsers" class="Home-userFont">Usuarios</Nav.Link>
             </div>
           </div>
 
           <div class="Home-colegio">
               <div class="Home-colegioImage"></div>
               <div class="Home-colegioFont">
               <Nav.Link as={Link} to="#">Colegios</Nav.Link>
               </div>
           </div>
 
           <div class="Home-programa">
               <div class="Home-programaImage">
               </div>
               <div class="Home-programaFont">
               <Nav.Link as={Link} to="#">Programas Académicos</Nav.Link>
               </div>
            </div>
 
           <div class="Home-preguntas">
               <div class="Home-PreguntasImage">
               </div>
               <div class="Home-preguntasFont">
               <Nav.Link as={Link} to="#">Preguntas</Nav.Link>
               </div>
           </div>
 
           <div class="Home-test">
               <div class="Home-testImage">
               </div>
               <div class="Home-testFont">
               <Nav.Link as={Link} to="#">Test</Nav.Link>
               </div>
            </div>
 
           <div class="Home-prospectos">
               <div class="Home-prospectosImage">
               </div>
               <div class="Home-prospectosFont">
               <Nav.Link as={Link} to="#">Prospectos</Nav.Link>
               </div>
           </div>    
           </div>     

           </div> 
        </> 
 
        
    )
}
export default Dashboard