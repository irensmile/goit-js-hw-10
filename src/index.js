import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_q9TojrYeI3V4pZsrMRswMVHA5QQGLAXVv8odii5yVyLRXlf0JDXDrclsyd1V49Pi";

const selectTag = document.querySelector(".breed-select");
const loaderMsg = document.querySelector(".loader");
const errorrMsg = document.querySelector(".error");
errorrMsg.style.display = "none";


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
      errorrMsg.style.display = "block";
  })
  .finally(function () {
    loaderMsg.style.display = "none";
  });

selectTag.addEventListener("change", ((e) => {
    loaderMsg.style.display = "block";
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}`)
        .then(function (response) {
            const catInfo = document.querySelector(".cat-info");
            const description = response.data[0].breeds[0].description;
            const temperament = response.data[0].breeds[0].temperament;
            const breed = response.data[0].breeds[0].name;
            const url = response.data[0].url;
            catInfo.innerHTML = `<div style="display:flex">
            <img src="${url}" alt="${breed}" width= 300>
            <div>
                <h1>${breed}</h1>
                <p>${description}</p>
                <p><b>Temperament:</b> ${temperament}</p>
            </div>
            </div>`
            
        })
        .catch(function (error) {
            console.log(error);
            errorrMsg.style.display = "block";
        })
        .finally(function () {
            loaderMsg.style.display = "none";
        });
  }))
  