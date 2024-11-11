import { last } from "rxjs-compat/operator/last"

export class SmartTablePage {

    // Update the age for a row identified by the first name
    updateAgeByFirstName(name, age) {
        cy.get('tbody').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()                // Click the edit button
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age) // Enter the new age
            cy.wrap(tableRow).find('.nb-checkmark').click()           // Confirm the update
            cy.wrap(tableRow).find('td').eq(6).should('contain', age) // Verify the updated age
        })
    }   

    // Add a new record with specified first and last names
    addNewRecordWithFirstAndLastNAme(firstName, lastName) {
        cy.get('thead').find('.nb-plus').click()                      // Click the add button
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)  // Enter first name
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)    // Enter last name
            cy.wrap(tableRow).find('.nb-checkmark').click()           // Confirm the addition
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', firstName)  // Verify first name
            cy.wrap(tableColumns).eq(3).should('contain', lastName)   // Verify last name
        })
    }

    // Delete a row by index, confirming the deletion dialog
    deleteRowByIndex(index) {
        const stub = cy.stub()
        cy.on('window:confirm', stub)                                 // Stub for confirmation dialog
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

// Export an instance of SmartTablePage for use in tests
export const onSmartTablePage = new SmartTablePage()
