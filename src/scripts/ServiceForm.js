

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