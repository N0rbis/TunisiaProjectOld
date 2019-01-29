import React, { Component } from 'react';
import './SubStep.css';
import localization from "../../utils/localization";

class SubStep extends Component {
    render() {
        return (
            <div className='SubStepCont'>
                <label>{localization.process.Substep.SubStep} {this.props.index + 1}</label>
                <div className='substep'>
                    <input id="substepdet" placeholder={localization.process.Substep.GiveDetails} />
                </div>
            </div>
        )
    }
}

export default SubStep;