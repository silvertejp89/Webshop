import { IProduct } from "../models/IProduct";
import "../../scss/main.scss";

// Get the id from the URL which was added from redirect of a product card

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const productId = getProductIdFromUrl();

// Fetch JSON list and return the IProduct with the ID in the URL

function getProductDetails(productId: string): Promise<IProduct | undefined> {
  return fetch("src/data/products.json")
    .then((response) => response.json())
    .then((data: IProduct[]) => {
      for (const product of data) {
        if (product.id.toString() === productId) {
          return product;
        }
      }
      return undefined;
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      return undefined;
    });
}

//  Create HTML

function createProductDetailsHTML(product: IProduct) {
  return `
    <div class="product-hero">
      <div class="product-thumbnail">
        <img src="${product.thumbnail_image}" alt="${product.name} Thumbnail">
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Color:${product.color}</p>
        <p>Size: ${product.size}</p>
        <p>Price: ${product.priceSEK} SEK</p>
        <p>Measurement: ${product.measurement}</p>
        <button>Add to cart</button>
      </div>
    </div>
      <div class="product-images">
        <img src="${product.image_back}" alt="${product.name} Back View">
        <img src="${product.image_side}" alt="${product.name} Side View">
      </div>
    `;
}

const productDetailsContainer = document.getElementById(
  "product_details__container"
);

// Check if the container exists and the product ID is available if true call HTML create function

if (productDetailsContainer && productId !== null) {
  getProductDetails(productId).then((productDetails) => {
    if (productDetails) {
      productDetailsContainer.innerHTML =
        createProductDetailsHTML(productDetails);
    } else {
      console.error("Product details not available.");
    }
  });
} else {
  console.error("Product ID not found in the URL");
}
