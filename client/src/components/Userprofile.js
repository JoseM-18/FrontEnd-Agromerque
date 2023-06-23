import React from "react";
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./css/Userprofile.css";
import usePageTitle from "./PageTitle";
//pagina para el perfil del usuario
function Userprofile() {
  usePageTitle('Perfil de usuario');
  if(localStorage.getItem("token") === null){
    window.location.href = '/login'
  }
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [user, setUser] = React.useState([]);
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const getUser = async () => {

    

    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await response.json();
    setUser(data);
    setName(data.name);
    setLastname(data.lastname);
    setEmail(data.email);
    setPhone(data.phone);
    setAddress(data.address);
    setPassword(data.password);
  }

  React.useEffect(() => {
    getUser();
  }
  , []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `http://localhost:4000/user/${decoded.idUser}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ name, lastname, email, phone, address, password }),
      });
      const data = await response.json();
      alert("Se ha actualizado el perfil");
    } catch (error) {
      console.log(error);
      alert("ups, algo salio mal");
    }
  }

  return (

    <div className="container">
      <div className="body">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Perfil de usuario</h1>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Correo"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Direccion"
              variant="outlined"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button variant="contained" type="submit">Actualizar</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;