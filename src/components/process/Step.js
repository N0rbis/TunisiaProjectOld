import React, { Component } from 'react';
import { Form, TextArea, Icon, Button, Popup } from 'semantic-ui-react';
import './Step.css';
import SubStep from './SubStep';
import localization from "../../utils/localization";

class Step extends Component {
    ////////////////////////////////  CONSTRUCTOR ////////////////////////
    constructor(props) {
        super(props);
        this.state = {
            substeps: [
                'substep1'
            ]
        }


    }
    ////////////////////////////////  FUNCTIONS ////////////////////////
    addSubstep(text) {
        var arr = this.state.substeps;
        arr.push(text);
        this.setState({ substeps: arr })
    }

    removeSubstep(i) {
        var arr = this.state.substeps;
        arr.splice(i, 1);
        this.setState({ substeps: arr })
    }

    eachSubstep(text, i) {
        return (
            <div>
                <SubStep key={i} index={i} >
                    {text}
                </SubStep>
                <div className='but-substep'>
                    <Button.Group size='mini'>
                        <Popup trigger={<Button positive className='add' onClick={(e) => this.addSubstep("Give Details")}><Icon name='plus' color='white' /></Button>}
                            content={localization.process.Step.AddSubstep}
                            basic
                        />
                        <Button.Or />
                        <Popup trigger={<Button negative className='remove' onClick={(e) => this.removeSubstep(this.props.index)}><Icon name='minus' color='white' /></Button>}
                            content={localization.process.Step.RemoveSubstep}
                            basic
                        />
                    </Button.Group>
                </div>
            </div>
        )
    }
    ////////////////////////////////  RENDER ////////////////////////
    render() {
        return (
            <div className='StepContainer'>
                <div className='insidecont'>
                    <div className='Stepandbutton'>
                        <h2>{localization.process.Step.Step} {this.props.index + 1}</h2>
                        <div className='but-step'>
                            <Button.Group size='mini'>
                                <Popup trigger={<Button positive className='add' onClick={(e) => this.props.addSt("Give Details")}><Icon name='plus' color='white' /></Button>}
                                    content={localization.process.Step.AddStep}
                                    basic
                                />
                                <Button.Or />
                                <Popup trigger={<Button negative className='remove' onClick={(e) => this.props.rmvSt(this.props.index)}><Icon name='minus' color='white' /></Button>}
                                    content={localization.process.Step.RemoveStep}
                                    basic
                                />
                            </Button.Group>
                        </div>
                    </div>

                    <label>{localization.process.Step.Description}</label>
                    <div className='stepname'>
                        <Form.Field required id="descriptionfield" type="text" name="description" value={this.state.description} onChange={(e) => this.props.change(e)} control={TextArea} placeholder={localization.process.Step.Tellus} />
                    </div>
                    <span style={{ color: "red" }}>{this.props.validation}</span>
                    <div className="SubstepsBoard">
                        {this.state.substeps.map(this.eachSubstep.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Step;