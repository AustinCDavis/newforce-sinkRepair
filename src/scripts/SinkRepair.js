import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"



export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
        ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            <table class="requests">
            <tr class="tablehead">
            <th class="descriptionHead">Description</th>
            <th>Completed By</th>
            <th class="fillerCol"></th>
            </tr>
            ${Requests()}
        </section>
    `
}
