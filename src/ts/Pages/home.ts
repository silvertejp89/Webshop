import "../../scss/main.scss";

import { createFooterHtml } from "../Components/footer";

import { createNavbar } from "../Components/nav.ts";
import { navbarHideShowScroll } from "../Components/nav.ts";

import { IProduct } from "../Models/IProduct.ts";

createFooterHtml();

createNavbar();

navbarHideShowScroll();

export function createProductCard(product: IProduct): HTMLElement {
  const cardContainer = document.createElement("div");
  cardContainer.className = "product_card";
  cardContainer.addEventListener("click", () => {
    location.href = "index.html?id=" + product.id;
  });

  const imageContainer = document.createElement("div");
  imageContainer.className = "product_image__container";
  cardContainer.appendChild(imageContainer);

  const productImage = document.createElement("img");
  productImage.className = "product_image";
  productImage.src = product.thumbnail_image;
  imageContainer.appendChild(productImage);

  const productInfo = document.createElement("div");
  productInfo.className = "product_info__hidden";
  cardContainer.appendChild(productInfo);

  const productInfoDetails = document.createElement("div");
  productInfoDetails.className = "product_info__details";
  productInfo.appendChild(productInfoDetails);

  const productName = document.createElement("span");
  productName.className = "product_card__name";
  productName.textContent = product.name;
  productInfoDetails.appendChild(productName);

  const productPrice = document.createElement("span");
  productPrice.className = "product_card__price";
  productPrice.textContent = `${product.priceSEK.toFixed(2)}SEK`;
  productInfoDetails.appendChild(productPrice);

  const addToFavoriteSvg = document.createElement("svg");
  addToFavoriteSvg.setAttribute("class", "favorite_icon");

  const svgContainer = document.createElement("div");
  svgContainer.className = "product_star__container";
  productInfo.appendChild(svgContainer);

  fetch("src/images/icons/svg/star.svg")
    .then((response) => response.text())
    .then((svgContent) => {
      addToFavoriteSvg.innerHTML = svgContent;

      svgContainer.appendChild(addToFavoriteSvg);
    })
    .catch((error) => console.error("Error loading SVG:", error));

  return cardContainer;
}

// Function to fetch 4 random products from products.json async

export async function fetchDataAndCreateCards() {
  try {
    const response = await fetch("src/data/products.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    for (let i = 0; i < Math.min(4, data.length); i++) {
      const productCard = createProductCard(data[i]);
      const wrapper = document.getElementById("home_product__cards");
      wrapper?.appendChild(productCard);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchDataAndCreateCards();
