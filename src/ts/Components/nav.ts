import "../../scss/main.scss";

// Function to generate navbar with content in DOM

function createNavbar(): void {
  const navbarWrapper = document.getElementById("navbar_wrapper");
  if (!navbarWrapper) {
    console.error("Navbar container not found");
    return;
  }

  const navbar = document.createElement("div");
  navbar.classList.add("navbar_container");

  const leftSection = document.createElement("div");
  leftSection.classList.add("navbar_left__container");

  const linkTexts = ["Contact us", "Collections", "Sustainability"];
  for (const text of linkTexts) {
    const link = document.createElement("a");
    link.href = `#${text.toLowerCase().replace(/\s/g, "-")}`;
    link.textContent = text;
    leftSection.appendChild(link);
  }

  const logoSection = document.createElement("div");
  logoSection.classList.add("navbar_logo__container");

  const logoImage = document.createElement("img");
  logoImage.src = "src/images/photos/png/sandqvist_logo.png";
  logoImage.alt = "Sandqvist Logo";

  const rightSection = document.createElement("div");
  rightSection.classList.add("navbar_right__container");

  const languageSelector = document.createElement("a");
  languageSelector.href = "#";
  languageSelector.textContent = "EN/SEK";

  const iconsSection = document.createElement("div");
  iconsSection.classList.add("navbar_icons__container");

  const searchSvg = document.createElement("img");
  searchSvg.src = "src/images/icons/svg/Search.svg";
  searchSvg.alt = "Search";

  const cartSvg = document.createElement("img");
  cartSvg.src = "src/images/icons/svg/shoppingbag.svg";
  cartSvg.alt = "Cart";

  const hamburgerMenu = document.createElement("div");
  hamburgerMenu.classList.add("navbar_hamburger__container");

  const hamburgerSvg = document.createElement("img");
  hamburgerSvg.src = "src/images/icons/svg/Hamburger Icon.svg";
  hamburgerSvg.alt = "Hamburger menu";
  hamburgerMenu.appendChild(hamburgerSvg);

  navbar.appendChild(leftSection);
  logoSection.appendChild(logoImage);
  rightSection.appendChild(languageSelector);
  rightSection.appendChild(iconsSection);
  iconsSection.appendChild(searchSvg);
  iconsSection.appendChild(cartSvg);

  navbar.appendChild(logoSection);
  navbar.appendChild(rightSection);
  navbar.appendChild(hamburgerMenu);

  navbarWrapper.appendChild(navbar);

  // On click event listeners

  logoSection.addEventListener("click", () => {
    window.location.href = "/";
  });
}

// Create modal that opens when hamburger is clicked

const hamburgerOverlay = document.createElement("div");
hamburgerOverlay.id = "hamburger_overlay";
hamburgerOverlay.style.display = "none";
document.body.appendChild(hamburgerOverlay);

const hamburgerModal = document.createElement("div");
hamburgerModal.classList.add("hamburger_menu__closed");
document.body.appendChild(hamburgerModal);

const openHamburgerMenu = document.querySelector(
  ".navbar_hamburger__container"
);
document.addEventListener("click", (event) => {
  if (event.target?.closest(".navbar_hamburger__container")) {
    console.log("Hamburger menu clicked");
    hamburgerOverlay.style.display = "block";
    hamburgerModal.classList.add("hamburger_menu__open");
    document.body.classList.add("body_hamburger__open");
  }
});

const closeHamburgerIcon = document.createElement("img");
closeHamburgerIcon.src = "src/images/icons/svg/cross.svg";
closeHamburgerIcon.alt = "Close menu";
closeHamburgerIcon.classList.add("hamburger_menu__cross");

hamburgerModal.appendChild(closeHamburgerIcon);

closeHamburgerIcon.addEventListener("click", () => {
  hamburgerOverlay.style.display = "none";
  hamburgerModal.classList.remove("hamburger_menu__open");
  document.body.classList.remove("body_hamburger__open");
});

document.addEventListener("DOMContentLoaded", createNavbar);
