// Helper function to expand a group menu item if it’s collapsed
function selectGroupMenuItem(groupName) {
    cy.contains('a', groupName).then(menu => {
        // Check if the menu is collapsed by inspecting the 'data-name' attribute
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) { // If menu is collapsed, expand it
                cy.wrap(menu).click()
            }
        })
    })
}

// Navigation Page Object with methods to navigate to various pages
export class NavigationPage {

    // Navigate to the Form Layouts page
    formLayoutsPage() {
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    // Navigate to the Datepicker page
    datepickerPage() {
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    // Navigate to the Toaster page
    toasterPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    // Navigate to the Smart Table page
    smartTablePage() {
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    // Navigate to the Tooltip page
    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

// Export an instance of NavigationPage for use in tests
export const navigateTo = new NavigationPage()
