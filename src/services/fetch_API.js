import Swagger from "swagger-client";
const API = '/v2/api-docs' //Call for the Swagger docs that contains the REST methodsP

/**
 * Base fetch call function to a predefined static API endpoint
 * This function should only be called within the services or this same file
 */
function getAPI(){
    return Swagger({ url: API })
}

/**
 * Methods to build the params formmating and call the API function should be in this section
 * or on it's own file
 */

async function signUpAdmin(data){
    const client = await getAPI()
    const api = client.apis

    const response = api["admin-controller"].insertAdminUsingPOST(data)

    return response
}

async function signUpUser(data){
    const client = await getAPI()
    const api = client.apis
    data["approval"] = false //DIRTY ASS SHIT
    const response = api["user-controller"].insertUserUsingPOST(data)

    return response
}

async function logIn(credentials){
    const client = await getAPI()
    const api = client.apis
    
    const response = api["login-controller"].loginMethodUsingPOST(credentials)

    return response
}

async function getAdminList(){
    const client = await getAPI()
    const api = client.apis
    
    const response = api["admin-controller"].returnAdminUsingGET()

    return response

}

async function requestForApproval(userId){
    const client = await getAPI()
    const api = client.apis
    const response = api["user-controller"].isApprovalUsingPUT({id: userId})
    return response
}

async function confirmApproval(userId, step){
    const client = await getAPI()
    const api = client.apis
    const response = api["admin-controller"].approvedStepUsingPUT({userId: userId, stepId: step})
    return response
}

async function updateNotes(data){
    const client = await getAPI()
    const api = client.apis

    const response = api["user-controller"].setStatusUsingPUT(data)
    return response
}

async function getProcessList(){
    //const client = await getAPI()
    //const api = client.apis
}

export {
    signUpAdmin,
    signUpUser,
    logIn,
    getAdminList,
    getProcessList,
    requestForApproval,
    confirmApproval,
    updateNotes
}