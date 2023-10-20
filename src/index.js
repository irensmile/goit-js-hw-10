import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_q9TojrYeI3V4pZsrMRswMVHA5QQGLAXVv8odii5yVyLRXlf0JDXDrclsyd1V49Pi";

const selectTag = document.querySelector(".breed-select");

axios.get('https://api.thecatapi.com/v1/breeds')
  .then(function (response) {
      // handle success
      response.data.forEach((breed) => {
        //  console.log(breed.name, breed.id);
        let opt = document.createElement("option");
        opt.value = breed.id;
        opt.innerHTML = breed.name;
        selectTag.append(opt);
      });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  