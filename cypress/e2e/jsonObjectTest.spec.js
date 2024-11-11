it('JSON objects', () => {
    // Open the homepage
    cy.openHomePage()

    // Define various JSON structures

    const simpleObject = {'key': 'value', 'key2': 'value2'}         // Simple object
    const simpleArrayObject = ['one', 'two', 'three']               // Array of strings
    const arrayOfObjects = [{'key': 'value'}, {'key1': 'value2'}, {'key3': 'value3'}]  // Array of objects
    const typesOfData = {'string': 'this is a string', 'number': 10}  // Mixed types
    const mix = {                                                    // Nested object
        'FirstName': 'Anastasiia',
        'LastName': 'Kud',
        'Age': 30,
        'Students': [
            { 'firstName': 'Sara', 'lastName': 'Conor' },
            { 'firstName': 'Bruce', 'lastName': 'Willis' }
        ]
    }

    // Access values in JSON structures

    console.log(simpleObject.key2)                // Access by key: 'value2'
    console.log(simpleObject['key2'])             // Access by key as string: 'value2'
    console.log(simpleArrayObject[1])             // Access array element: 'two'
    console.log(arrayOfObjects[2].key3)           // Access value in array of objects: 'value3'
    console.log(mix.Students[1].lastName)         // Access nested value: 'Willis'

    const lastNameOfSecondStudent = mix.Students[1].lastName  // Save nested value to variable
})




