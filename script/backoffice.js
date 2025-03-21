// footer con data
const printDateInFooter = function () {
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()


// url - api

const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5NzM4MzRiZjAwMTUwMDA2ZWYiLCJpYXQiOjE3NDI1NDQ1MzUsImV4cCI6MTc0Mzc1NDEzNX0.VjOHhUmp7-Ze7323I_6rWZAog6kMLeQmD9yt4wOeXmg"
const urlStrive = "https://striveschool-api.herokuapp.com/api/product/"

// creare oggetto per ogni prodotto //name - brand -description -price -img

class Product {
    constructor(_name, _brand, _imageUrl, _description, _price) {
        this.name = _name
        this.brand = _brand
        this.imageUrl = _imageUrl
        this.description = _description
        this.price = _price
    }
}

// form

const nameInput = document.getElementById('name')
const brandInput = document.getElementById('brand')
const urlInput = document.getElementById('url')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')

const form = document.getElementById('product-form')


form.addEventListener('submit', function(e) {
    e.preventDefault()

    const product = new Product(
        nameInput.value,
        brandInput.value,
        urlInput.value,
        descriptionInput.value,
        priceInput.value
    )

    console.log('nuovo prodotto', product)


    //aggiungere if per decidere se PUT o POST



    // fetch PUT o POST

    fetch(urlStrive, {
        method: 'POST',
        body: JSON.stringify(product),  
        headers: {
        "Authorization": apiKey,
        'Content-type': 'application/json'
        },
    })
    .then((response) => {
        if(response.ok){
            console.log('zucchina salvata con successo!!')
            form.reset()
        } else {
            console.log(response)
            throw new Error('zucchina perduta :(')
        }
    })
    .catch((error) => {
        console.log('errore nel salvataggio!', error)
    })

    
})