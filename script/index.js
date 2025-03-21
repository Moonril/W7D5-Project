// footer con data
const printDateInFooter = function () {
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

// loading thingy

const hideSpinner = function () {
    const div = document.getElementById('spinner-container')
    div.classList.add('d-none')
}

// aggiungere hideSpinner() al get

// chiave API
const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5NzM4MzRiZjAwMTUwMDA2ZWYiLCJpYXQiOjE3NDI1NDQ1MzUsImV4cCI6MTc0Mzc1NDEzNX0.VjOHhUmp7-Ze7323I_6rWZAog6kMLeQmD9yt4wOeXmg"

// fetch array vuoto

const getProducts = function () {
    
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5NzM4MzRiZjAwMTUwMDA2ZWYiLCJpYXQiOjE3NDI1NDQ1MzUsImV4cCI6MTc0Mzc1NDEzNX0.VjOHhUmp7-Ze7323I_6rWZAog6kMLeQmD9yt4wOeXmg" //sostituire con apiKey
        }
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('response not ok')
        }
    })
    .then((products) => {
        hideSpinner()
        console.log('array di prodotti vuoto', products)

        // row vuota
        const emptyRow = document.getElementById('products-row')
        
        //crea card per ogni prodotto
        products.forEach((product) => {
            emptyRow.innerHTML += `
            <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
                <div class="card shadow-sm mb-4">
                   <img
                          src=${product.imageUrl}
                          class="card-img-top bd-placeholder-img"
                        />
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.brand}</p>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price} €</p>
                        <divclass="d-flex align-items-center justify-content-between">
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-secondary btn-sm view" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                            </div>
                            <small class="text-muted">${product._id}</small>
                        </div>
                    </div>
                </div>
            </div>
            `
        })




    })
    .catch((error) => {
        hideSpinner()
        console.log('si è verificato un errore', error)
    })
}

getProducts()