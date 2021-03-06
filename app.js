const allPhoneAdd = document.getElementById("phone-add");
const allPhoneAddDetails = document.getElementById("phone-details");

// load phones function
const searchButton = () => {
  // clear display
  allPhoneAdd.textContent = "";
  allPhoneAddDetails.textContent = "";
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
    allPhoneAddDetails.textContent = "";
    document.getElementById("counter").style.display = "none";
    return;
  }
  document.getElementById("counter").style.display = "block";
  document.getElementById("input-field").style.border = "1px solid #ced4da";
  document.getElementById("error-message").style.display = "none";
  //   user input valid then this code running

  // counter added
  const count = document.getElementById("counter");
  const counter = phones.length;
  count.innerText = `Total item found :  ${counter}`;

  // first 20 item showing
  const onePageTotalPhone = phones.slice(0, 20);
  for (const phone of onePageTotalPhone) {
    // console.log(phone);

    const div = document.createElement("div");
    div.classList.add("col-lg-3");
    div.classList.add("col-md-6");
    div.classList.add("mb-4");

    div.innerHTML = `
    
        <div class="col">
            <div class="card h-100">
                <div class="d-flex justify-content-center flex-column align-content-center box-design  p-3">
                    <img class="mx-auto" height="200" src="${phone.image}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${phone.phone_name}</h5>
                        <p class="card-text text-center">Brand : ${phone.brand}</p>
                        <div class="text-center mx-auto">
                        <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-outline-info">See Phone Details</button>
                        </div>
                    </div>
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
  allPhoneAddDetails.textContent = "";
  const phoneSensors = phoneInfo.mainFeatures.sensors;
  let allSensors = 0;
  for (const phoneSensor of phoneSensors) {
    allSensors = allSensors + phoneSensor + "<br>";
  }
  //   console.log(phoneInfo.mainFeatures);
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card p-3">
    <img class="mx-auto" width="200" height="200" src="${
      phoneInfo.image
    }" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center">${phoneInfo.name}</h5>
      <h5 class="card-title text-center">Memory : ${
        phoneInfo.mainFeatures.memory
          ? phoneInfo.mainFeatures.memory
          : "memory not include"
      }</h5>
      <h5 class="card-title text-center">Storage : ${
        phoneInfo.mainFeatures.storage
      }</h5>
      <h5 class="card-title text-center">Processor : ${
        phoneInfo.mainFeatures.chipSet
          ? phoneInfo.mainFeatures.chipSet
          : "processor is not found"
      }</h5>
      <h5 class="card-title text-center">Display : ${
        phoneInfo.mainFeatures.displaySize
      }</h5>
      <p class="card-text text-center">Bluetooth : ${
        phoneInfo.others.Bluetooth
          ? phoneInfo.others.Bluetooth
          : "bluetooth not found"
      }</p>
      <p class="card-text text-center">Gps : ${
        phoneInfo.others.GPS ? phoneInfo.others.GPS : "Gps is not build in"
      }</p>
      <p class="card-text text-center">NFC : ${
        phoneInfo.others.NFC ? phoneInfo.others.NFC : "NFC not found"
      }</p>
      <p class="card-text text-center">Radio : ${
        phoneInfo.others.Radio ? phoneInfo.others.Radio : "Radio not build in"
      }</p>
      <p class="card-text text-center">USB : ${
        phoneInfo.others.USB ? phoneInfo.others.USB : "USB not supported"
      }</p>
      <p class="card-text text-center">WLAN : ${
        phoneInfo.others.WLAN ? phoneInfo.others.WLAN : "WLAN is not found"
      }</p>
      <p class ="text-center">Sensors : ${allSensors}</p>
      <p class="card-text text-center"><small class="text-muted">${
        phoneInfo.releaseDate ? phoneInfo.releaseDate : "not released yet"
      }</small></p>
    </div>
  </div>
  `;
  allPhoneAddDetails.appendChild(div);
  window.scrollTo(0, 200);
};
