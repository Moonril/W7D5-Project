// footer con data
const printDateInFooter = function () {
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()


// url - api

const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5NzM4MzRiZjAwMTUwMDA2ZWYiLCJpYXQiOjE3NDI1NDQ1MzUsImV4cCI6MTc0Mzc1NDEzNX0.VjOHhUmp7-Ze7323I_6rWZAog6kMLeQmD9yt4wOeXmg"
const urlStrive = "https://striveschool-api.herokuapp.com/api/product/"

// id pagine
const URLparameters = new URLSearchParams(location.search)
const productId = URLparameters.get('id')


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

// alert pop up

const alert = document.getElementById('alert')

const popUp = function (color) {

    alert.classList.add('alert-' + color)

    alert.classList.remove('alert-coming')
    alert.classList.remove('alert-going')
    alert.classList.add('invisible')

    alert.classList.remove('invisible')
    alert.classList.add('alert-coming')
  
    setTimeout(function () {
      alert.classList.add('alert-going')

    }, 3000) // 3s
}

// if modifica

if(productId) {
    fetch(urlStrive + '/' + productId, {
        headers: {
            "Authorization": apiKey
        }
    })
    .then((response) => {
        if(response.ok){
            console.log('zucchina recuperata con successo!!', response)
            return response.json()
        } else {
            console.log(response)
            throw new Error('zucchina perduta :(')
        }
    })
    .then((data) => {
        
        nameInput.value = data.name
        brandInput.value = data.brand
        descriptionInput.value = data.description
        priceInput.value = data.price
        urlInput.value = data.imageUrl

        const create = document.getElementById('button-create')

        create.innerText = 'modifica'
        create.classList.add('btn-warning')

        const deleteBtn = document.getElementById('delete-button')
        deleteBtn.classList.remove('d-none')


    })
    .catch((error) => {
        console.log('errore nel recupero!', error)
    })
}

//form

const resetBtn = document.getElementById('button-reset')
resetBtn.addEventListener('click', function () {
    form.reset()

})


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

    let methodToUse
    let URLtoUse

    if (productId) {
        methodToUse = 'PUT'
        URLtoUse = urlStrive + '/' + productId

        /* popUp('warning')
        alert.textContent = 'Modifica effettuata correttamente!' */
    } else {
        methodToUse = 'POST'
        URLtoUse = urlStrive
        
        /* popUp('success')
        alert.textContent = 'Nuova verdura oblunga aggiunta!' */
    }


    // fetch PUT o POST

    fetch(URLtoUse, {
        method: methodToUse,
        body: JSON.stringify(product),  
        headers: {
        "Authorization": apiKey,
        'Content-type': 'application/json'
        },
    })
    .then((response) => {
        if(response.ok){
            console.log('zucchina salvata con successo!!')
            popUp('success')
            alert.textContent = 'Operazione effettuata con successo!'
            form.reset()
        } else {
            console.log(response)
            popUp('danger')
            alert.textContent = 'Si è verificato un errore probabilmente hai inserito una Zucchina già esistente :('
            throw new Error('zucchina perduta :(')
        }
    })
    .catch((error) => {
        console.log('errore nel salvataggio!', error)
    })

    
})

// delete button

const deleteProduct = function () {
    fetch(urlStrive + '/' + productId, {
      method: 'DELETE',
      headers: {
        "Authorization": apiKey
    }
    })
      .then((response) => {
        if (response.ok) {
          //alert('zucchina ELIMINATA :(')
            const deletePopUp = function () {
                popUp('danger')
                alert.textContent = 'Zucchina Eliminata :('
                setTimeout(function(){
                    //home
                      location.assign('./index.html')
                }, 2000)
            }
            deletePopUp()     

        } else {
          throw new Error('eliminazione zucchina NON andata a buon fine!')
        }
      })
      .catch((error) => {
        console.log('ERRORE NELLA CANCELLAZIONE', error)
      })
  }