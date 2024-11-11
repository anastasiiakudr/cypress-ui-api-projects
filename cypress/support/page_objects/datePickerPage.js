// Helper function to select a date a specified number of days from today
function selectDayFromCurrent(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

    // Navigate to the correct month and year, then select the day
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

// Page Object for Datepicker interactions
export class DatepickerPage {

    // Select a single date in the common datepicker
    selectCommonDatepickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateToAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
        })
    }

    // Select a date range in the datepicker with range
    selectDatepickerWithRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        })
    }
}

// Export an instance of DatepickerPage for tests
export const onDatePickerPage = new DatepickerPage()
