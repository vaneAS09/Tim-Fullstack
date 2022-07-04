import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./CSS/Login.css";
import "./CSS/style.css"


const Login = () => {
  const [inputs, setInputs] = useState({ email: "", pass: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const { email, pass } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && pass !== "") {
      const Usuario = {
        email,
        pass,
      };
      setLoading(true);
      await axios
        .post("http://localhost:5000/users/login", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          if(data.usuario.token !== ""){
            MySwal.fire({
                title: <strong>Loguin Correcto</strong>,
                html: <i>¡Haz iniciado sesión de manera exitosa!</i>,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
        }
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate(`/Dashboard`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          MySwal.fire({
            title: <strong>Loguin Incorrecto</strong>,
            html: <i>Usuario o contraseña incorrectos, por favor valide sus datos</i>,
            icon: 'error',
            showConfirmButton: true,
            });
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setInputs({ email: "", pass: "" });
      setLoading(false);
    }
  };


  return (
    <>
      <div className="inicio-body">

            <p>
			<img class="Imagen_inicio" border-style= "none"></img>
		    </p>

        <form  class= "Inicio-formulario" onSubmit={(e) => onSubmit(e)}>

            <p>
			<img class="logo_uao" border-style= "none"></img>
		    </p>

          <div >
            <div >
              <label htmlFor="email"></label>
              <input
                onChange={(e) => HandleChange(e)}
                value={email}
                name="email"
                id="email"
                type="email"
                placeholder="Usuario"
                autofocus required
                class= "input"
              />
            </div>
  
          </div>

          <div >
            <div >
              <label htmlFor="pass"></label>
              <input
                onChange={(e) => HandleChange(e)}
                value={pass}
                name="pass"
                id="pass"
                type="password"
                placeholder="Contraseña"
                autofocus required
                class= "input"
              />
               {mensaje && <div>{mensaje}</div>}
            </div>
          </div>
          <button type="submit" class="btn_iniciar">
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>

     
    </>
  );
};

export default Login;