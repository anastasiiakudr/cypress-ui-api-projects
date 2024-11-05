it('JSON objects', () => {
    cy.openHomePage()

    const simleObject = {'key': 'value', 'key2': 'value2'}

    const simpleArrayObject = ['one', 'two', 'tree']

    const arrayOfObject = [{'key': 'value'}, {'key1': 'value2'}, {'key3': 'value3'}]

    const typesOfDate = {'string': 'this is string', 'number': 10}

    const mix = {
        'FirstName': 'Anastasiia',
        'LastName': 'Kud',
        'Age': 30,
        'Students': [
            {
                'firstName': 'Sara',
                'lastName': 'Conor'
            },
            {
                'firstName': 'Bruce',
                'lastName': 'Willis'
            }
        ]
    }

    console.log(simleObject.key2)    
    console.log(simleObject['key2'])
    console.log(simpleArrayObject[1])
    console.log(arrayOfObject[2].key3)
    console.log(mix.Students[1].lastName)

    const lastNameOfSecondStudents = mix.Students[1].lastName

})