import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_q9TojrYeI3V4pZsrMRswMVHA5QQGLAXVv8odii5yVyLRXlf0JDXDrclsyd1V49Pi";

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
}