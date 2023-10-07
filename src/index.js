const apiKey = process.env.API_KEY;

window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn');
    let input = document.getElementById('location');
    const togBtn = document.getElementById('togBtn');
    let iconName;
    let data;

    input.addEventListener('keydown', async function(event) {
        if (event.key === "Enter") {
            async function getWeather() {
                let location = input.value;

                try {
                    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
                    data = await response.json();

                    if (data.error) {
                        console.error('Error fetching weather data:', data.error.message);
                    } else {
                        insertToDOM();
                        unhideExtra();
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }

            getWeather(); // Call the getWeather function when Enter is pressed
        }
    });

    function insertToDOM() {
        if (!data) return;

        const humidity = data.current.humidity;
        const airPressure = data.current.pressure_mb;
        const uv = data.current.uv;
        const visi = data.current.vis_km;
        const wText = data.current.condition.text;
        const country = data.location.name;

        vis.textContent =  "visibility: "+visi+"km";
        humidityT.textContent ="humidity: " +humidity;
        uvT.textContent = "uv: " +uv;
        airPressureT.textContent= "air pressure: "+airPressure+"hPa";
        countryT.textContent=country;
        conditionText.textContent=wText;

        checkUnitTemp();
        getWeatherIcon();

        icon.src = "../src/"+iconName;
    }

    function checkUnitTemp() {
        if(!data) return;
        const temperatureC = data.current.temp_c;
        const feelLikeC = data.current.feelslike_c;
        const feelikeF = data.current.feelslike_f;
        const temperatureF = data.current.temp_f;

        if(togBtn.checked===true){
            tempT.textContent = temperatureF+ "°";
            feel.textContent="feels like: "+feelikeF+"°";
        }
        else{
            tempT.textContent = temperatureC + "°";
            feel.textContent= "feels like: "+feelLikeC+"°";
        }
    }

    function getWeatherIcon() {
        if(!data) return;
        const wIcon = data.current.condition.icon;

        const parts = wIcon.split('/');
        if (parts.length >= 4) {
            iconName = parts.slice(-4).join('/'); // Get the last 4 parts of the URL
        } else {
            console.error('Invalid icon URL:', wIcon);
        }
    }

    function unhideExtra() {
        let extra = document.querySelectorAll('.extra');
        extra.forEach(extra =>{
            extra.style.visibility = "visible";

            let small = document.getElementById('small');
            small.style.visibility = "visible";
        });
    }

    togBtn.addEventListener('change', () => {
        checkUnitTemp();
    });
});

  