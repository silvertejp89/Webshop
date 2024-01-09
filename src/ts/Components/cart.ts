//Ska carten sparas i localstorage? antagligen. 

import "../../scss/main.scss"
import { CartProduct } from "../models/CartProduct";

export let cart: CartProduct[] = []

//mock-data-------------------------------------------------------------------------
const mock: {id: number; name: string; thumbnail_image: string; image_back: string; image_side: string; 
  color: string; priceSEK: number, description: string; measurement: string, size: string}[] = [
  {   
    "id": 1,
    "name": "Olof",
    "thumbnail_image": "src/images/photos/Olof_product_image.png",
    "image_back": "src/images/photos/Olof_back.png",
    "image_side": "src/images/photos/Olof_side.png",
    "color": "Black",
    "priceSEK": 895.00,
    "description": "Funktionell och vattenavvisande cross-body väska tillverkad i 100% återvunnen polyester. Väskan är designad med två innerfickor, en avtagbar och justerbar axelrem och ett handtag. En perfekt extraväska för de dagar du bara behöver packa det viktigaste.",
    "measurement": "24 x 16 x 9 cm",
    "size": "One size"
},
{
    "id": 2,
    "name": "Dante Vegan",
    "thumbnail_image": "src/images/photos/Dante_product_image.png",
    "image_back": "src/images/photos/Dante_back_picture.png",
    "image_side": "src/images/photos/Dante_side_product.png",
    "color": "Black",
    "priceSEK": 1395.00,
    "description": "Dante Vegan är en rymlig och vattenavvisande rolltop-ryggsäck skapad för att kunna användas varje dag, oavsett om du pendlar till jobbet eller är ute i naturen. Dante Vegan en variant av vår bästsäljande modell Dante, men gjord utan läderdetaljer och i 100% återvunna och veganska material. Väskan stängs med ett spänne i metall och rymmer mellan 16–23 L. Ryggsäcken har två innerfack, varav ett passar de flesta datorer upp till 16 tum. Vadderade axelremmar för skön bärkomfort och ytterfack med dragkedja, samt handtag på sidan. Det här är en hållbar ryggsäck med hög kvalitet och tidlös design, som du kan använda och älska länge. Dante Vegan är en del av vår Ground-kollektion. Här hittar du fler väskor i samma serie.",
    "measurement": "26 x 43/56 x 16 cm",
    "size": "One size"
},
{
    "id": 3,
    "name": "Tony Vegan",
    "thumbnail_image": "src/images/photos/Tony_product_image.png",
    "image_back": "src/images/photos/Tony_back.png",
    "image_side": "src/images/photos/Tony_side.png",
    "color": "Green",
    "priceSEK": 1295.00,
    "description": "Ryggsäck i 100 % återvunnen polyester med vattentät TPU-beläggning. Väskan har ett 15' laptopfack, en yttrerficka med blixtlås och kan bära upp till 13 L. Funktionaliteten och den minimalistiska designen gör denna ryggsäck till en idealisk följeslagare, vart du än går.",
    "measurement": "27 x 42 x 12 cm",
    "size": "One size"
},
{
    "id": 4,
    "name": "Kurt",
    "thumbnail_image": "src/images/photos/Kurt_product_image.png",
    "image_back": "src/images/photos/Kurt_back.png",
    "image_side": "src/images/photos/Kurt_side.png",
    "color": "Pink",
    "priceSEK": 1295.00,
    "description": "Kurt är en minimalistisk, mångsidig och slitstark rolltop-ryggsäck med fina läderdetaljer. Den rymmer upp till 17 L och är gjord av vattenavvisande och 100% återvunnen polyester. Kurt har justerbara axelremmar, ett dolt ytterfack med dragkedja, samt ett laptopfack som passar de flesta datorer upp till 16 tum. Denna ryggsäck är perfekt att använda varje dag, oavsett om du pendlar till jobbet eller är ute i naturen. Kurt är ett av de senaste tillskotten i vår Ground-kollektion. Här hittar du fler väskor i samma serie.",
    "measurement": "27 x 38 x 15 cm",
    "size": "One size"
}
];
//----------------------------------------------------

const mockContainer = document.querySelector(".mock-container");
const cartContainer = document.querySelector(".cart-container");
  
