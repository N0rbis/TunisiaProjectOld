import React, { Component } from 'react';
import { Grid } from "semantic-ui-react";
import Stepper from "./stepper/Stepper"
import Steps from "./steps/Steps";
import StepButton from "./StepButton/StepButton"
import { sortSteps, sortById } from "../../utils/sort";
import { requestForApproval } from "../../services/fetch_API";
import localization from "../../utils/localization";
import { filterSteps, getCurrentStep } from "../../utils/helpers";


class UserPage extends Component {
    state = {
        currentStep: 1,
        userId: this.props.user.id,
        showLastStep: true,
        pendingApproval: this.props.user.approval,
    }

    clickHandler(e, step) {
        e.preventDefault();
        this.setState({ currentStep: step, showLastStep: false })
    }

    componentDidMount(){
        if(this.props.user.process !== undefined){
            const filteredSteps = filterSteps(this.props.user.process.steps)
            this.setState({currentStep: filteredSteps[getCurrentStep(filteredSteps)] })
        }
    }

    //Added the API data and userID, it finds the correct ID so all is cool but what to do next? =l
    async incrimentStep(e) {
        e.preventDefault();
        this.setState({pendingApproval: true })

        const response = await requestForApproval(this.state.userId)
        if(response.status === 200){
            console.log("Success");
        }
    }

    displayButton() {
        const filteredSteps = filterSteps(this.props.user.process.steps)
        let isLastFinished = filteredSteps[filteredSteps.length-1].finish
        if (!this.props.user.approval && !isLastFinished) {
            return (
                <StepButton incrimentStep={this.incrimentStep.bind(this)}/>
            )
        }else{
            if(isLastFinished){
                return <div></div>
            }
            return (
                <div id='PendingMessage'><h1>{localization.user.UserPage.StepApproval}</h1></div>
            )
        }
    }

    render() {
        
        if (this.props.user.process === undefined) {
            return (<h1>{localization.user.UserPage.UserLogged}</h1>)
        }
              
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column stretched>
                        <Stepper
                            clickHandler={this.clickHandler.bind(this)}
                            steps={sortSteps(filterSteps(this.props.user.process.steps))}
                            pendingApproval={this.state.pendingApproval}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                    <Grid.Column stretched>
                        <Steps currentStep={this.state.currentStep} steps={sortById(this.props.user.process.steps)} showLastStep={this.state.showLastStep} />
                        {this.displayButton()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
export default UserPage;