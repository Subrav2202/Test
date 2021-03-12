import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import login from "../Assets/login.svg";
import Axios from "axios";

function Login() {
  const history = useHistory();

  const [state, setstate] = useState();
  const toggler = () => {
    setstate(!state);
  };

  let [data, setdata] = useState({
    email: "",
    password: "",
    firstname: "",
    confirm_password: "",
    lastname: "",
  });
  const [error, seterror] = useState({
    emailerror: "",
    passworderror: "",
    confirmpassworderror: "",
  });

  const changeHandler = (e) => {
    const value = e.target.value;
    setdata({ ...data, [e.target.name]: value }); //dynamically adding new key value pair to the existing object.//
  };

  const Register = (e) => {
    e.preventDefault();

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        data.email
      )
    ) {
      if (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password)) {
        if (data.password === data.confirm_password) {
          console.log(data);
          let config = {
            method: "post",
            url: "http://localhost:9000/app/api/register",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
          };
          Axios(config)
            .then((res) => {
              alert(res.data.token);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          seterror({
            ...error,
            ["confirmpassworderror"]: "****password does not match****",
          });
        }
      } else {
        seterror({ ...error, ["passworderror"]: "*****Weak password****" });
      }
    } else {
      seterror({ ...error, ["emailerror"]: "****invalid email*****" });
    }
  };

  const Login = (e) => {
    e.preventDefault();
    let { firstname, lastname, confirm_password, ...newobj } = data;
    let config = {
      method: "post",
      url: "http://localhost:9000/app/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newobj),
    };
    Axios(config)
      .then((res) => {
        alert(res.data.token);
        localStorage.setItem("token", res.data.token);
        history.push("/Dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid className="screenwrapper">
      <Row className="d-flex align-items-center" style={{ height: "100%" }}>
        <Col md={{ span: 6, offset: 3 }}>
          {state ? (
            <Form className="formwrapper" onSubmit={Login}>
              <div className="d-flex justify-content-center">
                <img
                  src={login}
                  alt="img"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter email"
                  onChange={changeHandler}
                />
              </Form.Group>
              <p style={{ color: "#ff0303" }}>{error.emailerror}</p>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  onChange={changeHandler}
                />
              </Form.Group>
              <p style={{ color: "#ff0303" }}>{error.passworderror}</p>
              <Form.Group>
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button className="m-5" variant="primary" type="submit">
                  Login
                </Button>
                <Button className="m-5" variant="primary" onClick={toggler}>
                  Register
                </Button>
              </div>
            </Form>
          ) : (
            <Form className="formwrapper" onSubmit={Register}>
              <div className="d-flex justify-content-center">
                <img
                  src={login}
                  alt="img"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter email"
                  onChange={changeHandler}
                />
              </Form.Group>
              <p style={{ color: "#ff0303" }}>{error.emailerror}</p>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={changeHandler}
                />
              </Form.Group>
              <p style={{ color: "#ff0303" }}>{error.passworderror}</p>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="confirm password"
                  value={data["confirm password"]}
                  onChange={changeHandler}
                />
              </Form.Group>
              <p style={{ color: "#ff0303" }}>{error.confirmpassworderror}</p>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={data.firstname}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={data.lastname}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button className="m-5" variant="primary" type="submit">
                  Register
                </Button>
                <Button className="m-5" variant="primary" onClick={toggler}>
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
