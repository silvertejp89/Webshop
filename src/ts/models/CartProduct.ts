//class för att skapa "ny" produkt att lägga i varukorgen.
//Amount lägg till och sätts till 1 som default. "Description" och "measurement" finns inte med.

export class CartProduct {
  id: number;
  name: string;
  thumbnail_image: string;
  color: string;
  priceSEK: number;
  size: string;
  amount: number;

  constructor(
    id: number,
    name: string,
    thumbnail_image: string,
    color: string,
    priceSEK: number,
    size: string,
    amount: number = 1
  ) {
    this.id = id;
    this.name = name;
    this.thumbnail_image = thumbnail_image;
    this.color = color;
    this.priceSEK = priceSEK;
    this.size = size;
    this.amount = amount;
  }
}
