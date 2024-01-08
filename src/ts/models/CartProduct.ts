// //class för att skapa "ny" produkt att lägga i varukorgen. Amount sätts till 1 som default. 

// export class CartProduct {
//     id: number;
//     name: string;
//     thumbnail_image: string;
//     color: string;
//     size: string;
//     priceSEK: number;
//     amount: number;
  
//     constructor(id: number, name: string, thumbnail_image: string, color: string, size: string, priceSEK: number, amount: number = 1) {
//       this.id = id;
//       this.name = name;
//       this.thumbnail_image = thumbnail_image;
//       this.color = color;
//       this.size = size;
//       this.priceSEK = priceSEK;
//       this.amount = amount;
//     }
//   }

//förenklad klass--------------------------------------------------------------
export class CartProduct {
    id: number;
    name: string;
    thumbnail_image: string;
    amount: number;
    price: number;
  
    constructor(id: number, name: string, thumbnail_image: string, amount: number = 1, price: number) {
      this.id = id;
      this.name = name;
      this.thumbnail_image = thumbnail_image;
      this.amount = amount; 
      this.price = price;
    }
  }