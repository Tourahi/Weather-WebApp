


fetch('GetWeather?address=rabat').then((res) => {
  res.json().then((data) => {
    console.log(data);
  })
})
