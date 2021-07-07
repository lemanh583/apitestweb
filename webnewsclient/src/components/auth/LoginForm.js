import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from 'axios'


const LoginForm = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onChangeInput = e => {
        const {name, value } = e.target
        setUser({...user, [name]: value})
    }

    const onLoginSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/login', {...user})

            console.log(response.data)

        } catch (error) {
            console.log(error.response.data.error[0])
        }
    }
    // useEffect(()=> {
        // console.log(user)
    // },[user])

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <form onSubmit={onLoginSubmit} className="box">
                <h1>Login</h1>
                <p className="text-muted">
                  {" "}
                  Please enter your login and password!
                </p>{" "}
                <input type="text" name="email" placeholder="Username" onChange={onChangeInput}/>{" "}
                <input type="password" name="password"  onChange={onChangeInput}  placeholder="Password" />{" "}
                <a className="forgot text-muted" href="#">
                  Forgot password?
                </a>{" "}
                <input type="submit"  defaultValue="Login" href="#" />
                <Link to='/register'><button className="btn btn-success">Register</button></Link>
                <div className="col-md-12">
                  <ul className="social-network social-circle">
                    <li>
                      <a href="#" className="icoFacebook" title="Facebook">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icoTwitter" title="Twitter">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icoGoogle" title="Google +">
                        <i className="fab fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
