/// <reference types="cypress" />

describe('First test suite', () => {

    it('first test', () => {
        // Visit the homepage
        cy.visit('/')
        // Click on "Forms" and then "Form Layouts" to navigate to the form page
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Select elements using different methods

        // By Tag name
        cy.get('input')

        // By ID
        cy.get('#inputEmail1')

        // By Class value
        cy.get('.input-full-width')

        // By Attribute name
        cy.get('[fullwidth]')

        // By Attribute and value
        cy.get('[placeholder="Email"]')

        // By exact Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // By two Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // By Tag, Attribute, ID, and Class
        cy.get('input[placeholder="Email"]#inputEmail1')

        // By Cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Theory: Different ways to locate elements in Cypress
        // get() - Find elements globally on the page by locator
        // find() - Find child elements inside a parent element by locator
        // contains() - Find elements by their text content and locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button')

        // Cypress chaining with parent-child relationships
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('saving subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Check specific labels within the card "Using the Grid"
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // Use alias to save an element and reuse it later
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // Use then() to work with the element as a regular JavaScript object
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text value', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Simple assertion
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // Save text content in a variable and check its value
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // Use invoke to extract text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // Check element class using invoke
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        // Type into an input field and check its value
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property => {
            expect(property).to.equal('test@test.com')
        })
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Check radio buttons' states and switch between them
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked') 
            cy.wrap(radioButtons).eq(1).check({force:true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked') 
            cy.wrap(radioButtons).eq(1).should('be.checked')
        })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // Uncheck and check checkboxes
        cy.get('[type="checkbox"]').uncheck({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).click({force:true})
    })

    it('Date picker', () => {

        // Function to select a specific date from today
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })
            return dateToAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(200)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    })

    it('Lists and dropdowns', () => {
        cy.visit('/')

        // Select an item from a dropdown menu and verify the selected value
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        // Iterate through dropdown options
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if (index < 3) {
                    cy.wrap(dropDown).click()
                }
            })
        })
    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Edit a table row by finding the row with specific text
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
        })

        // Add a new row and verify the entered data
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'John')
            cy.wrap(tableColumns).eq(3).should('contain', 'Smith')
        })

        // Validate rows based on age input
        const ages = [20, 30, 40, 200]

        cy.wrap(ages).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age === 200) {
                    cy.wrap(tableRow).should('contain', "No data found")
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        // Verify tooltip appears with correct text
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Confirm dialog box appears on delete and verify the message
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // Use stub to verify dialog message
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // Dismiss dialog box
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })

})
