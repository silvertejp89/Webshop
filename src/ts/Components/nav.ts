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

  createHamburgerOpen();
}

function createHamburgerOpen(): void {
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

  openHamburgerMenu?.addEventListener("click", () => {
    console.log("Hamburger menu clicked");
    hamburgerOverlay.style.display = "block";
    hamburgerModal.classList.add("hamburger_menu__open");
    document.body.classList.add("body_hamburger__open");
    //}
  });

  const hamburgerOpenNav = document.createElement("div");
  hamburgerOpenNav.classList.add("hamburger_nav__container");

  const hamburgerNavLogo = document.createElement("div");
  hamburgerNavLogo.classList.add("navbar_logo__container");

  const hamburgerLogoImage = document.createElement("img");
  hamburgerLogoImage.src = "src/images/photos/png/sandqvist_logo.png";
  hamburgerLogoImage.alt = "Sandqvist Logo";

  const searchSvg = document.createElement("img");
  searchSvg.src = "src/images/icons/svg/Search.svg";
  searchSvg.alt = "Search";

  const cartSvg = document.createElement("img");
  cartSvg.src = "src/images/icons/svg/shoppingbag.svg";
  cartSvg.alt = "Cart";

  const closeHamburgerIcon = document.createElement("img");
  closeHamburgerIcon.src = "src/images/icons/svg/cross.svg";
  closeHamburgerIcon.alt = "Close menu";

  const hamburgerNavIcons = document.createElement("div");
  hamburgerNavIcons.classList.add("hamburger_menu__icons");

  closeHamburgerIcon.classList.add("hamburger_menu__cross");

  const hamburgerNavLinksList = document.createElement("div");
  hamburgerNavLinksList.classList.add("hamburger_link__list");

  const hamburgerNavLinks = ["Contact us", "Collections", "Sustainability"];

  for (const text of hamburgerNavLinks) {
    const link = document.createElement("a");
    link.href = `#${text.toLowerCase().replace(/\s/g, "-")}`;
    link.textContent = text;

    link.addEventListener("click", function (event) {
      event.preventDefault();

      if (text === "Collections") {
        hamburgerCollectionLinks.style.display = "flex";
      } else {
        hamburgerCollectionLinks.style.display = "none";
      }
      hamburgerNavLinksList.querySelectorAll("a").forEach((link) => {
        link.classList.remove("link_clicked");
      });
      link.classList.add("link_clicked");
    });

    hamburgerNavLinksList.appendChild(link);
  }

  const hamburgerCollectionLinks = document.createElement("div");
  hamburgerCollectionLinks.classList.add("hamburger_links__wrapper");

  const hamburgerCollectionLinksList = [
    "Fusion",
    "Hike",
    "Urban Outdoor",
    "Everyday Originals",
  ];
  for (const text of hamburgerCollectionLinksList) {
    const image = document.createElement("img");
    image.src = `src/images/photos/png/${text
      .toLowerCase()
      .replace(/\s/g, "-")}.jpeg`;

    const container = document.createElement("div");
    container.classList.add("hamburger_links__container");

    const link = document.createElement("a");
    link.href = `#${text.toLowerCase().replace(/\s/g, "-")}`;
    link.textContent = text;

    container.appendChild(image);
    container.appendChild(link);

    hamburgerCollectionLinks.appendChild(container);
  }

  hamburgerNavIcons.appendChild(searchSvg);
  hamburgerNavIcons.appendChild(cartSvg);
  hamburgerNavIcons.appendChild(closeHamburgerIcon);

  hamburgerModal.appendChild(hamburgerOpenNav);
  hamburgerModal.appendChild(hamburgerNavLinksList);
  hamburgerModal.appendChild(hamburgerCollectionLinks);

  hamburgerOpenNav.appendChild(hamburgerNavLogo);
  hamburgerOpenNav.appendChild(hamburgerNavIcons);

  hamburgerNavLogo.appendChild(hamburgerLogoImage);

  closeHamburgerIcon.addEventListener("click", () => {
    hamburgerOverlay.style.display = "none";
    hamburgerModal.classList.remove("hamburger_menu__open");
    document.body.classList.remove("body_hamburger__open");
  });
}

// Nav bar dissapears on scroll

const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    document.body.classList.remove(scrollUp);
    return;
  }
  if (
    currentScroll > lastScroll &&
    !document.body.classList.contains(scrollDown)
  ) {
    //Scrolling down
    document.body.classList.remove(scrollUp);
    document.body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    document.body.classList.contains(scrollDown)
  ) {
    //Scrolling down
    document.body.classList.remove(scrollDown);
    document.body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

document.addEventListener("DOMContentLoaded", createNavbar);
