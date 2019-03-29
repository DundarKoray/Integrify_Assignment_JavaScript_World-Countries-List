const searchBox = document.querySelector('.search-box') //input searchbox
const buttons = document.querySelector('.buttons') // targets all the buttons
const resultSection = document.querySelector('.result-section') // generated content ll be shown here
const buttonAZ = document.querySelector('.sort-by-AZ')
const subtitle = document.querySelector('.subtitle')
subtitle.textContent=`Currently, there are  ${countriesObject.length} countries` 

const storedCountries = countriesObject
let clickState = 0;

//EVENT LISTENER FOR BUTTONS
searchBox.addEventListener('keyup', function (e) {
    
    let searchTherm = e.target.value.toUpperCase()
    showCountries(search(countriesObject, searchTherm))

})

buttons.addEventListener('click', e => {
    
    if(e.target.classList.contains('sort-by-AZ')){
        
        sortByName()
        e.target.classList.toggle('selected')
        // console.log(sortMaat(countriesObject, 'name'))
        
        
    } else if (e.target.classList.contains('sort-by-capital')) {
        console.log('BUTTON 2')
        sortByCapital()
        // console.log(sortMaat(countriesObject, 'capital'))
        
    } else if (e.target.classList.contains('sort-by-population')) {
        e.target.classList.toggle('selected')

       sortByPopulation()
       // console.log(sortMaat(countriesObject, 'population'))
    }
})




// FUNCTIONS // FUNCTIONS // FUNCTIONS // FUNCTIONS

function search (arr, keysearch) {

    
    
    const searchResult = arr.filter(function(element) {
        let {name, capital, languages} = element
        let isName = name.toUpperCase().includes(keysearch)
        let isCapital = capital.toUpperCase().includes(keysearch)
        let isLanguages = languages.join().toUpperCase().includes(keysearch)  //languages are array thats why we use join()

        
        return isName || isCapital || isLanguages
        
    })

    //THIS MAKES THE COUNTRY LIST INVISIBLE
    // if (searchBox.value ===''){
    //     resultSection.style.display="none"
    // }else {
    //     resultSection.style.display="flex"
    // }

   return searchResult

    // if(buttonAZ.classList.contains('selected')){
    //    return searchResult.reverse()
    // } else {

    //     return searchResult
    // }
}



// generating divs
function generateContent(object) {
    
    
    const {languages, currency, name, population, flag, capital} = object
    
    return `<div class="country-wrapper">
    <img src="${flag}">
    <p>${name}</p>
    <p>${capital}</p>
    <p>${languages}</p>
    <p>${population}</p>
    <p>${currency}</p>
    </div>`
    
}

function showCountries (array) {
    let contents = ''
    resultSection.innerHTML = ''
    array.forEach(function(element) {
        contents += generateContent(element)
    })
    
    resultSection.innerHTML = contents
}

const sortCountries = (arr) => {
    const countries = [...arr];
    countries.sort((a,b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    })

}

function sortByName () {
    
    if (clickState == 0) {
        let test = storedCountries.sort((a, b) => {
             if (a.name > b.name){
                 return -1
             } 
           })
     
           console.log(test);
           showCountries(search(test, searchBox.value.toUpperCase()))
           clickState = 1
     } else {
         test = storedCountries.sort((a, b) => {
             if (a.name < b.name){
                 return - 1
             } 
           })
     
           console.log(test)
           showCountries(search(test, searchBox.value.toUpperCase()))
           clickState = 0
     }
 
    
}

function sortByPopulation () {

    if (clickState == 0) {
       let test = storedCountries.sort((a, b) => {
            if (a.population > b.population){
                return -1
            } 
          })
    
          console.log(test);
          showCountries(search(test, searchBox.value.toUpperCase()))
          clickState = 1
    } else {
        test = storedCountries.sort((a, b) => {
            if (a.population < b.population){
                return - 1
            } 
          })
    
          console.log(test)
          showCountries(search(test, searchBox.value.toUpperCase()))
          clickState = 0
    }

    
}

function sortByCapital () {

    if (clickState == 0) {
       let test = storedCountries.sort((a, b) => {
            if (a.capital > b.capital){
                return -1
            } 
          })
    
          console.log(test);
          showCountries(search(test, searchBox.value.toUpperCase()))
          clickState = 1
    } else {
        test = storedCountries.sort((a, b) => {
            if (a.capital < b.capital){
                return - 1
            } 
          })
    
          console.log(test)
          showCountries(search(test, searchBox.value.toUpperCase()))
          clickState = 0
    }

    
}




showCountries(search(countriesObject, searchBox.value))




//Asebeneh code
// const sortMaat = (arr, label) => {
//     const countries = [...arr];
//     countries.sort((a,b) => {
//         if(a[label] > b[label]) return -1;
//         if(a[label] < b[label]) return 1;
//         return 0;
//     })
// return countries;
//     }

// console.log(sortMaat(countriesObject, 'population'))











