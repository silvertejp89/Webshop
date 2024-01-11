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

      <div class="product_info">
        <p class="pdp_product__category">EVERYDAY ORIGINALS</p>
        <p class="pdp_product__name">${product.name}</p>
            
            <div class="product_info__price">
                <span>${product.priceSEK}.00 SEK</span>
                <img src="src/images/icons/svg/star.svg">
            </div>

        <p class="pdp_product__desc">${product.description}</p>

        <div class="product_details__container">
            <span>Measurement: ${product.measurement}</span>
            <p>DELIVERY</p>
            <p>DETAILS</p>  
        </div>

        <div class="pdp_size__wrapper">
            <span>Size</span>
            <span id="pdp_onesize">${product.size}</span>
        </div>

        <button class="button_lg">Add to cart</button>

    </div>

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
