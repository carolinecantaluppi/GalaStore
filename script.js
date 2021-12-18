//inserendo scroll in navbar:
// let navbarId = document.querySelector('#navbarId');
// document.addEventListener('scroll', () => {
// 	let scrolled = window.scrollY;
// 	if(scrolled >= 20){
//         // quando scrolla, rimuove il colore iniziale della navbar:
//         navbarId.classList.remove('bg-light', 'navbar-light');
//         // quando scrolla, aggiunge il colore transparente nella navbar: 
//         navbarId.classList.add('bg-transparent');
//         // quando scrolla, ingrandisce la navbar aumentando l’altezza in 150px:
// 		navbarId.style.height = '50px';
// 	} else {
//         navbarId.classList.remove('bg-transparent');
//         navbarId.classList.add('bg-light', 'navbar-light');
// 		navbarId.style.height = '50px';
// 	}
// })

// inserendo Swiper -->
let swiper = new Swiper(".mySwiper", {
    watchSlidesProgress: true,
    slidesPerView: 8,
});

// collegando annunci.json:
fetch('./annunci.json')
  .then(response => response.json())
  .then(data => {                       //per convensione, chiamasi data, che è un array di oggetti.
    
    // console.log(data)
    
    let filterWrapper = document.querySelector('#filterWrapper')
    let wrapperFilter = [];

    function setCategories() {
        let categories = Array.from(new Set(data.map(annuncio => annuncio.category)))

        // console.log(categories)

        categories.forEach(category => {
            // console.log(category)

            let div = document.createElement('div');
            div.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            </div>
            `
            filterWrapper.appendChild(div)
        })
    }

    setCategories()

    function createCards(array) {
        let cardsWrapper = document.querySelector('#cardsWrapper');
        cardsWrapper.innerHTML = ''; // Per pulire e permettere di aggiornare il layout della pagina

        array.forEach(element => {
            // console.log(element)
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.category}</p>
                <p class="card-text">${element.price} €</p>                        
            </div>
            `
            cardsWrapper.appendChild(div);
        })
    }

    createCards(data)

    function filterByCategory() {
        let radioButton = document.querySelectorAll('.form-check-input');
        let result = [];
        radioButton.forEach(radio => {
            // console.log(radio)
            radio.addEventListener('click', () => {
                if(radio.id == 'All') {
                   result = createCards(data)
                } else {
                    let filtered = data.filter(annunci => annunci.category == radio.id)
                    // console.log(filtered)

                    wrapperFilter.push(filtered)

                    result = createCards(filtered)
                }
            })
        })
    }

    filterByCategory()

    function setPriceMax() {
        let maxPrice = data.map(element => Number(element.price)).sort((a, b) => a - b).pop()
        let rangeInputValue = document.querySelector('#rangeInputValue')
        // console.log(Math.round(maxPrice))
        rangeInputValue.max = Math.round(maxPrice);

    }

    setPriceMax()

    function filterByPrice() {
        let rangeInputValue = document.querySelector('#rangeInputValue')
        let labelInput = document.querySelector('#labelInput')

        // console.log(labelInput)

        rangeInputValue.addEventListener('input', () => {
            // console.log(rangeInputValue.value)
            labelInput.innerHTML = `${rangeInputValue.value} €`;

            let filteredPrice = data.filter(annuncio => Number(annuncio.price) <= rangeInputValue.value)

            // console.log(filteredPrice)

            createCards(filteredPrice)

        })
    }

    filterByPrice()

    function filterByWord() {
        let inputWord = document.querySelector('#inputWord');
        inputWord.addEventListener('input', () =>{
            let filteredWord = data.filter(annuncio => annuncio.name.toLowerCase().includes(inputWord.value.toLowerCase()))

            // console.log(filteredWord)
            createCards(filteredWord)
        })
    }

    filterByWord()

  })          