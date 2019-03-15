Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <a :href="link" >
          <img :src="image" :alt="imageAlt" />
        </a>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <span v-if="onSale">{{ saleNotification }}</span>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ 'striked-out': !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <detail :details="detail" v-for="detail in details"></detail>
        </ul>

        <div v-for="(variant, index) in variants"
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <span class="inline" v-for="size in sizes" :key=size>{{ size }}</span>

        <div>
          <button @click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
              Add to Cart
          </button>
          <button @click="removeFromCart">Remove from Cart</button>
          <div class="cart">
            <p>Cart({{ cart }})</p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
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
    };
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
    shipping() {
      if (this.premium) {
        return 'Free';
      } else {
        return 2.99;
      }
    },
  },
});

Vue.component('detail', {
  props: {
    details: {
      type: String,
      required: true,
    },
  },
  template: `
    <li>{{ details }}</li>
  `,
});


var app = new Vue({
  el: '#app',
  data: {
    premium: true,
  },
});

Vue.config.devtools = true;
