import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_q9TojrYeI3V4pZsrMRswMVHA5QQGLAXVv8odii5yVyLRXlf0JDXDrclsyd1V49Pi";

const selectTag = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loaderMsg = document.querySelector(".loader");
const errorMsg = document.querySelector(".error");

errorMsg.classList.add("hidden");
selectTag.classList.add("hidden");


axios.get('https://api.thecatapi.com/v1/breeds')
  .then(function (response) {
      response.data.forEach((breed) => {
        //  console.log(breed.name, breed.id);
        let opt = document.createElement("option");
        opt.value = breed.id;
        opt.innerHTML = breed.name;
          selectTag.append(opt);
      });
  })  
  .catch(function (error) {
      console.log(error);
      errorMsg.classList.remove("hidden");
  })
  .finally(function () {
    loaderMsg.classList.add("hidden");
    selectTag.classList.remove("hidden");
  });

selectTag.addEventListener("change", ((e) => {
  loaderMsg.classList.remove("hidden")
  catInfo.innerHTML = "";
  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}`)
      .then(function (response) {
          const description = response.data[0].breeds[0].description;
          const temperament = response.data[0].breeds[0].temperament;
          const breed = response.data[0].breeds[0].name;
          const url = response.data[0].url;
          catInfo.innerHTML = `
          <img src="${url}" alt="${breed}" width= 300>
          <div>
              <h1>${breed}</h1>
              <p><b>Description: </b>${description}</p>
              <p><b>Temperament: </b> ${temperament}</p>
          </div>`
          
      })
      .catch(function (error) {
          console.log(error);
          errorMsg.classList.remove("hidden");
      })
      .finally(function () {
          loaderMsg.classList.add("hidden");
      });
  }))
  