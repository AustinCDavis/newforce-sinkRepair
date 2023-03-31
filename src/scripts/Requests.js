import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions, getState } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")
const requests = getRequests()

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = { 
                "requestId": +(requestId),
                "plumberId": +(plumberId),
                "date_completed": new Date(),
            }
            /*
            Invoke the function that performs the POST request
            to the `completions` resource for your API. Send the
            completion object as a parameter.
            */
            saveCompletion(completion)

            }

    }
)

const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    let state = getState()
    let completions = getCompletions(state)
 
const matchingCompletion = completions.find((completion) => {
    return request.id === completion.requestId
})

    if (!matchingCompletion){
        return `
        <tr>
        <td>
        <li>
        ${request.description}
        </td>
        <td style="text-align: center">
        <select class="plumbers" id="plumbers">
        <option value="${request.id}">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
        }
        </select></td>
        <td style="text-align: center">
        <button class="request__delete"
        id="request--${request.id}">
        Delete
        </button>
        </li>
        </td>
        </tr>
        `
    }
    
}

const convertCompletionToListElement = (requests) => {
    const plumbers = getPlumbers()
    let state = getState()
    let completions = getCompletions(state)

    for (const completion of completions) {
        if(requests.id === completion.id){
           
            const matchingPlumber = plumbers.find((plumber) => {
                return parseInt(completion.plumberId) === plumber.id
            })
                
            return `
            <tr class="completions">
            <td>
            <li>
            ${requests.description}
            </td>
            <td style="text-align: center">${matchingPlumber.name}</td>
            <td class="tablebuttons">
            <button class="request__delete"
            id="request--${completion.id}">
            Delete
            </button>
            </li>
            </td>
            </tr>
            `
        }
        
    }

}
export const Requests = () => {
    
    let state = getState()
    let completions = getCompletions(state)
    
    const request = getRequests()
    
    
    let html = `
    <ul class="col">
    ${
        request.map(convertRequestToListElement).join("")
    }
    ${
        request.map(convertCompletionToListElement).join("")
    }
    
    </ul>
    `
    
    
    return html
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

