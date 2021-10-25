<template>
  <div class="mt">
    <v-carousel :show-arrows="false" class="mb-7 slider">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <div class="titeHome"><h1>All Products</h1></div>
    <v-row no-gutters justify="start" align="stretch">
      <v-card
        v-for="(product, index) in products"
        :key="index"
        class="mx-auto mb-8 cartProduct"
        max-width="344"
      >
        <router-link :to="{ path: `/productdetails/${product.id}` }">
          <v-img
            :src="
              `http://localhost/loginProject/api/images/products/${product.image}`
            "
            height="200px"
          ></v-img>

          <v-card-title class="titleCard">
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle class="descCard">
            {{ product.summary }}
          </v-card-subtitle>
        </router-link>
      </v-card>
    </v-row>
    <v-col cols="12" class="align-center my-9">
      <v-pagination
        v-model="page"
        :total-visible="5"
        :length="paginationSize"
        @input="filterProducts($event)"
      ></v-pagination>
    </v-col>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.titeHome {
  text-align: center;
  margin: 20px;
  text-transform: uppercase;
  color: var(--first-color);
}
.mt {
  margin-top: 44px;
}
.slider {
  border-radius: 20px;
  width: 100%;
  height: 250px !important;
  margin: 0 auto;
}
.titleCard {
  color: var(--second-color);
}
.descCard {
  color: var(--third-color);
}
.cartProduct:hover {
  box-shadow: 1px 1px 15px var(--first-color) !important;
  transition: 0.3s;
}
.cartProduct:hover .titleCard {
  color: var(--first-color);
  transition: 0.3s;
}
</style>
<script src="./script.js"></script>
