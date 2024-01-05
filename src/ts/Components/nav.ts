import "../../scss/main.scss";

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
  hamburgerSvg.src = "src/images/icons/svg/Burger.svg";
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
}

document.addEventListener("DOMContentLoaded", createNavbar);
