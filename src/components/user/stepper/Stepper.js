import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Stepper.css';

class UserStepper extends Component {

    render() {
        const steps_length = this.props.steps.length - 1;
        let handler = this.props.clickHandler;
        let pendingApproval = this.props.pendingApproval;

        return (
            <div id="stepper-container">
                {this.props.steps.map(function (step, index) {
                    const isFinished = step.finish
                    const isLast = index === steps_length

                    const containerClass = isFinished ? "completed" : "incompleted"
                    let stepperClass = isFinished ? "completecontainer" : "incompletecontainer"

                    if (pendingApproval === true && !step.finish) {
                        stepperClass = "pendingcontainer"
                        pendingApproval = false;
                    }
                    return (
                        <div key={index} className={containerClass}>
                            <StepperFill
                                index={index + 1}
                                click={handler}
                                step={step}
                                class_name={stepperClass}
                            />
                            {isLast ? null : <Circle isFinished={isFinished} />}
                        </div>
                    )
                })}
            </div>
        )
    }
}

//--------------------Functional components------------------------------------------------

//Functional component to decide wether the stepper should be filled or left blank (Complete or Incomplete)
const StepperFill = (props) => {
    return (
        <div onClick={(e) => props.click(e, props.step)} className={props.class_name}>
            <p>{props.step.name}</p>
        </div>
    )
}

const Circle = (props) => {
    return (
        <div className={props.isFinished ? "circle_completed" : "circle_incompleted"}>
            {props.isFinished ?
                <Icon.Group size='big'>
                    <Icon size='small' name='checkmark' color='green' />
                </Icon.Group>
                :
                null
            }
        </div>
    )
}

export default UserStepper;