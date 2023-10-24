import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selectTag = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loaderMsg = document.querySelector(".loader");
const errorMsg = document.querySelector(".error");

errorMsg.classList.add("hidden");
selectTag.classList.add("hidden");


fetchBreeds()
  .then(function (response) {
      response.data.forEach((breed) => {
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
  errorMsg.classList.add("hidden");
  loaderMsg.classList.remove("hidden")
  catInfo.innerHTML = "";
  fetchCatByBreed(e.target.value)
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
  