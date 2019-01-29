import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './StepButton.css';
import localization from "../../../utils/localization";

class StepButton extends Component {

    render() {
        let incriment = this.props.incrimentStep;

        return (
            <div id='nextStepButton'>
                <Button primary size="large" className="nextStepButton"
                    onClick={(e) => incriment(e)}>
                    {localization.user.StepButton.CompleteStep}
                </Button>
            </div>
        )
    }
}

export default StepButton;