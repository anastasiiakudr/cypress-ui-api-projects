export class FormLayoutsPage {

    // Method to fill and submit the Inline Form with a name and email
    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)             // Enter name
            cy.wrap(form).find('[placeholder="Email"]').type(email)               // Enter email
            cy.wrap(form).find('[type="checkbox"]').check({ force: true })        // Check the checkbox
            cy.wrap(form).submit()                                                // Submit the form
        })
    }

    // Method to fill and submit the Basic Form with an email and password
    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)               // Enter email
            cy.wrap(form).find('[placeholder="Password"]').type(password)         // Enter password
            cy.wrap(form).find('[type="checkbox"]').check({ force: true })        // Check the checkbox
            cy.wrap(form).submit()                                                // Submit the form
        })
    }
}

// Export an instance of FormLayoutsPage for use in tests
export const onFormLayoutsPage = new FormLayoutsPage()
