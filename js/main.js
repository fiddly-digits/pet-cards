const BASE_URL = `https://javascript-25g-a9d10-default-rtdb.firebaseio.com/pets`;

let petObject = {};

document.querySelectorAll("#pet-form input").forEach((field) => {
  field.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let value = event.target.value;
    petObject[property] = value;
    console.log(petObject);
  });
});

const savePet = async (pet) => {
  let response = await fetch(`${BASE_URL}/.json`, {
    method: "POST",
    body: JSON.stringify(pet),
  });
  let data = await response.json();
  return data;
};

document.getElementById("save-pet").addEventListener("click", async (event) => {
  event.preventDefault();
  let response = await savePet(petObject);
  console.log(response);
  if (response) {
    printAllPets("pet-list");
  }
});

const createPetCard = (petData, petKey) => {
  let { breed, picture, size, pet } = petData;
  let cardCol = document.createElement("div");
  cardCol.classList.add("col");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("pet-card", "card", "mb-3");

  let cardRow = document.createElement("div");
  cardRow.classList.add("row", "g-0");

  let imageCol = document.createElement("div");
  imageCol.classList.add("col-md-4");

  let cardPicture = document.createElement("img");
  cardPicture.classList.add("card-picture");
  cardPicture.setAttribute("src", picture);

  let contentCol = document.createElement("div");
  contentCol.classList.add("col-md-4");

  let cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "h-100",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  let cardTitleText = document.createTextNode(`${pet} ${breed}`);
  cardTitle.append(cardTitleText);

  let cardYear = document.createElement("p");
  cardYear.classList.add("card-text");
  let yearText = document.createTextNode(`Size: ${size}`);
  cardYear.append(yearText);

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add(
    "d-flex",
    "justify-content-between",
    "flex-column",
    "flex-md-row",
    "gap-3"
  );

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  let deleteText = document.createTextNode("Borrar");
  deleteButton.append(deleteText);
  deleteButton.addEventListener("click", () => {
    console.log("borrando auto");
    deletePet(petKey);
  });

  let detailButton = document.createElement("button");
  detailButton.classList.add("btn", "btn-primary");
  detailButton.setAttribute("data-pet-id", petKey);
  let detailText = document.createTextNode("Ver detalle");
  detailButton.append(detailText);

  buttonWrapper.append(deleteButton, detailButton);

  cardBody.append(cardTitle, cardYear, buttonWrapper);

  contentCol.append(cardBody);

  imageCol.append(cardPicture);

  cardRow.append(imageCol, contentCol);

  cardWrapper.append(cardRow);

  cardCol.append(cardWrapper);

  return cardCol;
};

const getAllPets = async () => {
  let response = await fetch(`${BASE_URL}/.json`);
  let data = await response.json();
  return data;
};

const printAllPets = async (listId) => {
  let pets = await getAllPets();
  console.log(pets);
  let listWrapper = document.getElementById(listId);
  while (listWrapper.firstChild) {
    listWrapper.removeChild(listWrapper.firstChild);
  }
  for (key in pets) {
    let petData = pets[key];
    let card = createPetCard(petData, key);
    listWrapper.appendChild(card);
  }
  let detailButtons = document.querySelectorAll("#pet-list .btn-primary");
  detailButtons.forEach((button) => {
    let petID = button.getAttribute("data-pet-id");
    button.addEventListener("click", (event) => {
      window.open(`./pet-detail.html?id=${petID}`);
    });
  });
};

printAllPets("pet-list");

const deletePet = async (petKey) => {
  let response = await fetch(`${BASE_URL}/${petKey}/.json`, {
    method: "DELETE",
  });
  let data = await response.json();
  console.log(data);
  printAllPets("pet-list");
};
