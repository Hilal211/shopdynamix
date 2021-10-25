<template>
  <div>
    <table v-if="myProduct.length" class="cart">
      <tr>
        <th>Product</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="(product, index) in myProduct" :key="index">
        <td>
          <div class="cart-info">
            <img v-if="product.image" :src="`http://localhost/loginProject/api/images/products/${product.image}`" alt="" />
            <div>
              <span>{{ product.name }}</span><br/>
              <span>Price: {{ product.price }}</span>
              <br />
              <a href="#" @click="remove(index)">remove</a>
            </div>
          </div>
        </td>
        <td>
          <input
            type="number"
            :value="product.quantityS"
            :min="1"
            :max="product.quantity"
            @change="
              (e) => {
                update(index, e.target.value);
              }"
          />
        </td>
      </tr>
    </table>
    <div v-else class="empty">your cart is empty</div>
    <div class="checkoutC">
      <v-btn
        class="checkout btn-style"
        v-if="myProduct.length"
        @click="goToCheckout"
      >
        <v-icon size="24px">mdi-cart</v-icon>&nbsp;&nbsp;Checkout</v-btn
      >
    </div>
  </div>
</template>
<style scoped>
.cart {
  margin: 50px auto;
  width: 95%;
}
.cart table {
  width: 100%;
  border-collapse: collapse;
}
.cart-info {
  display: flex;
  flex-wrap: wrap;
}
.cart th {
  text-align: left;
  padding: 0.5rem;
  color: #fff;
  background-color: #fc7c7c;
  font-weight: normal;
}
td {
  padding: 1rem 0.5rem;
}
td input {
  width: 5rem;
  height: 3rem;
  padding: 0.5rem;
  outline: none;
}
td a {
  color: orangered;
  font-size: 1.4rem;
}
.cart td img {
  width: 8rem;
  height: 8rem;
  margin-right: 1rem;
}
.cart .total-price {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex-direction: column;
  margin-top: 2rem;
}

.cart .total-price table {
  border-top: 3px solid #fc7c7c;
  width: 100%;
  max-width: 35rem;
}
.cart td:last-child {
  text-align: right;
}
th:last-child {
  text-align: right;
}
.empty {
  background-color: var(--first-color);
  font-size: 40px;
  padding: 60px;
  text-align: center;
  margin: 100px auto;
  margin-top: 200px;
  border-radius: 25px;
}
.checkout {
  margin-bottom: 50px;
}
.checkoutC {
  text-align: center !important;
}
@media only screen and (max-width: 567px) {
  .cart-info p {
    display: none;
  }
}
</style>
<script src="./script.js"></script>
