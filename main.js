window.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById("home")
    const detailPage = document.getElementById("detail")
    const backBtn = document.getElementById("back")
    const countriesContainer = document.getElementById("container")
    const detailContainer = document.getElementById("detail-container")

    const searchCountry = document.getElementById("submit")
    const change = document.getElementById("change")

    const filterBtn = document.querySelector(".holder")
    const filterCont = document.querySelector(".cont")
    filterBtn.addEventListener("click", () => {
        filterCont.classList.toggle("show")
        document.querySelector(".holder i").classList.toggle("fa-angle-up")
    })
    const filterCountry = document.querySelectorAll(".cont p")


    fetch("https://restcountries.com/v2/all")
    .then(res => {
        return res.json()
    })
    .then(data => {
            

            loadCountries(data, countriesContainer)
            
            loadBySearch(data, countriesContainer)
            
            loadByFilter(data, countriesContainer)
            
            loadDetailPage(data)

        
    })
    function loadDetailPage(data) {
        const countries = document.querySelectorAll(".country")
        countries.forEach(country => {
            country.addEventListener("click", (e) => {
                let index = e.target.id
                const logo = document.createElement("img")
                logo.src = data[index].flags.png
                logo.classList.add("detail=logo")

                const infoHolder = document.createElement("div")
                const name = document.createElement("h2")
                name.textContent = data[index].name
                
                const nativeName = document.createElement("p")
                nativeName.textContent = `Native name: ${data[index].nativeName}`
                
                const population = document.createElement("p")
                population.textContent = `population: ${data[index].population}`
                
                const region = document.createElement("p")
                region.textContent = `region: ${data[index].region}`

                const subRegion = document.createElement("p")
                subRegion.textContent = `sub region: ${data[index].subregion}`

                const capital = document.createElement("p")
                capital.textContent = `capital: ${data[index].capital}`

                const topLevelDomain = document.createElement("p")
                topLevelDomain.textContent = `top level domain: ${data[index].topLevelDomain}`

                const currencies = document.createElement("p")
                let currenciesArr = []
                data[index].currencies.forEach(currency => {
                    currency = currency.name
                    currenciesArr.push(currency)
                })
                currencies.textContent = `currencies: ${currenciesArr.toString()}`

                const languages = document.createElement("p")
                languages.classList.add("languages")
                let languageArr = []
                data[index].languages.forEach(language => {
                    language = language.name
                    languageArr.push(language)
                })
                languages.textContent = `languages: ${languageArr.toString()}`
                
                const first = document.createElement("div")
                first.classList.add("first")

                const second = document.createElement("div")
                second.classList.add("second")
                infoHolder.classList.add("info-holder")
                first.appendChild(nativeName)
                first.appendChild(population)
                first.appendChild(region)
                first.appendChild(subRegion)
                first.appendChild(capital)
                second.appendChild(topLevelDomain)
                second.appendChild(currencies)
                second.appendChild(languages)

                infoHolder.appendChild(first)
                infoHolder.appendChild(second)

                const borderCountriesDiv = document.createElement("div")
                borderCountriesDiv.classList.add("border-countries-div")
                const borderCountries = data[index].borders
                const textDiv = document.createElement("div")
                textDiv.textContent = "border countries: "
                textDiv.classList.add("text-div")
                const borders = document.createElement("div")
                borders.classList.add("borders")
                
                borderCountries ? (
                    borderCountries.forEach(border => {
                        const country = document.createElement("p")
                        country.textContent = border
                        country.classList.add("border-countries")
                        borders.appendChild(country)
                    })
                ) : borders.textContent = "no border countries"
                borderCountriesDiv.appendChild(textDiv)
                borderCountriesDiv.appendChild(borders)
                
                const leftDiv = document.createElement("div")
                leftDiv.classList.add("left-div")
                leftDiv.appendChild(name)
                leftDiv.appendChild(infoHolder)
                leftDiv.appendChild(borderCountriesDiv)
                detailContainer.appendChild(logo)
                detailContainer.appendChild(leftDiv)
                homePage.style.display = "none"
                detailPage.style.display = "block"
                backBtn.addEventListener("click", () => {
                    homePage.style.display = "block"
                    detailPage.style.display = "none"
                    while(detailContainer.firstChild) {
                        detailContainer.removeChild(detailContainer.firstChild)
                    }
                    location.reload()
                })
            })
        })
    }
    function loadBySearch(data, container) {
        change.addEventListener("input", (e) => {
            searchCountry.addEventListener("submit", (f) => {
                f.preventDefault()
                for(let i = 0; i < data.length; i++) {
                    let cont = data[i].name.toLowerCase()
                    if(e.target.value === data[i].name || e.target.value === cont ) {
                        while(countriesContainer.firstChild) {
                            countriesContainer.removeChild(countriesContainer.firstChild)
                        }
    
                        const country = document.createElement("div")
                        countryInfo = document.createElement("div")
                        const countryLogo = document.createElement("img")
                        const countryName = document.createElement("h3")
                        const countryPopulation = document.createElement("p")
                        const countryRegion = document.createElement("p")
                        const countryCapital = document.createElement("p")
    
                        countryLogo.src = data[i].flags.png
                        countryLogo.classList.add("country-img")
                        countryName.textContent = data[i].name
                        countryPopulation.textContent = `Population: ${data[i].population}`
                        countryRegion.textContent = `Region: ${data[i].region}`
                        countryCapital.textContent = `Capital: ${data[i].capital}`
    
                        countryInfo.classList.add("country-info")
                        countryInfo.appendChild(countryName)
                        countryInfo.appendChild(countryPopulation)
                        countryInfo.appendChild(countryRegion)
                        countryInfo.appendChild(countryCapital)
    
    
                        country.classList.add("country")
                        country.id = i
                        country.appendChild(countryLogo)
                        country.appendChild(countryInfo)
                        container.appendChild(country)
                    }
                }
                loadDetailPage(data)
                
            })
                
        })
    }
    function loadByFilter(data, container) {
        filterCountry.forEach(filter => {
            filter.addEventListener("click", (e) => {
                while(container.firstChild) {
                    container.removeChild(container.firstChild)
                }
                for(let i = 0; i < data.length; i++) {
                    if(e.target.textContent === data[i].region) {
                        const country = document.createElement("div")
                        countryInfo = document.createElement("div")
                        const countryLogo = document.createElement("img")
                        const countryName = document.createElement("h3")
                        const countryPopulation = document.createElement("p")
                        const countryRegion = document.createElement("p")
                        const countryCapital = document.createElement("p")

                        countryLogo.src = data[i].flags.png
                        countryLogo.classList.add("country-img")
                        countryName.textContent = data[i].name
                        countryPopulation.textContent = `Population: ${data[i].population}`
                        countryRegion.textContent = `Region: ${data[i].region}`
                        countryCapital.textContent = `Capital: ${data[i].capital}`

                        countryInfo.classList.add("country-info")
                        countryInfo.appendChild(countryName)
                        countryInfo.appendChild(countryPopulation)
                        countryInfo.appendChild(countryRegion)
                        countryInfo.appendChild(countryCapital)


                        country.classList.add("country")
                        country.id = i
                        country.appendChild(countryLogo)
                        country.appendChild(countryInfo)
                        container.appendChild(country)
                    }
                }
                loadDetailPage(data)
            })
            
        })
    }

    function loadCountries(data, container) {
        for(i = 0; i < data.length; i++) {
            const country = document.createElement("div")
            countryInfo = document.createElement("div")
            const countryLogo = document.createElement("img")
            const countryName = document.createElement("h3")
            const countryPopulation = document.createElement("p")
            const countryRegion = document.createElement("p")
            const countryCapital = document.createElement("p")

            countryLogo.src = data[i].flags.png
            countryLogo.classList.add("country-img")
            countryName.textContent = data[i].name
            countryPopulation.textContent = `Population: ${data[i].population}`
            countryRegion.textContent = `Region: ${data[i].region}`
            countryCapital.textContent = `Capital: ${data[i].capital}`

            countryInfo.classList.add("country-info")
            countryInfo.appendChild(countryName)
            countryInfo.appendChild(countryPopulation)
            countryInfo.appendChild(countryRegion)
            countryInfo.appendChild(countryCapital)


            country.classList.add("country")
            country.id = i
            country.appendChild(countryLogo)
            country.appendChild(countryInfo)
            container.appendChild(country)
        }
    }
})