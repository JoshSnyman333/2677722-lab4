document.getElementById('submit-button').addEventListener('click', function () {
    event.preventDefault()
    
    const countryName = document.getElementById('userInput').value.trim();

    if (!countryName) {
        document.getElementById('userInput').innerHTML = "<p>Please enter a country.</p>";
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");  // Handle non-OK responses
            }
            return response.json();
        })
        .then(data => {
            const country = data[0]
            const capital = country.capital[0]
            const population = country.population
            const region = country.region
            const flag = country.flags.png;

            const borderingList = document.getElementById('bordering-list');
            const countryInfo = document.getElementById('country-details');
            countryInfo.innerHTML = '';

            const capitalItem = document.createElement('li');
            capitalItem.textContent = `Capital: ${capital}`;

            const populationItem = document.createElement('li');
            populationItem.textContent = `Population: ${population}`;

            const regionItem = document.createElement('li');
            regionItem.textContent = `Region: ${region}`;

            const flagItem = document.createElement('li');
            const flagImg = document.createElement('img');
            const flagText = document.createElement('span');
    
            flagText.textContent = 'Flag: ';
            flagImg.src = flag;
            flagImg.style.width = '400px';
            flagItem.appendChild(flagText);
            flagItem.appendChild(flagImg);

            countryInfo.appendChild(capitalItem);
            countryInfo.appendChild(populationItem);
            countryInfo.appendChild(regionItem);
            countryInfo.appendChild(flagItem);
        })

        .catch(error => {
            document.getElementById('country-details').innerHTML = "<p>Invalid Country Name.</p>";
        });
});

