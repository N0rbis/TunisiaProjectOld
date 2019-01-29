import React, { Component } from 'react';
import { Container, Table, List } from "semantic-ui-react";
import './Steps.css';

class Steps extends Component {
  render() {
    if(this.props.currentStep === 1){
      return null
    }
    const step = this.props.currentStep
    const stepId = step.name.split(" ")[1];


    return (
      <div id='table-container'>
        <Container>
          <Table celled>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{step.content}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <List>
                    {this.props.steps.map(function (currentMapStep, index) {
                      // eslint-disable-next-line
                      if (currentMapStep.parentstep == stepId) {
                        return (
                          <List.Item key={index} icon='caret right' content={currentMapStep.content} />
                        )
                      }
                      return null
                    })}
                  </List>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    )
  }
}

export default Steps;