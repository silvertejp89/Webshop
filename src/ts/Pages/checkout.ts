import "./../../scss/pages/checkout.scss";
import { createHTMLCart } from "./../Components/cart";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-1") as HTMLFormElement;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateDeliveryInfo();
  });

  // Funktion för att uppdatera leveransinformation
  function updateDeliveryInfo() {
    const postnordInfo = document.getElementById(
      "postnord-info"
    ) as HTMLElement;
    const hemleveransInfo = document.getElementById(
      "hemleverans-info"
    ) as HTMLElement;

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
          hemleveransInfo.style.display = "none";
        } else if (selectedDeliveryOption.id === "hemleverans-option") {
          postnordInfo.style.display = "none";
        }
      }
    });
  }

  // Funktion för att validera e-postadress
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

  // Validera e-postadress vid formulärsinskickning
  form.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const emailInput = document.querySelector(
      'input[name="mail"]'
    ) as HTMLInputElement;

    if (emailInput && isValidEmail(emailInput.value)) {
      console.log("Mejladressen är giltig. Fortsätt...");
    } else {
      alert("Vänligen ange en giltig mejladress.");
    }
  });

  // Validera förnamn vid formulärsinskickning
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateNameInputs()) {
      alert("Vänligen fyll i förnamn med endast bokstäver.");
    }
  });

  // Validera mobilnummer vid formulärsinskickning
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateMobileNumber()) {
      alert("Vänligen fyll i mobilnummer med minst 10 siffror.");
    }
  });

  // Visa postnummerknapp och information vid fokus
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

  // Dölj postnummerknapp och justera input vid klick på knappen
  submitButton.addEventListener("click", function () {
    submitButton.style.display = "none";
    postnumberInput.style.width = "95%";
  });

  // Visa postnummerinformation och annan leveransinformation vid klick på knappen
  const postnumberButton = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;

  postnumberButton.addEventListener("click", function () {
    if (postnumberInput.value.trim() !== "") {
      const postnordInfo = document.getElementById("postnord-info");
      const hemleveransInfo = document.getElementById("hemleverans-info");

      if (postnordInfo && hemleveransInfo) {
        postnordInfo.style.display = "block";
        hemleveransInfo.style.display = "block";
      } else {
        console.error(
          "postnordInfo eller hemleveransInfo är null eller undefined."
        );
      }
    } else {
      alert("Fyll i postnummer innan du fortsätter.");
    }
  });

  // Hantera betalningsmetodändringar
  function handlePaymentMethodChange() {
    const klarnaRadio = document.getElementById(
      "klarna-option"
    ) as HTMLInputElement;
    const cardRadio = document.getElementById(
      "card-option"
    ) as HTMLInputElement;

    const cardDetailsContainer = document.querySelector(
      ".card-details"
    ) as HTMLElement;
    const klarnaTextContainer = document.querySelector(
      ".klarna-text-1"
    ) as HTMLElement;

    if (klarnaRadio.checked) {
      cardDetailsContainer.style.display = "none";
      klarnaTextContainer.style.display = "block";
    } else if (cardRadio.checked) {
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

  // Skapa och visa varukorgen
  const checkoutCart = document.querySelector(".checkout-cart");

  if (checkoutCart) {
    const container = document.createElement("div");
    container.className = "cart-container";

    checkoutCart.appendChild(container);

    createHTMLCart(container);
  }

  // Dölj knappen för att gå till kassan
  const checkoutButton = document.querySelector(".checkout-button");

  if (checkoutButton) {
    (checkoutButton as HTMLElement).style.display = "none";
  }
});

// Funktion för att validera förnamn
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

// Funktion för att validera mobilnummer
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
