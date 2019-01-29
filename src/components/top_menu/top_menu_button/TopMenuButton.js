import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import localization from '../../../utils/localization';

class TopMenuButton extends Component {


    path() {

        if (this.props.user.id >= 0) {
            return <Button primary style={{ width: "100%" }} href='/' >{localization.top_menu.Logout}</Button>
        }
        else if (window.location.pathname === '/') {
            return <Button primary style={{ width: "100%" }} href='/signup'>{localization.top_menu.Signup}</Button>
        }
        else if (window.location.pathname === '/signup' || window.location.pathname === '/signup_admin') {
            return <Button primary style={{ width: "100%" }} href='/'>{localization.top_menu.Login}</Button>
        }
        else {
            return <Button primary style={{ width: "100%" }} href='/'>{localization.top_menu.Login}</Button>
        }
    }
    
    render() { return (this.path()) }
}

export default TopMenuButton;