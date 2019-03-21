<template>
  <h1>Showing event #{{ id }}</h1>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
