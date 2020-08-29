const weatherForm = document.getElementById('Wform');
const searchELem  = document.getElementById('WSearch');
const locationMsg = document.getElementById('location');
const tmpMsg      = document.getElementById('temp');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('GetWeather?address='+searchELem.value).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        locationMsg.textContent = '';
        tmpMsg.textContent = '';
        locationMsg.textContent = data.error;
      }
      else{
        locationMsg.textContent = '';
        tmpMsg.textContent = '';
        locationMsg.textContent = data.location;
        tmpMsg.textContent      = data.temp;
      }
    })
  })
})
