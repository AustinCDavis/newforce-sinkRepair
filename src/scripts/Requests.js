import { getRequests, deleteRequest } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")


const convertRequestToListElement = (request) => {
    return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
}

export const Requests = () => {
    const request = getRequests()
    
    
    let html = `
    <ul>
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