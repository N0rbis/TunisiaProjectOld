import React, { Component } from 'react';
import { Form, Container, Divider, Button } from 'semantic-ui-react';
import './Process.css';
import Step from './Step';
import localization from "../../utils/localization";

class Process extends Component {
    ////////////////////////////////  CONSTRUCTOR ////////////////////////
    constructor(props) {
        super(props);
        global.ar = []
        this.state = {
            steps: [
                'step1'
            ],
            processname: '',
            description: '',
            formErrors: { processname: '', description: '' },
            processnameValid: false,
            descriptionValid: false,
            formValid: false
        }
    }

    ////////////////////////////////  FUNCTIONS ////////////////////////
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let processnameValid = this.state.processnameValid;
        let descriptionValid = this.state.descriptionValid;

        let process = document.querySelector('#processnamefield');
        let desc = document.querySelector('#descriptionfield');

        if (fieldName === 'processname') {
            //////////////////////////PROCESS/////////////////////////////////
            processnameValid = value.match(/^$/i);
            fieldValidationErrors.processname = !processnameValid ? '' : 'Please fill the name of the process';
            if (processnameValid !== null) {
                process.className = 'error_field'
                processnameValid = false;
            }
            else {
                process.className = 'correct_field'
                processnameValid = true;
            }
        }
        //////////////////////////DESCRIPTION/////////////////////////////////
        else if (fieldName === 'description') {
            descriptionValid = value.match(/^$/i);
            fieldValidationErrors.description = !descriptionValid ? '' : 'Please fill the description of the step';
            if (descriptionValid !== null) {
                desc.className = 'error_field'
                descriptionValid = false;
            }
            else {
                desc.className = 'correct_field'
                descriptionValid = true;
            }
        }

        this.setState({
            formErrors: fieldValidationErrors,
            processnameValid: processnameValid,
            descriptionValid: descriptionValid
        }, this.validateForm);
    }

    //function for validating the whole form
    validateForm() {
        this.setState({ formValid: this.state.processnameValid && this.state.descriptionValid });
    }

    addStep(text) {
        var arr = this.state.steps;
        arr.push(text);
        this.setState({ steps: arr })
    }

    removeStep(i) {
        var arr = this.state.steps;
        arr.splice(i, 1);
        this.setState({ steps: arr })
    }

    eachStep(text, i) {
        global.ar = i + 1;
        return (
            <div>
                <Step key={i} index={i} change={this.handleUserInput.bind(this)} validation={this.state.formErrors.description} addSt={this.addStep.bind(this)} rmvSt={this.removeStep.bind(this)} >
                    {text}
                </Step>
            </div>
        )
    }

    handleSubmit() {
        const apiData = {
            process: document.getElementById("processnamefield").value,
            Step: global.ar,
            description: document.getElementById("descriptionfield").value,


        };
        const json = JSON.stringify(apiData);
        console.log(json)

    }
    ////////////////////////////////  RENDER ////////////////////////
    render() {
        return (
            <Container>
                <Form>
                    <div id="form">
                        <div id="space">
                            <h1>{localization.process.Process.Process}</h1>
                            <Divider />
                            <label >{localization.process.Process.NameofProcess}</label>
                            <div className='processname'>
                                <input required id="processnamefield" type="text" name="processname" value={this.state.processname} onChange={this.handleUserInput} placeholder={localization.process.Process.TunisiaRec} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.formErrors.processname}</span>
                        </div>
                        <div id="space">
                            <div className='processCont'>
                                <h2>{localization.process.Process.Steps}</h2>
                            </div>
                            <div className="StepsBoard">
                                {this.state.steps.map(this.eachStep.bind(this))}
                            </div>
                        </div>
                        <div id="check-space">
                            <Button type='submit' disabled={!this.state.formValid} onClick={this.handleSubmit}>{localization.process.Process.Submit}</Button>
                        </div>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default Process;