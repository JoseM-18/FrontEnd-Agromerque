import React from "react";
import jwt_decode from "jwt-decode";
import { Snackbar, Alert } from "@mui/material";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBValidation,
  MDBValidationItem,
  MDBInput

} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";
import usePageTitle from "./PageTitle";
//pagina para el perfil del usuario
function Userprofile() {
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  usePageTitle('Perfil de usuario');
  if (localStorage.getItem("token") === null) {
    window.location.href = '/login'
  }
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const navigate = useNavigate();

  const [user, setUser] = React.useState([]);
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const updateCustomer = async (data) => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const idUser = decoded.idUser;

    if (name === "" || lastname === "" || username === "" || email === "" || phone === "" || address === "" || password === "") {
      setMessage("Por favor, llene todos los campos");
      setShowErrorMessage(true);
      return;
    }


    try {
      const response = await fetch(`http://localhost:4000/user/${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();

      if (res.message === "User Updated") {
        setMessage("Usuario actualizado correctamente");
        setShowSuccessMessage(true);
        //esperamos 3 segundos y redirigimos a la pagina de login
        setTimeout(() => {
          navigate('/')
        }, 3000);

        return;
      }

    } catch (error) {
      setMessage("Error al actualizar el usuario");
      setShowErrorMessage(true);
    }
  }

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    try {
      const response = await fetch(`http://localhost:4000/user/${decoded.idUser}`, {
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
      setUsername(data.username);

    } catch (error) {
      alert("Error al obtener el usuario");
    }
  }


  React.useEffect(() => {
    getUser();
  }
    , []);

  const handleSubmit = async (event) => {
    const data = {

      "idUser": decoded.idUser,
      "name": name,
      "lastname": lastname,
      "username": username,
      "password": password,
      "address": address,
      "phone": phone
    }
    event.preventDefault();
    updateCustomer(data)
  }

  const handleClose = (event) => {
    navigate('/')

  };

  return (
    <section style={{ backgroundColor: '#eee', marginTop: '30px' }}>
      <MDBContainer className="py-5">
        <MDBValidation className='row g-3'>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a>Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a>User</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Customer Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Nombre</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem feedback="Correcto">

                        <MDBInput

                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          name='fname'
                          id='validationCustom01'
                          required
                          label='Nombre'
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Apellido</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>

                        <MDBInput
                          name='fname'
                          id='validationCustom01'
                          required
                          label='Apellido'
                          value={lastname}
                          onChange={(event) => setLastname(event.target.value)}
                        />
                      </MDBValidationItem>
                    </MDBCol>

                  </MDBRow>

                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Username</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>

                        <MDBInput
                          name='username'
                          id='validationCustom01'
                          required
                          label='Username'
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Contraseña</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>

                        <MDBInput
                          name='password'
                          id='validationCustom01'
                          required
                          label='Contraseña'
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Correo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>
                        <MDBInput
                          type='email'
                          name='email'
                          id='validationCustom02'
                          required
                          label='Correo'
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Celular</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>
                        <MDBInput
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          type='number'
                          name='phone'
                          id='typeNumber'
                          required
                          label='Celular'
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Direccion</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>
                        <MDBInput
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          type='text'
                          name='address'
                          id='validationCustom04'
                          required
                          label='Direccion'
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBBtn color="primary" type="submit" onClick={handleSubmit} >
                        Actualizar
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol sm="3">
                      <MDBBtn color="danger" type="submit" onClick={handleClose}>
                        Cancelar
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBValidation>
      </MDBContainer>
      <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={() => setShowErrorMessage(false)}>
        <Alert severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={() => setShowSuccessMessage(false)}>
        <Alert severity="success">
          {message}
        </Alert>
      </Snackbar>

    </section>


  );
}

export default Userprofile;