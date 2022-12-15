document.addEventListener('DOMContentLoaded', () => {
    let allDogs = []
    let tableBody = document.querySelector('#table-body')
    let dogForm = document.querySelector('#dog-form')
    let name = dogForm.querySelectorAll('input')[0]
    let breed = dogForm.querySelectorAll('input')[1]
    let sex = dogForm.querySelectorAll('input')[2]

    function renderDog(dog) {
        allDogs.push(dog)
        let tr = document.createElement('tr')
        tr.innerHTML = 
        `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="edit-button">Edit</button></td>
        `
        

        let editButton = tr.querySelector('#edit-button')
        editButton.addEventListener('click', function (e) {
            name.value = dog.name
            breed.value = dog.breed
            sex.value = dog.sex

            console.log(dogForm.querySelectorAll('input')[1])
            console.log(e)
            dogForm.addEventListener('submit', function (e) {
                e.preventDefault()
                dog.name = name.value
                dog.breed = breed.value
                dog.sex = sex.value
                updateDog(dog)
                console.log(e.target)
        })
            })
            


       


        tableBody.appendChild(tr)
        console.log(tableBody)
    }

    function updateDog(dog) {
        fetch(`http://localhost:3000/dogs/${dog.id}`, 
        {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(resp => resp.json())
        .then(dog => console.log(dog))
        
        
    }
   

    function getAllDogs() {
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(function (data) {
            data.forEach(dog => {
                renderDog(dog)
            });
        })
    }

    getAllDogs()

})