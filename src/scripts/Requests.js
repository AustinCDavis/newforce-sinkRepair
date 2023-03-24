import { getRequests } from "./dataAccess.js"

const convertRequestToListElement = (request) => {
    return `<li> ${request.description}</li>`
}

export const Requests = () => {
    const requests = getRequests()


    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `


    return html
}