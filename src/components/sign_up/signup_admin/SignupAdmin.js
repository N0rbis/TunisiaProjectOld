import React, { Component } from 'react';
import { Button, Checkbox, Form, Container, Divider, Grid } from 'semantic-ui-react';
import { signUpAdmin } from '../../../services/fetch_API';
import '../SignupStyling.css';
import localization from "../../../utils/localization";
import { formValidator } from "../../../utils/formValidator";


class SignUpFormAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
      phone: '',
      confirmpassword: '',
      tickchecked: false,
      formErrors: { email: '', password: '', firstname: '', lastname: '', mobile: '', phone: '', confirmpassword: '', tickchecked: false },
      emailValid: false,
      passwordValid: false,
      firstnameValid: false,
      lastnameValid: false,
      mobileValid: false,
      phoneValid: true,
      confirmpasswordValid: false,
      tickcheckedValid: false,
      formValid: false
    }

  }

  //takes the input in each field and call the validation function
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

  }
  handleTick = (e) => {
    const name = e.target.name;
    const value = !this.state.tickchecked;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  //function for validating fields


  validateField(fieldName, value) {
    const validation = formValidator(fieldName, value, this.state)
    this.setState(validation, this.validateForm);
  }

  //function for validating the whole form
  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.mobileValid && this.state.phoneValid && this.state.confirmpasswordValid && this.state.tickcheckedValid });
  }

  async handleSubmit() {
    const apiData = {
      name: document.getElementById('firstnamefield').value,
      lastname: document.getElementById('lastnamefield').value,
      mobile: document.getElementById('mobilefield').value,
      phone: document.getElementById('phonefield').value,
      email: document.getElementById('emailfield').value,
      password: document.getElementById('passfield').value
    }


    const response = await signUpAdmin(apiData)
    if (response.status === 200) {
      if (this.props.lang === 'en') {
        alert('You have successfully signed up ');
      }
      else {
        alert('Vous vous êtes inscrit avec succès ');
      }
      window.location.replace("/");
    }
    else if (response.status === 401) {
      if (this.props.lang === 'en') {
        alert('You are not authorized for this action');
      }
      else {
        alert("Vous n'êtes pas autorisé pour cette action");
      }
    }
    else if (response.status === 409) {
      if (this.props.lang === 'en') {
        alert('User already exists')
      }
      else {
        alert("L'utilisateur existe déjà")
      }
    }
  }


  numberValidation(event) {
    this.setState({ [event.target.name]: event.target.value.replace(/\D/, '') })

    if (event.target.value && event.target.value.match(/[0-9]/g)) {
      this.handleUserInput(event)
    }
  }

  //function to highlight the fields with the wrong input


  render() {
    return (
      <Grid>
        <Container>
          <Form>
            <div id="form">

              <div id="space">
                <h2>{localization.sign_up.signup_admin.PersonalInfo}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input required fluid maxLength='25' id='firstnamefield' type='text' name='firstname' value={this.state.firstname} onChange={this.handleUserInput} label={localization.sign_up.signup_admin.FirstName} placeholder='Joe' />
                  <span style={{ color: "red" }}>{this.state.formErrors.firstname}</span>
                  <Form.Input required fluid maxLength='25' id="lastnamefield" type="text" name="lastname" value={this.state.lastname} onChange={this.handleUserInput} label={localization.sign_up.signup_admin.LastName} placeholder='Doe' />
                  <span style={{ color: "red" }}>{this.state.formErrors.lastname}</span>
                </Form.Group>
              </div>

              <div id="space">
                <h2>{localization.sign_up.signup_admin.ContactInfo}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input icon='plus' iconPosition='left' required fluid id="mobilefield" maxLength='12' type="text" name="mobile" value={this.state.mobile} onChange={(e) => this.numberValidation(e)} label='Mobile' placeholder='336983107025' />
                  <span style={{ color: "red" }}>{this.state.formErrors.mobile}</span>
                  <Form.Input icon='plus' iconPosition='left' fluid id="phonefield" maxLength='12' type="text" name="phone" value={this.state.phone} onChange={(e) => this.numberValidation(e)} label={localization.sign_up.signup_admin.Phone} placeholder='332382026334' />
                  <span style={{ color: "red" }}>{this.state.formErrors.phone}</span>
                </Form.Group>
                <Form.Field id="test" required>
                  <label>Email</label>
                  <input type="email" id="emailfield" maxLength='35' required name="email" value={this.state.email} onChange={this.handleUserInput} placeholder='joedoe@mail.com' />
                  <span style={{ color: "red" }}>{this.state.formErrors.email}</span>
                  <br />
                </Form.Field>
              </div>

              <div id="space">
                <h2>{localization.sign_up.signup_admin.Password}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input required fluid maxLength='40' id="passfield" type="password" name="password" value={this.state.password} onChange={this.handleUserInput} label={localization.sign_up.signup_admin.Password} />
                  <span style={{ color: "red" }}>{this.state.formErrors.password}</span>

                  <Form.Input required fluid maxLength='40' id="confirmpasswordfield" type="password" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleUserInput} label={localization.sign_up.signup_admin.ConfPass} />
                  <span style={{ color: "red" }}>{this.state.formErrors.confirmpassword}</span>

                </Form.Group>
              </div>

              <div id="check-space">
                <Form.Field>
                  <Checkbox id="tickcheckedfield" name='tickchecked' onChange={this.handleTick} required label={localization.sign_up.signup_admin.Terms} />
                  <span style={{ color: "red" }}>{this.state.formErrors.tickchecked}</span>
                </Form.Field>

                <Button type='submit' disabled={!this.state.formValid} onClick={this.handleSubmit.bind(this)}>{localization.sign_up.signup_admin.Submit}</Button>
              </div>

            </div>
          </Form>
        </Container>
      </Grid>
    )
  }
}
export default SignUpFormAdmin;