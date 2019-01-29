import React, { Component } from 'react';
import logo from '../../resources/logo.png';
import { Menu, Dropdown, Flag } from 'semantic-ui-react';
import TopMenuButton from './top_menu_button/TopMenuButton';
import localization from '../../utils/localization';

class TopMenu extends Component {
  constructor(props) {

    super(props)

    this.state = {
      activeItem: 'home'
    }
	
  }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      
      return (
        <Menu size='huge'>       
          <Menu.Item>
          <img  src={logo} className="App-logo" alt="logo" /> 
          </Menu.Item>
  
          <Menu.Menu position='right'>
            <Dropdown  style={{ color: "white"}} item text={localization.top_menu.Language}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => this.props.lang('en')}>
                  <Flag  name='gb'/>English
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.props.lang('fr')} >
                  <Flag name='fr'/>Français
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
  
            <Menu.Item>
              <TopMenuButton user={this.props.user} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    }
  }

  export default TopMenu;