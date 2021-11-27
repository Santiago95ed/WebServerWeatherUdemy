console.log('file loaded')
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    if (location === undefined || location === '') {
        messageOne.textContent = 'You must enter a location to continue'
    }
    else {
        console.log(location)

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messagetwo.textContent = ""
                    messagetwo.textContent = ""
                }
                else {
                    messagetwo.textContent = data.location + " || " + data.forecast
                    messageOne.textContent = ""
                }
            })
        })
    }

})

