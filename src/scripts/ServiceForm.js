import { sendRequest } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")


export const ServiceForm = () => {
    let html = `
    <div class="field">
            <div><label class="label" for="serviceDescription">Description</label></div>
            <input type="text" name="serviceDescription" class="input" />
            </div>
        <div class="field">
            <div><label class="label" for="serviceAddress">Address</label></div>
            <input type="text" name="serviceAddress" class="input" />
            </div>
            <div class="field">
            <div><label class="label" for="serviceBudget">Budget</label></div>
            <input type="number" name="serviceBudget" class="input" />
            </div>
            <div class="field">
            <div><label class="label" for="serviceDate">Date needed</label></div>
            <input type="date" name="serviceDate" class="input" />
            </div>
            
            <button class="button" id="submitRequest">Submit Request</button>
            `
            
            return html
        }
        
        mainContainer.addEventListener("click", clickEvent => {
            if (clickEvent.target.id === "submitRequest") {
                // Get what the user typed into the form fields
                const userDescription = document.querySelector("input[name='serviceDescription']").value
                const userAddress = document.querySelector("input[name='serviceAddress']").value
                const userBudget = document.querySelector("input[name='serviceBudget']").value
                const userDate = document.querySelector("input[name='serviceDate']").value
                // Make an object out of the user input
                const dataToSendToAPI = {
                    description: userDescription,
                    address: userAddress,
                    budget: userBudget,
                    neededBy: userDate
                }
        
                // Send the data to the API for permanent storage
                sendRequest(dataToSendToAPI)

                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        })