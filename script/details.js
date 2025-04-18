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
const urlStrive = "https://striveschool-api.herokuapp.com/api/product/" // pure io ho la doppia '/' però non mi ha mai dato problemi...




const getVegetableDetails = function() {

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
        console.log('data', data)
        //dati card
        const name = document.getElementById('name')
        const brand = document.getElementById('brand')
        const description = document.getElementById('description')
        const price = document.getElementById('price')
        const imgUrl = document.getElementById('img-url')

        name.innerText = data.name
        brand.innerText = data.brand
        description.innerText = data.description
        price.innerText = data.price + '€'
        imgUrl.src = data.imageUrl  // .src!!!

        console.log('image url', data.imageUrl) 

        
    })
    .catch((error) => {
        console.log('errore nel recupero zucchina!', error)
    })
}

// modifica, sposta all'altra pagina

const editProduct = function () {
    location.assign('./backoffice.html?id=' + productId)
  }

// elimina l'oggetto dall'array - aggiungi modale conferm

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

    }, 2000) // 3s
}


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



//chiamale le funzioni!!!!
getVegetableDetails()