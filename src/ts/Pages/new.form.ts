import "./../../scss/pages/new.form.scss";

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

    // Kontrollera om en leveransalternativ är vald
    if (selectedDeliveryOption) {
      // Kontrollera vilket leveransalternativ som är valt
      if (selectedDeliveryOption.id === "postnord-option") {
        // Visa Postnord-info och dölj Hemleverans-info
        hemleveransInfo.style.display = "none";
      } else if (selectedDeliveryOption.id === "hemleverans-option") {
        // Visa Hemleverans-info och dölj Postnord-info
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

    // Använd andra fortsättningsknappen
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
    secondCancelButton.addEventListener("click", function () {
      // Koden för andra avbryt-knappen
    });
  }
});

//mail adress giltig

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

  // Validera att förnamnet endast innehåller bokstäver
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

  // Validera att mobilnumret endast innehåller siffror och har minst 10 tecken
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
    // Visa knappen och justera bredden när användaren klickar på input-fältet
    submitButton.style.display = "block";
    postnumberInput.style.width = "75%";
  });

  submitButton.addEventListener("click", function () {
    // Dölj knappen och återställ bredden när användaren klickar på knappen
    submitButton.style.display = "none";
    postnumberInput.style.width = "95%";
  });
});
