var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    description: 'These are white socks',
    selectedVariant: 0,
    imageAlt: 'The green socks',
    link: 'https://www.google.com',
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 256,
        variantColor: 'green',
        variantImage: './assets/images/vm_socks_green.jpg',
        variantQuantity: 10,
        onSale: true,
      },
      {
        variantId: 266,
        variantColor: 'blue',
        variantImage: './assets/images/vm_socks_blue.jpg',
        variantQuantity: 0,
        onSale: false,
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
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale
    },
    saleNotification() {
      return this.title + ' is on sale right now!';
    },
  },
});
