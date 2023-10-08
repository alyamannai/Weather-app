const apiKey = process.env.API_KEY;

window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn');
    const togBtn = document.getElementById('togBtn')
    let iconName
    let data 


    btn.addEventListener('click', async () => {
      async function getWeather() {
        
        let location = document.querySelector('#location').value;
  
        try {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
          data = await response.json();
  
          if (data.error) {
            console.error('Error fetching weather data:', data.error.message);
          } else {
           
          insertToDOM();
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
  
      getWeather();
      
      function insertToDOM(){
        if (!data) return;

        const humidity = data.current.humidity
        const airPressure = data.current.pressure_mb
        const uv = data.current.uv
        const visi = data.current.vis_km
        const wText = data.current.condition.text
        

        vis.textContent =  visi;
        humidityT.textContent = humidity;
        uvT.textContent = uv
        airPressureT.textContent= airPressure
        

        checkUnitTemp();
        getWeatherIcon()

        icon.src = "../src/"+iconName
       
      }

      function checkUnitTemp(){
        if(!data) return;
        const temperatureC = data.current.temp_c;
        const feelLikeC = data.current.feelslike_c
        const feelikeF = data.current.feelslike_f
        const temperatureF = data.current.temp_f;

        if(togBtn.checked===true){
          tempT.textContent = temperatureF+ "F"
          feel.textContent=feelikeF+"F"

        }
        else{
          tempT.textContent = temperatureC + "C"
          feel.textContent= feelLikeC+"C"
        }
      }

      function getWeatherIcon(){
        if(!data) return;
        const wIcon = data.current.condition.icon

        const parts = wIcon.split('/');
        if (parts.length >= 4) {
            iconName = parts.slice(-4).join('/'); // Get the last 4 parts of the URL
        } else {
            console.error('Invalid icon URL:', wIcon);
        }

      }
     
     
      togBtn.addEventListener('change',()=>{
        checkUnitTemp();
      })

    });
  });
  