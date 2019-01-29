import { sortSteps } from "./sort";

/**
 * Returns a new array containing only steps (it filter all substeps)
 * @param {Steps[]} steps 
 */
function filterSteps(steps){
    return steps.filter(step => {return step.parentstep === 0})
}

/**
 * Get current index of the current step for a user.
 * Requires a previously filtered and step array containing ONLY full steps (no substeps)
 * @param {Steps[]} steps 
 */
function getCurrentStep(steps){
    const sorted = sortSteps(steps)
    let lastFinished = 0
    for (let i = 0; i < sorted.length; i++) {
        if(sorted[i].finish){
            lastFinished = i
        }
        else {
            return i;
        }
        
    }
    return lastFinished
}

export {
    filterSteps,
    getCurrentStep
}