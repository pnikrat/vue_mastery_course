var eventBus = new Vue();

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

        <div v-for="(variant, index) in variants"
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <div>
          <button @click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
              Add to Cart
          </button>
          <button @click="removeFromCart">Remove from Cart</button>
        </div>
      </div>

      <product-tabs
        :reviews="reviews"
        :shipping="shipping"
        :details="details"
        :sizes="sizes"
      >
      </product-tabs>

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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
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
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    });
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <p>Would you recommend this product?<p/>
        <label><input type="radio" v-model="recommendation" :value="true">Yes</label>
        <label><input type="radio" v-model="recommendation" :value="false">No</label>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>
    </form>

  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommendation !== null) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;
      } else {
        if (!this.name) this.errors.push('Name required.');
        if (!this.review) this.errors.push('Review required.');
        if (!this.rating) this.errors.push('Rating required.');
        if (this.recommendation === null) this.errors.push('Recommendation required.');
      }
    },
  },
});

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    shipping: {
      type: String || Number,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
      <span
        class="tab"
        :class="{ 'active-tab': selectedTab === tab }"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </span>

      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p v-if="review.recommendation">Would recommend the product</p>
            <p v-else>Would not recommend the product</p>
          </li>
        </ul>
      </div>

      <product-review
        v-show="selectedTab === 'Make a Review'"
      >
      </product-review>

      <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>

      <div v-show="selectedTab === 'Details'">
        <ul>
          <detail :details="detail" v-for="detail in details"></detail>
        </ul>
        <span class="inline" v-for="size in sizes" :key=size>{{ size }}</span>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
      selectedTab: 'Reviews',
    };
  },
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      var index = this.cart.indexOf(id);
      if (index > -1) this.cart.splice(index, 1);
    },
  },
});

Vue.config.devtools = true;
