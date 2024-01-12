interface IProduct {
  id: number;
  name: string;
  thumbnail_image: string;
  image_back: string;
  image_side: string;
  color: string;
  priceSEK: number;
  description: string;
  measurement: string;
  size: string;
}

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const productId = getProductIdFromUrl();

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

function createProductDetailsHTML(product: IProduct) {
  return `<img src=${product.thumbnail_image}>`;
}

const productDetailsContainer = document.getElementById(
  "product_details__container"
);

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
