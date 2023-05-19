const BASE_URL = `https://javascript-25g-a9d10-default-rtdb.firebaseio.com/pets`;

let params = new URLSearchParams(window.location.search);

let petIdentifier = params.get("id");

const getPet = async (petID) => {
  let response = await fetch(`${BASE_URL}/${petID}/.json`);
  let data = await response.json();
  return data;
};

const printPet = async (petID) => {
  let petObject = await getPet(petID);
  console.log(petObject);
  let { size, breed, gender, pet, picture } = petObject;
  let cardTitle = document.querySelector(".card-title");
  let petTitleText = document.createTextNode(`${pet} ${breed}`);
  cardTitle.appendChild(petTitleText);

  //En los nuevos registros va a salir undefined porque falta agregar el genero
  let genderElement = document.querySelector(".pet-gender");
  let petGenderText = document.createTextNode(`Genero: ${gender}`);
  genderElement.appendChild(petGenderText);

  let sizeElement = document.querySelector(".pet-size");
  let petSizeText = document.createTextNode(`Size: ${size}`);
  sizeElement.appendChild(petSizeText);

  let pictureElement = document.querySelector(".card-img-top");
  pictureElement.setAttribute("src", picture);
};

printPet(petIdentifier);
