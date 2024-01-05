//Uträkningar för totalt antal och totalt kostnad. 
//anpassa koden efter de riktiga objekten. 


import "../../scss/main.scss"

export let cart: CartProduct[] = [];

//förenklad klass--------------------------------------------------------------
export class CartProduct {
    id: number;
    name: string;
    thumbnail_image: string;
    amount: number;
  
    constructor(id: number, name: string, thumbnail_image: string, amount: number = 1) {
      this.id = id;
      this.name = name;
      this.thumbnail_image = thumbnail_image;
      this.amount = amount; 
    }
  }

//mock-data-------------------------------------------------------------------------
const mock: {id: number; name: string; thumbnail_image: string }[] = [
    {
        id: 8,
        name: "Noa",
        thumbnail_image: "src/images/photos/Noa_product_image.png",
    },
    {
        id: 9,
        name: "Iris",
        thumbnail_image: "src/images/photos/Iris_product_image.png",
    },
    {
      id: 10,
      name: "Greta",
      thumbnail_image: "src/images/photos/Iris_product_image.png",
  },
  {
    id: 11,
    name: "Chlaes",
    thumbnail_image: "src/images/photos/Iris_product_image.png",
}
];

//enkel createHTML kanske sedan kan heta createHTMLProducts?------------------------------
// Sparar referensen till container-elementet för mock-produkter
const mockContainer = document.querySelector(".mock-container");

// Sparar referensen till container-elementet för varukorgen
const cartContainer = document.querySelector(".cart-container");

export function createHTMLMock(): void {

    // const container = document.querySelector(".container");

    //Använda "Non-null assertion operator" för att undvika squigglies? 
    
    mockContainer.innerHTML = "";
    for (let i = 0; i < mock.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card");
      const text = document.createElement("h3");

      const submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Lägg till";
      submitBtn.addEventListener("click", () => {
        createCartProduct(i);
      });
  
      card.appendChild(text);
      card.appendChild(submitBtn);
      mockContainer.appendChild(card);
  
      text.innerHTML = mock[i].name;
    }
  };

  createHTMLMock();

  //CART HTML------------------------------------------------------------------------
export function createHTMLCart() {
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

      //mängd
      const amountText = document.createElement("h2");
      card.appendChild(amountText);
      amountText.innerHTML = String(cart[i].amount);

      //ta bort-knapp
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "Ta bort";
      removeBtn.addEventListener("click", () => {
        deleteCartProduct(i);
      });
      card.appendChild(removeBtn);

      //Lägg card i container
      cartContainer.appendChild(card);
    }
  };

  //LÄGG TILL-knapp-funktion------------------------------
  export function createCartProduct(i: number) {

    const id = mock[i].id;
    const name = mock[i].name;
    const thumbnail_image = mock[i].thumbnail_image;
    //------------------------------------------------------------------------------

    //Om id redan existerar i cart[] ska det inte skapas ett nytt objekt.
    //dvs. loopa genom cart-listan och jämför med mock[i].id,

    let foundObject = null; 
    cart.forEach((product) => {
      if (product.id === id) {
        foundObject = product;
      }
    });

    if (foundObject) {
      foundObject.amount++;
      console.log("Objekt finns redan:", foundObject);
      //gå in i carten och plussa på 1 i amount
      console.log(foundObject.amount);
      createHTMLCart();
    } else {
      const newCartProduct = new CartProduct(id, name, thumbnail_image)

      cart.push(newCartProduct);
      createHTMLCart();
      console.log("Din varukorg: ", cart.length, cart);
    }

    // const totalAmount = cart.reduce((sum, product) => sum + product.amount. 0);
    // console.log("Total amount :", totalAmount);
  };
  
  export function deleteCartProduct(i: number) {
    cart.splice(i, 1);
    createHTMLCart();
  }

  export function decreaseAmount(i: number){

    if (cart[i].amount > 1){
      cart[i].amount --;
      console.log(cart);
      createHTMLCart();
    } else {
      deleteCartProduct(i);
    };
  }

  export function increaseAmount(i: number){
    cart[i].amount ++;
    console.log(cart);
    createHTMLCart();
  } 


  
