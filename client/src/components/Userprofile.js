import React from "react";
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

import usePageTitle from "./PageTitle";
//pagina para el perfil del usuario
function Userprofile() {

  usePageTitle('Perfil de usuario');
  if (localStorage.getItem("token") === null) {
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
        "x-access-token": "token",
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
          "x-access-token": "token",
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
    <section style={{ backgroundColor: '#eee', marginTop: '30px' }  }>
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
                      <MDBCardText>Contraseña</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem>
                        <MDBInput
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          type='text'
                          name='password'
                          id='validationCustom03'
                          required
                          label='Contraseña'
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
                      <MDBBtn color="primary" type="submit" onClick={handleSubmit}>
                        Guardar
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol sm="3">
                      <MDBBtn color="danger" type="submit">
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
    </section>

  );
}

export default Userprofile;