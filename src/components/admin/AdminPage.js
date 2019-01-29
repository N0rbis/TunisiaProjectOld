import React, { Component } from 'react';
import { Grid, Button, Container } from "semantic-ui-react";
import Details from "./details/Details";
import CandidatesTable from "./table/CandidatesTable";
import { updateNotes } from "../../services/fetch_API";
import localization from "../../utils/localization";
import "./AdminPage.css";

class AdminPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentUser: this.props.users !== undefined ? this.props.users[0] : undefined,
            stepPending: [],
            notes: {}
        }
    }


    setUserDetails(event, user){
        this.setState({currentUser:user})
    }

    updatePendingStep (usersId){
        this.setState({stepPending: usersId})
    }

    updateAdminNotes(userId,notes){
        let adminNotes = this.state.notes
        adminNotes[userId] = notes
        this.setState({notes:adminNotes})
    }

    async saveStatus(){
        if(Object.keys(this.state.notes).length < 1){
            if (this.props.lang === 'en'){
                alert("There are no changes to be saved")
            }
            else{
                alert("Il n'y a aucun changement à enregistrer")
            }
            return
        }

        let responses = []
        
        const saveButton = document.querySelector("#save_button");
        saveButton.style.background = "green"

        for (const [key, value] of Object.entries(this.state.notes)) {
            const response = await updateNotes({id:key,status:value});
            responses.push(response)
        }
        

        if(responses.length > 0){
            if(this.props.lang === 'en'){
                alert("Notes saved successfully")
                saveButton.style.background = "grey"
            }
            else {
                alert("Notes enregistrées avec succès")
                saveButton.style.background = "grey" 
            }
        }else{
            if (this.props.lang === 'en'){
                alert("Error while saving")
                saveButton.style.background = "red"
            }
            else{
                alert("Erreur lors de l'enregistrement")
                saveButton.style.background = "red"
            }
        }
    }

    render(){
        // Check if there is a logged user
        if(this.props.users === undefined || this.props.users.length === 0 ){
            return (<h1>{localization.admin.AdminPage.UserLogged}</h1>)
        }

        return(
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column stretched id="details_box">
                        <Details user={this.state.currentUser} updatePendingStep={this.updatePendingStep.bind(this)} lang={this.props.lang}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column stretched id="admin_table">
                        <CandidatesTable notes={this.updateAdminNotes.bind(this)} selectedUser={this.setUserDetails.bind(this)} users={this.props.users} updateSteps={this.state.stepPending}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Container>
                        <Button id="save_button" onClick={this.saveStatus.bind(this)}>{localization.admin.AdminPage.Save}</Button>
                    </Container>
                </Grid.Row>
            </Grid>
        )
    }
} 

export default AdminPage;