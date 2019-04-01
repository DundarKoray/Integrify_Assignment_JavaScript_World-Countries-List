const searchBox = document.querySelector('.search-box') //input searchbox
const buttons = document.querySelector('.buttons') // targets all the buttons
const resultSection = document.querySelector('.result-section') // generated content ll be shown here
const buttonAZ = document.querySelector('.sort-by-AZ')
const subtitle = document.querySelector('.subtitle')
subtitle.textContent=`Currently, there are  ${countriesObject.length} countries` 
document.querySelector('.result-top-ten').style.display="none"
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

document.querySelector('.most-populated').addEventListener('click', function(){
    if (clickState === 0) {
        document.querySelector('.result-top-ten').style.display='block'
        clickState = 1
    } else {
        document.querySelector('.result-top-ten').style.display='none'
        clickState = 0
    }

    
})

document.querySelector('.most-spoken').addEventListener('click', function(){
    if (clickState === 0) {
        document.querySelector('.result-top-ten').style.display='block'
        clickState = 1
    } else {
        document.querySelector('.result-top-ten').style.display='none'
        clickState = 0
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

   return searchResult

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


function mostSpokenLanguages (arr) {
    let allLanguages = []
    arr.forEach(element => {
        allLanguages.push(element.languages.join(', '))
        console.log(element)
    })
    console.log(allLanguages)
    //Array(250) ["Pashto, Uzbek, Turkmen", "Swedish", "Albanian", "Arabic", "English, Samoan"...] 
    
    let joined = allLanguages.join(', ').split(', ')
    console.log(joined)
    //Array(368) ["Pashto", "Uzbek", "Turkmen", "Swedish", "Albanian", "Arabic", "English"]

    let mySet = new Set(joined)
    console.log(mySet)
    //Set(112) {"Pashto", "Uzbek", "Turkmen", "Swedish", "Albanian", …} NO REPEATING
    
    let myMap = new Map()
    for (let lang of mySet) {
        let count = joined.filter(element => element === lang)
        myMap.set(lang, count.length)
                console.log(myMap)
                
                console.log(count)    
            }
            console.log(myMap)        

}

mostSpokenLanguages(countriesObject)















//--TOP-10 MOST POPULATED COUNTRIES--
const populationArray = storedCountries.sort(function(a, b) {
  
  return b.population - a.population;
});

console.log(populationArray)
//this sorts countries from the most populated to the least populated

const tenMostPopulated = populationArray.slice(0, 10);
console.log(tenMostPopulated);
//this slices top ten countries




//--TOTAL POPULATION OF THE WORLD--
let count = 0;
countriesObject.forEach(element => {
  count = count + element.population;
});
const worldPopulation = count;
console.log(worldPopulation)


//--CREATE CONTENT FOR TOP 10 THE MOST POPULATED COUNTRIES--
const createPopulationContent = content => {
    const { name, population } = content;
    let width = (population / worldPopulation) * 100;
    console.log(name, width);
    let em =  `<div class="container">
  <p class="toptenNames">${name}</p>
<div class="population-bar" style="width: ${width}%">${population}</div>
  </div>`;
  console.log(em)
  return em;
};
  


//--SHOW CONTENT FOR TOP 10 THE MOST POPULATED COUNTRIES--
const showCountriesPopulation = array => {
    let content = "";
    array.forEach((element) => {
      content = content + createPopulationContent(element)
    })
    document.querySelector('.test').innerHTML = content;
  };
  
  showCountriesPopulation(tenMostPopulated);
//   subtitleForStats.textContent = "Ten most populated countries";































































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






