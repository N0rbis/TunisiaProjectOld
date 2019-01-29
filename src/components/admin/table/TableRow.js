import React, { Component } from "react";
import { Table, TextArea } from "semantic-ui-react";
import SmallStepper from "../smallstepper/SmallStepper";
import { sortSteps } from "../../../utils/sort";
import { filterSteps } from "../../../utils/helpers";
import './TableRow.css'
import localization from "../../../utils/localization";

class TableRow extends Component {

    updateNotes(event) {
        const notes = event.target.value
        this.props.updateNotes(this.props.user.id, notes)
    }

    render() {

        const user = this.props.user;
        const approval = this.props.user.approval;
        const stepPending = this.props.updateSteps;

        const doesNotNeedConfirm = approval === false || stepPending.includes(user.id)
        let confirmClassName = doesNotNeedConfirm ? "NoNeedConfirm" : "NeedConfirm"
        let isPending = doesNotNeedConfirm ? false : true


        return (
            <Table.Row onClick={(e) => this.props.selectedUser(e, user)}>
                <Table.Cell className={confirmClassName}>{user.name} {user.lastname}</Table.Cell>
                <Table.Cell >
                    <TextArea onChange={(e) => this.updateNotes(e)} className='notes' defaultValue={user.statusfield} placeholder={localization.admin.table.Notes} />
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <SmallStepper approval={approval} pending={isPending} steps={sortSteps(filterSteps(user.process.steps))} />
                </Table.Cell>
            </Table.Row>
        )

    }
}

export default TableRow;