// Import page objects for various pages
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

// Test suite with Page Object Model for better structure
describe('Test with Page Objects', () => {

    // Open the homepage before each test
    beforeEach('open application', () => {
        cy.openHomePage()
    })

    // Test 1: Verify navigation to all pages
    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()  // Form Layouts
        navigateTo.datepickerPage()   // Datepicker
        navigateTo.toasterPage()      // Toaster
        navigateTo.smartTablePage()   // Smart Table
        navigateTo.tooltipPage()      // Tooltip
    })

    // Test 2: Submit forms, select dates, and interact with smart table
    it('should submit Inline and Basic Form and select tomorrow day in the calendar', () => {
        // Submit forms on Form Layouts page
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Anastasiia', 'test@test.com')
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('test@test.com', 'password')
        
        // Select dates on Datepicker page
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(5)        // Single date 5 days ahead
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)     // Date range 7 to 14 days ahead
        
        // Add, update, and delete records on Smart Table page
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastNAme('Anastasiia', 'Kud')
        onSmartTablePage.updateAgeByFirstName('Anastasiia', '80')
        onSmartTablePage.deleteRowByIndex(1)
    })
})

