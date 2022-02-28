const allPhoneAdd = document.getElementById("phone-add");
// load phones function
const searchButton = () => {
  // clear display
  allPhoneAdd.textContent = "";
  // phone data load
  const inputField = document.getElementById("input-field");
  const searchInput = inputField.value.toLowerCase();

  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput}`)
    .then((res) => res.json())
    .then((data) => showPhone(data.data));

  // spinner added
  document.getElementById("spinner").style.display = "block";
  inputField.value = "";
};

// show phone value function
const showPhone = (phones) => {
  // spinner remove
  document.getElementById("spinner").style.display = "none";
  // user input checking
  if (phones <= 0) {
    document.getElementById("input-field").style.border = "1px solid red";
    document.getElementById("error-message").style.display = "block";
    return;
  }
  document.getElementById("input-field").style.border = "1px solid #ced4da";
  document.getElementById("error-message").style.display = "none";
  //   user input valid then this code running
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
  // clear display
  allPhoneAdd.textContent = "";
  const phoneSensors = phoneInfo.mainFeatures.sensors;
  let allSensors = 0;
  for (const phoneSensor of phoneSensors) {
    allSensors += phoneSensor;
  }
  //   console.log(phoneInfo.mainFeatures);
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card">
    <img class="mx-auto" width="200" height="200" src="${phoneInfo.image}" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center">${phoneInfo.name}</h5>
      <h5 class="card-title text-center">Memory : ${phoneInfo.mainFeatures.memory}</h5>
      <h5 class="card-title text-center">Storage : ${phoneInfo.mainFeatures.storage}</h5>
      <h5 class="card-title text-center">Body : ${phoneInfo.mainFeatures.displaySize}</h5>
      <h5 class="card-title text-center">Storage : ${phoneInfo.mainFeatures.chipSet}</h5>
      <h5 class="card-title text-center">Display : ${phoneInfo.mainFeatures.displaySize}</h5>
      <p class="card-text text-center">Bluetooth : ${phoneInfo.others.Bluetooth}</p>
      <p class="card-text text-center">Gps : ${phoneInfo.others.GPS}</p>
      <p class="card-text text-center">NFC : ${phoneInfo.others.NFC}</p>
      <p class="card-text text-center">Radio : ${phoneInfo.others.Radio}</p>
      <p class="card-text text-center">USB : ${phoneInfo.others.USB}</p>
      <p class="card-text text-center">WLAN : ${phoneInfo.others.WLAN}</p>
      <p class ="text-center">Sensors : ${allSensors}</p>
      <p class="card-text text-center"><small class="text-muted">${phoneInfo.releaseDate}</small></p>
    </div>
  </div>
  `;
  allPhoneAdd.appendChild(div);
};
