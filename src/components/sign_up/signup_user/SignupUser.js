import React, { Component } from 'react';
import { Button, Checkbox, Form, Container, Divider, Dropdown } from 'semantic-ui-react';
//import { formValidator } from '../../../utils/formValidator';
import { signUpUser, getAdminList } from "../../../services/fetch_API";
import { Grid } from "semantic-ui-react";
import '../SignupStyling.css';
import localization from "../../../utils/localization";
import { formValidator } from '../../../utils/formValidator';

class SignUpFormUser extends Component {
  constructor(props) {
    super(props);
    global.Drop = '';
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
      phone: '',
      confirmpassword: '',
      city: '',
      province: '',
      country: '',
      postalcode: '',
      tickchecked: false,
      formErrors: { email: '', password: '', firstname: '', lastname: '', mobile: '', phone: '', confirmpassword: '', city: '', province: '', country: '', postalcode: '', tickchecked: false, },
      emailValid: false,
      passwordValid: false,
      firstnameValid: false,
      lastnameValid: false,
      mobileValid: false,
      phoneValid: true,
      confirmpasswordValid: false,
      cityValid: false,
      provinceValid: true,
      countryValid: false,
      postalcodeValid: false,
      tickcheckedValid: false,
      formValid: false,
      adminList: [],
      loading: true
    }

  }

  //takes the input in each field and call the validation function
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

  }

  //takes the input in checkbox of terms and agreement and call the validation function
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
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.mobileValid && this.state.phoneValid && this.state.confirmpasswordValid && this.state.cityValid && this.state.provinceValid && this.state.countryValid && this.state.tickcheckedValid && this.state.postalcodeValid });
  }

  dropSelection = (e, data) => {
    global.Drop = data.value;
  }

  async handleSubmit() {
    const apiData = {
      name: document.getElementById("firstnamefield").value,
      lastname: document.getElementById("lastnamefield").value,
      adminId: global.Drop,
      address: document.getElementById("addressfield").value,
      street1: document.getElementById("street1field").value,
      street2: document.getElementById("street2field").value,
      city: document.getElementById("cityfield").value,
      province: document.getElementById("provincefield").value,
      postalcode: document.getElementById("postalcodefield").value,
      country: document.getElementById("countryfield").value,
      mobile: document.getElementById("mobilefield").value,
      phone: document.getElementById("phonefield").value,
      email: document.getElementById("emailfield").value,
      password: document.getElementById("passfield").value,
      processId: 1
    };

    console.log(apiData)

    const response = await signUpUser(apiData)
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
    else if (response === 404) {
      if (this.props.lang === 'en') {
        alert('Page not Found')
      }
      else {
        alert('Page non trouvée')
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
    else {
      console.warn(response)
    }

  }

  async getAdminList() {
    const response = await getAdminList()
    this.setState({ adminList: response.body, loading: false })
  }

  parseAdminList() {
    let list = this.state.adminList.map(admin => {
      return { key: admin.id, text: admin.name, value: admin.id }
    })

    return list
  }

  componentWillMount() {
    this.getAdminList()
  }

  numberValidation(event) {
    this.setState({ [event.target.name]: event.target.value.replace(/\D/, '') })

    if (event.target.value && event.target.value.match(/[0-9]/g)) {
      this.handleUserInput(event)
    }
  }

  render() {
    return (
      <Grid>
        <Container>
          <Form>
            <div id="form">
              <div id="space">
                <h2>{localization.sign_up.signup_user.PersonalInfo}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input required fluid maxLength='25' id="firstnamefield" type="text" name="firstname" className='firstname' value={this.state.firstname} onChange={this.handleUserInput} label={localization.sign_up.signup_user.FirstName} placeholder='Joe' />
                  <span style={{ color: "red" }}>{this.state.formErrors.firstname}</span>
                  <Form.Input required fluid maxLength='25' id="lastnamefield" type="text" name="lastname" value={this.state.lastname} onChange={this.handleUserInput} label={localization.sign_up.signup_user.LastName} placeholder='Doe' />
                  <span style={{ color: "red" }}>{this.state.formErrors.lastname}</span>
                </Form.Group>
                <Form.Field required>
                  <label>{localization.sign_up.signup_user.Supervisor}</label>
                  <Dropdown id="supervisorfield" placeholder={localization.sign_up.signup_user.Supervisor} fluid selection options={this.parseAdminList()} onChange={this.dropSelection} />
                </Form.Field>
              </div>

              <div id="space">
                <h2>{localization.sign_up.signup_user.Address}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input required maxLength='35' id="addressfield" fluid label={localization.sign_up.signup_user.AddressName} placeholder='892 Rue Yves Kermen' />
                  <Form.Input fluid maxLength='35' id="street1field" label={localization.sign_up.signup_user.Street1} />
                  <Form.Input fluid maxLength='35' id="street2field" label={localization.sign_up.signup_user.Street2} />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input required maxLength='20' fluid id="cityfield" type="text" name="city" value={this.state.city} onChange={this.handleUserInput} label={localization.sign_up.signup_user.City} placeholder='Boulogne-Billancourt' />
                  <span style={{ color: "red" }}>{this.state.formErrors.city}</span>

                  <Form.Input fluid maxLength='35' id="provincefield" type="text" name="province" value={this.state.province} onChange={this.handleUserInput} label={localization.sign_up.signup_user.State} placeholder='Ile-de-France' />
                  <span style={{ color: "red" }}>{this.state.formErrors.province}</span>

                  <Form.Input required maxLength='5' fluid id="postalcodefield" type="text" name="postalcode" value={this.state.postalcode} onChange={(e) => this.numberValidation(e)} label={localization.sign_up.signup_user.Postal} placeholder='92100' />
                  <span style={{ color: "red" }}>{this.state.formErrors.postalcode}</span>

                </Form.Group>
                <Form.Field required>
                  <label>{localization.sign_up.signup_user.Country}</label>
                  <input type="text" id="countryfield" required maxLength='35' name="country" value={this.state.country} onChange={this.handleUserInput} placeholder='France' />
                  <span style={{ color: "red" }}>{this.state.formErrors.country}</span>
                </Form.Field>
              </div>

              <div id="space">
                <h2>{localization.sign_up.signup_user.ContactInfo}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input icon='plus' iconPosition='left' required fluid id="mobilefield" type="text" maxLength="12" name="mobile" value={this.state.mobile} onChange={e => this.numberValidation(e)} label='Mobile' placeholder='336983107025' />
                  <span style={{ color: "red" }}>{this.state.formErrors.mobile}</span>
                  <Form.Input icon='plus' iconPosition='left' fluid id="phonefield" type="text" maxLength="12" name="phone" value={this.state.phone} onChange={(e) => this.numberValidation(e)} label={localization.sign_up.signup_user.Phone} placeholder='332382026334' />
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
                <h2>{localization.sign_up.signup_user.Password}</h2>
                <Divider />
                <Form.Group widths='equal'>
                  <Form.Input required fluid maxLength='40' id="passfield" type="password" name="password" value={this.state.password} onChange={this.handleUserInput} label={localization.sign_up.signup_user.Password} />
                  <span style={{ color: "red" }}>{this.state.formErrors.password}</span>

                  <Form.Input required fluid maxLength='40' id="confirmpasswordfield" type="password" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleUserInput} label={localization.sign_up.signup_user.ConfPass} />
                  <span style={{ color: "red" }}>{this.state.formErrors.confirmpassword}</span>

                </Form.Group>
              </div>

              <div id="check-space">
                <Form.Field required>
                  <Checkbox id="tickcheckedfield" name='tickchecked' onChange={this.handleTick} required label={localization.sign_up.signup_user.Terms} />
                  <span style={{ color: "red" }}>{this.state.formErrors.tickchecked}</span>
                </Form.Field>

                <Button type='submit' disabled={!this.state.formValid} onClick={this.handleSubmit.bind(this)}>{localization.sign_up.signup_user.Submit}</Button>
              </div>

            </div>
          </Form>
        </Container>
      </Grid>
    )
  }
}

export default SignUpFormUser;