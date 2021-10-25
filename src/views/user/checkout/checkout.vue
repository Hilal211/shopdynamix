<template>
  <div class="containerLogin">
    <v-container>
      <div class="aboveallloading" v-if="loading">
      <img
        class="loadingimg"
        alt="Loading"
        src="@/assets/images/Spinner-loader.svg"
      />
    </div>
      <v-row class="checkoutTitle">
        <h1>CHECKOUT</h1>
      </v-row>
      <v-row>
        <v-col >
          <v-form ref="form" class="form">
            <v-row no-gutters justify="center" align-content="center" class="form">
              <v-col cols="8" class="field-col">
                <div>Email *</div>
                <v-text-field
                  label="Email"
                  solo
                  flat
                  elevation="0"
                  v-model="user.email"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center" align-content="center">
              <v-col cols="8" class="field-col">
                <div>Notes *</div>
                <v-textarea
                  v-model="notes"
                  solo
                  flat
                  elevation="0"
                  name="input-7-4"
                  label="Add your note"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center" align-content="center">
              <v-col cols="8"> </v-col>
            </v-row>
            <v-row
              no-gutters
              justify="center"
              align-content="center"
              class="mb-5"
            >
              <v-col cols="8" class="align-end mt-5 button-submit">
                <v-btn
                  class="btn btn-style"
                  id="login_button"
                  @click="submitCheckout"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col>
          <v-card
            v-for="(product, index) in myProduct"
            :key="index"
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ product.name }}
                </v-list-item-title>
                <v-list-item-subtitle>Quantity:{{product.quantityS}}</v-list-item-subtitle>

                <v-list-item-subtitle
                  >Price:{{ product.price }}$</v-list-item-subtitle
                >
                <v-list-item-subtitle>{{
                  product.summary
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <img
                  :src="
                    `http://localhost/loginProject/api/images/products/${product.image}`
                  "
                />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="msg" max-width="340">
      <v-card>
        <v-card-title class="headline">Shop</v-card-title>
        <v-card-text>
          {{ msgContent }}
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

<script>
export default {};
</script>

<style scoped>
.checkoutTitle {
  margin: 20px auto;
}
.checkoutTitle h1 {
  margin: 2px auto;
}
.containerLogin {
  margin: 60px 4% !important;
  background-color: rgb(217, 223, 223);
  margin: auto;
  padding: 50px 2%;
  border-radius: 20px;
}
.btn {
  float: right;
}

</style>
<script src="./script.js"></script>
