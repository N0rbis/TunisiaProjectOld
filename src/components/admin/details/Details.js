import React, { Component } from 'react'
import { Button, Container, Card } from 'semantic-ui-react'
import { confirmApproval } from "../../../services/fetch_API";
import './Details.css';
import localization from "../../../utils/localization";
import { filterSteps, getCurrentStep } from "../../../utils/helpers";

class Details extends Component {
    state = {
        stepPending: this.props.user.approval,
        usersid: []
    }

    getCurrentStepId(){
        let filteredSteps = filterSteps(this.props.user.process.steps)
        const currentStepIndex = getCurrentStep(filteredSteps)

        return filteredSteps[currentStepIndex].id
    }

    async handleConfirm() {
        const userId = this.props.user.id;
        const stepToConfirm = this.getCurrentStepId();
        const response = await confirmApproval(userId, stepToConfirm);

        if (response.status === 200) {
            if (this.props.lang === 'en') {
                alert("You have successfully confirmed user's request!");
            }
            else {
                alert("Vous avez confirmé la demande de l'utilisateur avec succès!");
            }

            const users = this.state.usersid
            users.push(userId)
            this.setState({ usersid: users })
            this.props.updatePendingStep(users)
        }
    }

    /**
     * Checks if the selected user need step confirmation approval to render the appropiate component
     * @param {Boolean} approval 
     * @param {Integer} currentUserId 
     * @param {Integer[]} approvedUsersId Array containing a list of the approved users in this session
     */
    displayConfirmStep(approval, currentUserId, approvedUsersId) {
        if (!(approval === false || (approvedUsersId.includes(currentUserId) && approvedUsersId.length !== 0))) {
            return (
                <Card.Content >
                    <div className="Details-pending1">
                        <h2>{localization.admin.details.Pending}</h2>
                    </div>
                    <div className="Details-pending2">
                        <Button onClick={this.handleConfirm.bind(this)}>{localization.admin.details.Confirm}</Button>
                    </div>
                </Card.Content>
            )
        }
    }

    render() {
        const approval = this.props.user.approval
        const currentUserId = this.props.user.id
        const approvedUsersId = this.state.usersid

        return (
            <Container>
                <Card.Group className='Details-card'>
                    <Card fluid color='blue'>
                        <Card.Content className="Details-name">
                            <h1>{this.props.user.name} {this.props.user.lastname}</h1>
                            <p>{this.props.user.city}, {this.props.user.country}</p>
                        </Card.Content>
                        <Card.Content >
                            <div>
                                <h2>{localization.admin.details.ContactInfo}</h2>
                            </div>
                            <div className="Details-email">
                                <p>Email: {this.props.user.email}</p>
                                <p>Mobile: {this.props.user.mobile}</p>
                                <p>{localization.admin.details.Phone}: {this.props.user.phone}</p>
                            </div>
                        </Card.Content>
                        {this.displayConfirmStep(approval, currentUserId, approvedUsersId)}
                    </Card>
                </Card.Group>
            </Container>
        )
    }
}

export default Details;