//class för att skapa "ny" produkt att lägga i varukorgen. 

export class CartProduct {
    id;
    name;
    thumbnail_image;
    color;
    priceSEK;
  
    constructor(id, name, thumbnail_image, priceSEK, color) {
      this.id = id;
      this.name = name;
      this.thumbnail_image = thumbnail_image;
      this.color = color;
      this.priceSEK = priceSEK;
    }
  }
 // någonstans ska vi även lägga till amount.