const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    const sortedRequests = applicationState.requests.map(request => ({...request})).sort((a, b) => a.neededBy - b.neededBy)

    const requests = sortedRequests.map(request => ({...request}))
    return requests.map(request => ({...request}))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const getState = () => {
    return ({...applicationState})
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
            )
        }
        
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
            applicationState.completions = data
            }
            )
        }

export const saveCompletion = (userServiceCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceCompletion)
    }


    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


export const getCompletions = (state) => {

    const sortedCompletions = state.completions.map(completion => ({...completion})).sort((a, b) => a.date_created - b.date_created)

    const requests = state.requests.map(request => ({...request}))
    
   const completedRequests = sortedCompletions.filter(singleCompletion => {
    return requests.some(singleRequest => singleRequest.id === singleCompletion.requestId) 
}) 
  return completedRequests
}
