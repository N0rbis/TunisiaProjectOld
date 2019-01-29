import React, {Component} from 'react'
import { Table, Container } from 'semantic-ui-react'
import TableRow from './TableRow';
import { sortById } from "../../../utils/sort";
import './CandidatesTable.css'
import localization from "../../../utils/localization";

class CandidatesTable extends Component{
    render(){
        const users = sortById(this.props.users)
        return(
            <Container>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell id='col1'>{localization.admin.table.Name}</Table.HeaderCell>
                            <Table.HeaderCell>{localization.admin.table.StatusNote}</Table.HeaderCell>
                            <Table.HeaderCell>{localization.admin.table.Progress}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map(user =>{
                            return <TableRow updateNotes={this.props.notes} updateSteps={this.props.updateSteps} selectedUser={this.props.selectedUser} key={user.id} user={user}/>
                        })}
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}

export default CandidatesTable;