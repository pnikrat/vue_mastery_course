<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ categoriesLength }} categories</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    categoriesLength() {
      return this.$store.getters.categoriesLength;
    },
    ...mapState(['user', 'categories']),
  },
};
</script>
