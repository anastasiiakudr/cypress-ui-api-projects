it('JSON objects', () => {
    // Open the homepage
    cy.openHomePage()

    // Define different types of objects and arrays
    const simpleObject = { 'key': 'value', 'key2': 'value2' }
    const simpleArrayObject = ['one', 'two', 'three']
    const arrayOfObject = [{ 'key': 'value' }, { 'key1': 'value2' }, { 'key3': 'value3' }]
    const typesOfData = { 'string': 'this is string', 'number': 10 }
    
    // Complex object with nested arrays and objects
    const mix = {
        'FirstName': 'Anastasiia',
        'LastName': 'Kud',
        'Age': 30,
        'Students': [
            { 'firstName': 'Sara', 'lastName': 'Conor' },
            { 'firstName': 'Bruce', 'lastName': 'Willis' }
        ]
    }

    // Access and log various values
    console.log(simpleObject.key2)              // Logs 'value2'
    console.log(simpleObject['key2'])           // Logs 'value2'
    console.log(simpleArrayObject[1])           // Logs 'two'
    console.log(arrayOfObject[2].key3)          // Logs 'value3'
    console.log(mix.Students[1].lastName)       // Logs 'Willis'

    // Store a specific value in a variable
    const lastNameOfSecondStudent = mix.Students[1].lastName
})
