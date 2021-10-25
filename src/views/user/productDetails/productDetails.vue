<template>
  <div>
    <v-container class="mt">
      <v-row><h1 class="titleDetails">Product Details</h1></v-row>
      <v-row>
        <v-col v-if="productDetails.image">
          <img
            :src="
              `http://localhost/loginProject/api/images/products/${productDetails.image}`
            "
            class="image"
        /></v-col>
        <v-col>
          <div>
            <h2 class="nameProduct">{{ productDetails.name }}</h2>
            <p>Price:{{ productDetails.price }}</p>
            <p>Quantity:{{ productDetails.quantity }}</p>
            <p>{{ productDetails.summary }}</p>
            <v-btn @click="AddTocart" class="btn-style">Add TO Cart</v-btn>
            <span>{{quantity}}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="msg" max-width="340">
      <v-card>
        <v-card-title class="headline">Shop</v-card-title>
        <v-card-text>
          {{msgContent}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="msg = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<style scoped>
.mt {
  margin-top: 60px;
  width: 70%;
}
.titleDetails {
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px var(--first-color);
}
.image {
  width: 400px;
  height: 400px;
  border: 2px solid var(--first-color);
  border-radius: 25px;
}
.nameProduct {
  color: var(--first-color);
  font-size: 40px;
  margin-bottom: 50px;
}
@media only screen and (max-width: 600px) {
  .image {
    width: 200px;
    height: 200px;
  }
}
</style>
<script src="./script.js"></script>
