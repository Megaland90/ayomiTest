import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import Token from './Token'

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email : "",
            password :""
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.login = this.login.bind(this)
    }


    handleLogin(e)
    {
        this.setState({email: e.target.value})
    }

    handlePassword(e)
    {
        this.setState({password: e.target.value})
    }


    login(e)
    {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/app/login", {
            method :'POST',
            headers : {
                'Content-Type' : 'aplication/json'
            },
            body : JSON.stringify(this.state)
        }).then(response => response.json().then(data => {
            if (data.statut === "OK")
            {
                Token.set(data.token);
                window.location.pathname="/profil"
            }
        }))
    }

    render() {
        return (
            <div className="text-center">
                <Form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Connexion</h1>
                        <Label htmlFor="inputEmail" className="sr-only">Email</Label>
                        <Input id="inputEmail" className="form-control" placeholder="Email" required=""
                               autoFocus="" type="email" onChange={this.handleLogin}/>
                        <Label htmlFor="inputPassword" className="sr-only">Password</Label>
                        <Input id="inputPassword" className="form-control" placeholder="Password" required=""
                               type="password" onChange={this.handlePassword}/>
                        <Button onClick={this.login} className="btn btn-lg btn-danger btn-block" type="submit">Login</Button>
                </Form>
            </div>
        );
    }
}

export default Login;
