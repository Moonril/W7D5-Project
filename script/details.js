// footer con data
const printDateInFooter = function () {
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

// recuperare id immagine
const URLparameters = new URLSearchParams(location.search)

const productId = URLparameters.get('id')
console.log('id', productId)


// url - api

const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5NzM4MzRiZjAwMTUwMDA2ZWYiLCJpYXQiOjE3NDI1NDQ1MzUsImV4cCI6MTc0Mzc1NDEzNX0.VjOHhUmp7-Ze7323I_6rWZAog6kMLeQmD9yt4wOeXmg"
const urlStrive = "https://striveschool-api.herokuapp.com/api/product/"




const getVegetableDetails = function() {

    fetch(urlStrive + '/' + productId, {
        headers: {
            "Authorization": apiKey
        }
    })
    .then((response) => {
        if(response.ok){
            console.log('zucchina recuperata con successo!!', response)
            
        } else {
            console.log(response)
            throw new Error('zucchina perduta :(')
        }
    })
    .then((data) => {
        console.log('data', data) //data is undefined
        //dati card
        const title  = document.getElementById('name')
        const brand = document.getElementById('brand')
        const description  = document.getElementById('description')
        const price  = document.getElementById('price')
        const imgUrl  = document.getElementById('img-url')

        title.innerText = data.name
        brand.innerText = data.brand
        description.innerText = data.description
        price.innerText = data.price
        imgUrl.value = data.imageUrl

        
    })
    .catch((error) => {
        console.log('errore nel recupero zucchina!', error)
    })
}

getVegetableDetails()