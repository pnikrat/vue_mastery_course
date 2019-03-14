var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'These are white socks',
    image: './assets/images/vm_socks_green.jpg',
    imageAlt: 'The green socks',
    link: 'https://www.google.com',
    inStock: true,
    onSale: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 256,
        variantColor: 'green',
        variantImage: './assets/images/vm_socks_green.jpg',
      },
      {
        variantId: 266,
        variantColor: 'blue',
        variantImage: './assets/images/vm_socks_blue.jpg',
      }
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) this.cart -= 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    },
  }
});
