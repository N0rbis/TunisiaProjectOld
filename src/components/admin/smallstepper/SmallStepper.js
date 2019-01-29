import React,{Component} from 'react'
import { Icon } from 'semantic-ui-react'
import './SmallStepper.css'

class SmallStepper extends Component{

    render(){
        const steps_length = this.props.steps.length-1
        let pending = this.props.pending;
        const approval = this.props.approval
                  
        return(
            <div>
                {this.props.steps.map(function(step,index){
                    const isFinished = step.finish || (!pending && approval)
                    const isLast = index === steps_length

                    const idName = isFinished ? "Checked" : "Unchecked"
                    const iconClass = isFinished ? "SmallStepper-checked" : "SmallStepper-unchecked"
                    const iconName = isFinished ? "check circle" : "circle outline"
                    
                    // Prevents rendering all steps as finished after approval
                    if(isFinished && !step.finish){
                        pending = true;
                    }

                    return (
                        <div key={index} id={idName}>
                            <Icon className={iconClass} name={iconName} size='big' color='green' />
                            {isLast ? 
                                null:
                                <Icon className="Line" name='minus' size='big' color='green' />
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SmallStepper;