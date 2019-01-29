function sortById(data){
    return data.sort(compareID)
}

function sortSteps(steps){
    return steps.sort(compareSteps)
}

/**
 * Sort an array of objects by ID
 * @param {Object} a 
 * @param {Object} b 
 */
function compareID(a,b){
    if(a.id < b.id){
        return -1
    }else if (a.id > b.id){
        return 1
    }else{
        return 0
    }
}

/**
 * Compare two {Steps} by the Step.name field with format "Step N"
 * @param {Step} a 
 * @param {Step} b 
 */
function compareSteps(a,b){

    const numberA = a.name.split(" ")[1]
    const numberB = b.name.split(" ")[1]
    
    if(numberA < numberB){
        return -1
    }else if (numberA > numberB){
        return 1
    }else{
        return 0
    }
}

export{
    sortById,
    sortSteps
}