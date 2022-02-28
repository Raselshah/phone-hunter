const allPhoneAdd = document.getElementById("phone-add");
// load phones function
const searchButton = () => {
  const inputField = document.getElementById("input-field");
  const searchInput = inputField.value.toLowerCase();

  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput}`)
    .then((res) => res.json())
    .then((data) => showPhone(data.data));

  inputField.value = "";
};

// show phone value function
const showPhone = (phones) => {
  for (const phone of phones) {
    // console.log(phone);

    const div = document.createElement("div");
    div.classList.add("col-lg-3");
    div.classList.add("col-md-6");
    div.classList.add("mb-4");
    div.innerHTML = `
    
        <div class="col">
            <div class="card h-100">
                <img class="mx-auto" width="200" height="200" src="${phone.image}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand : ${phone.brand}</p>
                    <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-outline-info">See Phone Details</button>
                </div>
            </div>
        </div>
      
    `;

    allPhoneAdd.appendChild(div);
  }
};

// show phone details function
const phoneDetails = (info) => {
  //   console.log(info);
  fetch(`https://openapi.programming-hero.com/api/phone/${info}`)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data.data));
};

const showPhoneDetails = (phoneInfo) => {
  console.log(phoneInfo);
};
