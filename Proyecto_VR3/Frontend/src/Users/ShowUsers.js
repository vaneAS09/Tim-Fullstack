import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../CSS/Home.css';
import '../CSS/Listas_objetos.css';
import '../CSS/Navbar.css';
import { Button } from '@mui/material';
import { DeleteOutline, HorizontalSplit } from "@material-ui/icons";
import { DataGrid,GridToolbarExport,GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,
  GridToolbarDensitySelector} from "@material-ui/data-grid";


const URI = 'http://localhost:5000/users/'


export default function CompShowUsers  ()  {

  const [users, setUsers] = useState([]);
    
   
    useEffect( ()=>{
        getUsers()
    },[])

    //procedimiento para mostrar todos los Usuarios
    const getUsers = async () => {
        const res = await axios.get(URI,  {
      });
        setUsers(res.data)
    }

    //procedimiento para eliminar un usuario
   const deleteUser = async (id) => {
    await axios.delete(`${URI}${id}`)
    getUsers()
    }

  //Configurar las columnas para Datatable

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "documentType", headerName: "Tipo de documento", width: 200 },
    {
      field: "Document", headerName: "Documento",width: 120,
    },
    {
      field: "user", headerName: "Usuario", width: 160,
    },
    {
      field: "email", headerName: "email", width: 160,
    },
    {
      field: "name", headerName: "Nombre", width: 160,
    },
    {
      field: "lastName", headerName: "Apellido", width: 160,
    },
    {
      field: "rol", headerName: "Rol", width: 160,
    },
    {
      field: "pass", headerName: "Contraseña", width: 160,
    },
    {
      field: "Title", headerName: "Cargo", width: 160,
    },
    {
      field: "titleArea", headerName: "Área del Cargo", width: 160,
    },
    {
      field: "createdAt", headerName: "Fecha de Creación", width: 160,
    },
    {
      field: "updatedAt", headerName: "Fecha de Modificación", width: 160,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit/" + params.row.id} className='btn btn-light'>
            <i className="fas fa-edit"></i>
            </Link>
            <DeleteOutline 
              onClick={() => deleteUser(params.row.id)}
            />
          </>
        );
      },
    },
  ];
      
      function MyExportButton() {
        return (
      <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      </GridToolbarContainer>
        );
      }


    return(
        <div className='Usuario_body'>
            <div className='Home-body'>

               <div class="Home-header">
               <div class="btn-menu">
               <label for="btn-menu">☰</label>
               </div>
               <img class="uao-logo"></img>
               <div class="Home-titleFont">PORTAL DE MERCADEO</div>
               <button class="Home_logout">Log Out</button>
               <a href="../Dashboard" class="Home_volver">Home</a>
               </div>

      <nav class="nav_bar">
      
      <a href="/ShowUsers" class="nav_tb">
          <div class="Icon_user"> </div>
          Usuarios</a>

      <a href="/index_colegio" class="nav_tb">
          <div class="Icon_col"></div>
          Colegios</a>

      <a href="/index_pa" class="nav_tb"> 
          <div class="Icon_pro"></div>
          Programas</a>

      <a href="/index_pe" class="nav_tb">
          <div class="Icon_pre"></div>
          Preguntas</a>
  
      <a href="/test" class="nav_tb">
          <div class="Icon_test"></div>
          Test</a>
  
      <a href="/Index_pros" class="nav_tb">
          <div class="Icon_prosp"></div>
          Prospectos</a>
               </nav> 
        <div class="Usuarios_dashboard">

            <div class="Usuarios_icon_init"></div>  
            <div class="Usuarios_title_init">Usuarios</div>
            <Button href="/create" className='Agregar_position'><i>Crear Usuario</i></Button>
    
                    <DataGrid className='Tabla_position'
                      rows={users}
                      disableSelectionOnClick
                      columns={columns}
                      pageSize={8}
                      responsive= {HorizontalSplit}
                      checkboxSelection
                      components={{
                        Toolbar: MyExportButton
                      }}

                      sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                    </DataGrid>
        
         
        </div>    
        </div>
        </div>
    );

}