export function createHTMLProducts(): void {

    if(!mockContainer) return;
    mockContainer.innerHTML = "";
    for (let i = 0; i < mock.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card");
      const text = document.createElement("h3");

      const priceText = document.createElement("h4");
    
      const submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Lägg till";
      submitBtn.addEventListener("click", () => {
        createCartProduct(i);
      });
  
      card.appendChild(text);
      card.appendChild(priceText);
      card.appendChild(submitBtn);
      mockContainer?.appendChild(card);

      text.innerHTML = mock[i].name;
      priceText.innerHTML = String(mock[i].priceSEK) + " kr";

    }
  };

  createHTMLProducts();

  //CART HTML------------------------------------------------------------------------
export function createHTMLCart() {
  if(!cartContainer) return;
    cartContainer.innerHTML = "";


    for (let i = 0; i < cart.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card2");

      //Produktnamn
      const text = document.createElement("h3");
      card.appendChild(text);
      text.innerHTML = cart[i].name;

      //minska-mängd-knapp
      const decreaseBtn = document.createElement("button");
      decreaseBtn.innerHTML = "-"
      decreaseBtn.addEventListener("click", () => {
        decreaseAmount(i);
      });
      card.appendChild(decreaseBtn);

      //öka-mängd-knapp
      const increaseBtn = document.createElement("button");
      increaseBtn.innerHTML = "+"
      increaseBtn.addEventListener("click", () => {
        increaseAmount(i);
      });
      card.appendChild(increaseBtn);

      //mängd och totalpris per produkttyp
      const amountText = document.createElement("h2");
      card.appendChild(amountText);
      amountText.innerHTML = String(cart[i].amount) + " st, " + String((cart[i].priceSEK)*(cart[i].amount)) + "kr";

      //ta bort-knapp
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "Ta bort";
      removeBtn.addEventListener("click", () => {
        deleteCartProduct(i);
      });
      card.appendChild(removeBtn);
      //Lägg card i container
      cartContainer?.appendChild(card);
           
    }
    createHTMLProducts();

    calculateAmount();
    
    calculateTotalPrice();

    // dessa har hittats med queryselector längst ner. 
    if(!amountCounter) return;
    amountCounter.textContent = `${totalAmount}` + " produkter, ";
    if(!priceCounter) return;
    priceCounter.textContent = `${totalPrice}` + " kr";
  };

  //LÄGG TILL-knapp-funktion------------------------------
  export function createCartProduct(i: number) {
    const id = mock[i].id;
    const name = mock[i].name;
    const thumbnail_image = mock[i].thumbnail_image;
    const price = mock[i].priceSEK;
    const color = mock[i].color;

    let foundProductInCart = false;
    cart.forEach((product, i) => {
      if (product.id === id) {
        cart[i].amount++;
        foundProductInCart = true;
      }
    });

    if (!foundProductInCart) {
      const newCartProduct = new CartProduct(id, name, thumbnail_image, color, price)
      cart.push(newCartProduct);
      console.log("Din varukorg: ", cart.length, cart);
    } 
    createHTMLCart();
  };


  //Delete product------------------------------------
  export function deleteCartProduct(i: number) {
    cart.splice(i, 1);
    createHTMLCart();
  }

  //Decrease amount-------------------------------------
  export function decreaseAmount(i: number){

    if (cart[i].amount > 1){
      cart[i].amount --;
      console.log(cart);
      createHTMLCart();
    } else {
      deleteCartProduct(i);
    };
  }

  //Increase amount-------------------------------------------
  export function increaseAmount(i: number){
    cart[i].amount ++;
    console.log(cart);
    createHTMLCart();
  } 

  //Total amount & total price---------------------------------
  const amountCounter = document.querySelector(".amountCounter");
  const priceCounter = document.querySelector(".priceCounter");
  console.log(amountCounter);

  let totalAmount = 0;
  let totalPrice = 0;

  export function calculateAmount() {
    totalAmount = 0;
    for (let i = 0; i < cart.length; i++) {
      totalAmount += cart[i].amount;
    }
  };

  export function calculateTotalPrice() {
    totalPrice = 0;


    for (let i = 0; i < cart.length; i++) {
      console.log("cart amount: ",cart[i].amount)
      console.log("cart price: ",cart[i].priceSEK)


      totalPrice += cart[i].amount * cart[i].priceSEK;
      console.log("total price:" ,totalPrice);
    }
  };



