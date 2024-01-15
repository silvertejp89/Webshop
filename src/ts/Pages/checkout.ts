import "./../../scss/pages/checkout.scss";
import { createHTMLCart } from "./../Components/cart";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-1") as HTMLFormElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateDeliveryInfo();
  });
});

function updateDeliveryInfo() {
  const postnordInfo = document.getElementById("postnord-info") as HTMLElement;
  const hemleveransInfo = document.getElementById(
    "hemleverans-info"
  ) as HTMLElement;

  // Visa båda leveransinfo
  postnordInfo.style.display = "block";
  hemleveransInfo.style.display = "block";

  const continueButton = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;

  continueButton.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedDeliveryOption = document.querySelector(
      'input[name="delivery-option"]:checked'
    ) as HTMLInputElement;

    if (selectedDeliveryOption) {
      if (selectedDeliveryOption.id === "postnord-option") {
        // Visar Postnord-info och döljer Hemleverans-info
        hemleveransInfo.style.display = "none";
      } else if (selectedDeliveryOption.id === "hemleverans-option") {
        // Visar Hemleverans-info och döljer Postnord-info
        postnordInfo.style.display = "none";
      }
    }
  });
}

//postnummer knapp-> info dyker upp

function isValidEmail(email: string): boolean {
  const emailValue = email.toLowerCase();

  const validDomains = [
    "@icloud.com",
    "@yahoo.com",
    "@hotmail.com",
    "@gmail.com",
  ];

  return validDomains.some((domain) => emailValue.endsWith(domain));
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-1") as HTMLFormElement;

  form.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const secondContinueButton = document.getElementById(
      "second-continue"
    ) as HTMLButtonElement;

    if (secondContinueButton) {
      const emailInput = document.querySelector(
        'input[name="mail"]'
      ) as HTMLInputElement;

      if (emailInput && isValidEmail(emailInput.value)) {
        console.log("Mejladressen är giltig. Fortsätt...");
      } else {
        alert("Vänligen ange en giltig mejladress.");
      }
    }
  });

  const secondCancelButton = document.getElementById(
    "second-cancel"
  ) as HTMLButtonElement;

  if (secondCancelButton) {
    secondCancelButton.addEventListener("click", function () {});
  }
});

//mail adress giltig

//VISA CART
const checkoutCart = document.querySelector(".checkout-cart");

if (checkoutCart) {
  const container = document.createElement("div");
  container.className = "cart-container";

  checkoutCart.appendChild(container);

  createHTMLCart(container);
}

//dölj "go to checkout-button" nedanför cart;
const checkoutButton = document.querySelector(".checkout-button");
if (checkoutButton) {
  // Göm knappen
  (checkoutButton as HTMLElement).style.display = "none";
}

//postnummer
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-1") as HTMLFormElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateNameInputs()) {
      updateDeliveryInfo();
    } else {
      alert("Vänligen fyll i förnamn med endast bokstäver.");
    }
  });
});

function validateNameInputs(): boolean {
  const firstNameInput = document.querySelector(
    'input[name="förnamn"]'
  ) as HTMLInputElement;
  const onlyLettersPattern = /^[A-Za-z]+$/;
  return (
    firstNameInput.value.trim() !== "" &&
    onlyLettersPattern.test(firstNameInput.value)
  );
}
//namn
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-1") as HTMLFormElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateMobileNumber()) {
      updateDeliveryInfo();
    } else {
      alert("Vänligen fyll i mobilnummer med minst 10 siffror.");
    }
  });
});

function validateMobileNumber(): boolean {
  const mobileNumberInput = document.querySelector(
    'input[name="mobilnummer"]'
  ) as HTMLInputElement;

  const onlyNumbersPattern = /^[0-9]+$/;
  return (
    mobileNumberInput.value.trim() !== "" &&
    onlyNumbersPattern.test(mobileNumberInput.value) &&
    mobileNumberInput.value.length >= 10
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const postnumberInput = document.getElementById(
    "post-numbers"
  ) as HTMLInputElement;
  const submitButton = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;

  postnumberInput.addEventListener("focus", function () {
    submitButton.style.display = "block";
    postnumberInput.style.width = "75%";
  });

  submitButton.addEventListener("click", function () {
    submitButton.style.display = "none";
    postnumberInput.style.width = "95%";
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  const postnumberInput = document.getElementById(
    "post-numbers"
  ) as HTMLInputElement;
  const postnumberButton = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;
  const postnordInfo = document.getElementById("postnord-info");
  const hemleveransInfo = document.getElementById("hemleverans-info");

  postnumberButton.addEventListener("click", function () {
    // Kontroller att postnummer fyllts i
    if (postnumberInput.value.trim() !== "") {
      // Visar både postnord-info och hemleverans-info
      postnordInfo.style.display = "block";
      hemleveransInfo.style.display = "block";
    } else {
      alert("Fyll i postnummer innan du fortsätter.");
    }
  });
});

//betalningsmetod
function handlePaymentMethodChange() {
  const klarnaRadio = document.getElementById(
    "klarna-option"
  ) as HTMLInputElement;
  const cardRadio = document.getElementById("card-option") as HTMLInputElement;

  const cardDetailsContainer = document.querySelector(
    ".card-details"
  ) as HTMLElement;
  const klarnaTextContainer = document.querySelector(
    ".klarna-text-1"
  ) as HTMLElement;

  // Om Klarna väljs, döljs card details och visa Klarna-texten
  if (klarnaRadio.checked) {
    cardDetailsContainer.style.display = "none";
    klarnaTextContainer.style.display = "block";
  } else if (cardRadio.checked) {
    // Om kort väljs, visas card details och döljer Klarna-texten
    cardDetailsContainer.style.display = "block";
    klarnaTextContainer.style.display = "none";
  }
}

const klarnaRadio = document.getElementById(
  "klarna-option"
) as HTMLInputElement;
const cardRadio = document.getElementById("card-option") as HTMLInputElement;

klarnaRadio.addEventListener("change", handlePaymentMethodChange);
cardRadio.addEventListener("change", handlePaymentMethodChange);
