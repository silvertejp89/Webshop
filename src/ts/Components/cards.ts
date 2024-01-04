import "../../scss/main.scss";

// Create HTMLElements in DOM for Product card

function createProductCard(product: any): HTMLElement {
  const cardContainer = document.createElement("div");
  cardContainer.className = "product_card";

  const productImage = document.createElement("img");
  productImage.src = product.thumbnail_image;
  cardContainer.appendChild(productImage);

  const productInfo = document.createElement("div");
  productInfo.className = "product_info__hidden";
  cardContainer.appendChild(productInfo);

  const productPrice = document.createElement("span");
  productPrice.className = "product_card__price";
  productPrice.textContent = `${product.priceSEK.toFixed(2)}SEK`;
  productInfo.appendChild(productPrice);

  const productName = document.createElement("span");
  productName.className = "product_card__name";
  productName.textContent = product.name;
  productInfo.appendChild(productName);

  return cardContainer;
}
