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
                "date_created": new Date(),
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
 
    if (request.id != completions.requestId){
        return `
        <tr>
        <td>
        <li>
        ${request.description}
        </td>
        <td class="tablebuttons">
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
        }
        </select>
    
        <button class="request__delete"
        id="request--${request.id}">
        Delete
        </button>
        </li>
        </td>
        </tr>
        `
    } else {
        return `
        <tr class="completions">
        <td>
        <li>
        ${request.description}
        </td>
        <td class="tablebuttons">

        <button class="request__delete"
        id="request--${completions.id}">
        Delete
        </button>
        </li>
        </td>
        </tr>
        `
    }
    }

export const Requests = () => {
    
    let state = getState()
    console.log(state)
    let completions = getCompletions(state)
    console.log(completions)
    
    const request = getRequests()
    
    
    let html = `
    <ul class="col">
    ${
        request.map(convertRequestToListElement).join("")
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

