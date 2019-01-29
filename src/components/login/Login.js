import React, { Component } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
//import { formValidator } from '../../utils/formValidator'
import { logIn } from "../../services/fetch_API";
import { Redirect } from "react-router-dom";
import localization from '../../utils/localization';
import { formValidator } from "../../utils/formValidator";
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      logged: false,
      route: ''
    }
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    const validation = formValidator(fieldName, value, this.state)
    this.setState(validation, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  async getLogin(credentials) {
    const response = await logIn(credentials);

    if (response.status === 200) {
      this.props.login(response.body)
      if ("admin" in response.body) {
        this.setState({ logged: true, route: "/user" })
      } else {
        this.setState({ logged: true, route: "/admin" })
      }
    }
    else if (response.status === 401) {
      alert('You are not authorized for this action');
    }
    else if (response === 404) {
      alert('Page not Found')
    } else if (response.status === 409) {
      alert('User already exists')
    } else {
      console.warn(response)
      
    }
  }

  login() {
    const apiData = {
      email: document.getElementById("emailfield").value,
      password: document.getElementById("passfield").value
    };
    this.getLogin(apiData)
  }

  render() {
    if (this.state.logged) {
      return <Redirect to={this.state.route} />
    }
    return (
      <Container id="login-container">
        <Form>
          <Form.Group>
            <Form.Input name='email'
              id="emailfield"
              fluid label='Email'
              value={this.state.email}
              onChange={(event) => this.handleUserInput(event)}
              placeholder='example@akka.eu'
              required />
          </Form.Group>
          <span>{this.state.formErrors.email}</span><br/>
          <Form.Group>
            <Form.Input name='password'
              id="passfield"
              type="password"
              fluid label={localization.login.Password}
              value={this.state.password}
              onChange={(event) => this.handleUserInput(event)}
              placeholder={localization.login.Password}
              required />
          </Form.Group>
          <span>{this.state.formErrors.password}</span><br/>
          <Button primary type='submit' disabled={!this.state.formValid} onClick={this.login.bind(this)} >{localization.login.LoginButton}</Button>
        </Form>
      </Container>
    );
  }
}
export default Login;



