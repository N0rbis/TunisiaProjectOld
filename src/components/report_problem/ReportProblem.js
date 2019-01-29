import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
//import { Form, Container, Button, Input, TextArea, } from 'semantic-ui-react';
import './ReportProblem.css';
import localization from '../../utils/localization';




class ReportProblem extends Component {
  
render(){
    return (
    <Message>
    <Message.Header>{localization.report_problem.Header}</Message.Header>
    <Message.List>
      <Message.Item>{localization.report_problem.Call}</Message.Item>
      <Message.Item>{localization.report_problem.Email}</Message.Item>
    </Message.List>
  </Message>
    )
}
}
    // handleSubmit() {
    //     const apiData = {
    //         firstname: document.getElementById("form-input-control-first-name").value,
    //         lastname: document.getElementById("form-input-control-last-name").value,
    //         subject: document.getElementById("form-input-control-subject").value,
    //         message: document.getElementById("form-textarea-control-Message").value
    //     };
    //     const json = JSON.stringify(apiData);
    //     console.log(json)
    // }
    // render() {
    //     return (
    //         <div>
    //             <Container>
    //                 <h1>Report a Problem</h1>
    //                 <div className='Form'>
    //                     <Form>
    //                         <Form.Group widths='equal'>
    //                             <Form.Field
    //                                 id='form-input-control-first-name'
    //                                 control={Input}
    //                                 label='First name:'
    //                                 placeholder='First name'
    //                             />
    //                             <Form.Field
    //                                 id='form-input-control-last-name'
    //                                 control={Input}
    //                                 label='Last name:'
    //                                 placeholder='Last name'
    //                             />
    //                         </Form.Group>
    //                         <Form.Field
    //                             id='form-input-control-subject'
    //                             control={Input}
    //                             label='Subject:'
    //                             placeholder='Subject'
    //                         />
    //                         <Form.Field
    //                             id='form-textarea-control-Message'
    //                             control={TextArea}
    //                             label='Message:'
    //                             placeholder='Message'
    //                         />
    //                         <Form.Field
    //                             id='form-button-control-submit'
    //                             control={Button}
    //                             content='Submit'
    //                             onClick={this.handleSubmit}
    //                         />
    //                     </Form>
    //                 </div>
    //             </Container>
    //         </div >
    //     )
    // }

export default ReportProblem;