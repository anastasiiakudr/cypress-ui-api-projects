import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()

    })

    it('should submit Inline and Basic Form and select tommorow day in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Anastasiia', 'test@test.com')
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('test@test.com', 'password')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(5)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastNAme('Anastasiia', 'Kud')
        onSmartTablePage.updateAgeByFirstName('Anastasiia', '80')
        onSmartTablePage.deleteRowByIndex(1)
        
    })

})