<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to Django Shop
            </p>
            <p class="subtitle">
                The best online Shop in the world!
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <div class="column is-3"
      v-for="product in latestProducts"
      :key="product.id">

      <div class="box">
        <figure class="image mb-3">
          <img :src="product.get_thumbnail" alt="">
        </figure>

        <h3 class="is-size-4">{{product.name}}</h3>
        <p class="is-size-6 has-text-grey">${{product.price}}</p>

        <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
  },
  mounted() {
    this.getLatestProducts()
    document.title = 'Home | Django-Shop'
  },
  methods: {
    async getLatestProducts() {
      await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
