import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private products =  [
      {
        id: '1',
        name: 'Футболка USA',
        priceCurrent: 129,
        priceOld: 229,
        size: 'M',
        color: 'grey',
        quantity: 1,
        image: '/images/product-usa-tshirt.png',
      },
      {
      "id": "2",
      "name": "Купальник Glow",
      "priceCurrent": 129,
      "priceOld": null,
      "size": "S",
      "color": "brown",
      "quantity": 3,
      "image": "/images/product-glow-swimsuit.png"
    },
    {
      "id": "3",
      "name": "Свитшот Sweet Shot",
      "priceCurrent": 129,
      "priceOld": null,
      "size": "L",
      "color": "coral",
      "quantity": 5,
      "image": "/images/product-sweet-shot.png"
    },
    {
      "id": "4",
      "name": "Пальто шерстяное Classic",
      "priceCurrent": 450,
      "priceOld": 599,
      "size": "M",
      "color": "beige",
      "quantity": 2,
      "image": "/images/product-classic-coat.png"
    },
    {
      "id": "5",
      "name": "Кардиган крупной вязки Cozy",
      "priceCurrent": 240,
      "priceOld": null,
      "size": "Oversize",
      "color": "milk",
      "quantity": 7,
      "image": "/images/product-cozy-cardigan.png"
    },
    {
      "id": "6",
      "name": "Свитшот Over Size Black",
      "priceCurrent": 150,
      "priceOld": 199,
      "size": "XL",
      "color": "black",
      "quantity": 12,
      "image": "/images/product-oversize-black.png"
    },
    {
      "id": "7",
      "name": "Пальто кашемировое Luxe",
      "priceCurrent": 680,
      "priceOld": 850,
      "size": "S",
      "color": "camel",
      "quantity": 1,
      "image": "/images/product-luxe-coat.png"
    },
    {
      "id": "8",
      "name": "Кардиган удлиненный Soft",
      "priceCurrent": 195,
      "priceOld": null,
      "size": "M",
      "color": "grey-melange",
      "quantity": 4,
      "image": "/images/product-soft-cardigan.png"
    },
    {
      "id": "9",
      "name": "Свитшот с начесом Chill",
      "priceCurrent": 135,
      "priceOld": 169,
      "size": "M",
      "color": "mint",
      "quantity": 8,
      "image": "/images/product-chill-sweatshirt.png"
    },
    {
      "id": "10",
      "name": "Пальто демисезонное двубортное",
      "priceCurrent": 390,
      "priceOld": null,
      "size": "L",
      "color": "dark-blue",
      "quantity": 3,
      "image": "/images/product-double-breasted-coat.png"
    },
    {
      "id": "11",
      "name": "Кардиган на пуговицах Vintage",
      "priceCurrent": 180,
      "priceOld": 240,
      "size": "S",
      "color": "burgundy",
      "quantity": 6,
      "image": "/images/product-vintage-cardigan.png"
    },
    {
      "id": "12",
      "name": "Свитшот базовый Minimal",
      "priceCurrent": 110,
      "priceOld": null,
      "size": "XS",
      "color": "white",
      "quantity": 15,
      "image": "/images/product-minimal-sweatshirt.png"
    },
    {
      "id": "13",
      "name": "Пальто-рубашка клетчатое Wood",
      "priceCurrent": 290,
      "priceOld": 380,
      "size": "M",
      "color": "brown-check",
      "quantity": 5,
      "image": "/images/product-wood-coat.png"
    },
    {
      "id": "14",
      "name": "Кардиган ажурный Summer Breeze",
      "priceCurrent": 165,
      "priceOld": null,
      "size": "S",
      "color": "cream",
      "quantity": 2,
      "image": "/images/product-breeze-cardigan.png"
    },
    {
      "id": "15",
      "name": "Свитшот с принтом Retro",
      "priceCurrent": 145,
      "priceOld": 185,
      "size": "L",
      "color": "navy",
      "quantity": 9,
      "image": "/images/product-retro-sweatshirt.png"
    }
  ]




  getAll() {
    return this.products;
  }
 getOne(id: string) {
    return this.products.find((product) => product.id === id) || { message: 'Товар не найден' };
  }
}
