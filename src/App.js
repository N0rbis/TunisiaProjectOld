import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { Grid } from 'semantic-ui-react'
import TopMenu from './components/top_menu/TopMenu';
import Footer from './components/footer/Footer';
import AdminPage from "./components/admin/AdminPage";
import UserPage from "./components/user/UserPage"
import Login from "./components/login/Login";
import SignupUser from "./components/sign_up/signup_user/SignupUser";
import SignupAdmin from "./components/sign_up/signup_admin/SignupAdmin"
import Process from "./components/process/Process";
import ReportProblem from "./components/report_problem/ReportProblem";
import localization from "./utils/localization";


class App extends Component {

  constructor(props) {
    super(props)
    
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en')
    } 

    this.state = {
      language: 'en',
      data: {}
    }
  }
  
  setLang(language){
    localStorage.setItem('language', language)
    this.setState({language: language })
  }

  login(data){
    this.setState({data:data})
  }

  render() {
  
    localization.setLanguage(localStorage.getItem('language'))
    
    return (
      <div className="App">
        <Grid>
          <Grid.Row id="header-row" columns={1}>
            <Grid.Column stretched>
              <TopMenu user={this.state.data} lang={this.setLang.bind(this)} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row id="main-row" columns={1}>
            <Switch>
              <Route exact path='/' render={() => <Login login={this.login.bind(this)} lang={this.state.language} />} />
              <Route exact path='/signup' render={() => <SignupUser lang={this.state.language} />} />
              <Route exact path='/signup_admin' render={() => <SignupAdmin lang={this.state.language}/>} />
              <Route path='/admin' render={() => <AdminPage users={this.state.data.userses} lang={this.state.language} />} />
              <Route path='/user' render={() => <UserPage user={this.state.data} />} />
              <Route path='/process' render={() => <Process />} />
              <Route path='/report_problem' render={() => <ReportProblem />} />
              <Route path='/*' render={() => <h1>{localization.App.Message}</h1>} />
            </Switch>
          </Grid.Row>

          <Grid.Row id="footer-row" columns={1}>
            <Grid.Column stretched>
              <Footer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

export default App;
