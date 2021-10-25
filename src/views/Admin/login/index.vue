<template>
    <v-container>
      

  <form class="box-shadow loginStyle" @submit="submit" action="" method="post" novalidate="true">
    <div class="margbot-50">
      <router-link class="" to="/">
        <img src="@/assets/images/logo.png" class="loginformlogosignin" />
      </router-link>
    </div>
    <div class="errors" v-if="errors.length">
      <div :key="index" class="error-msg" v-for="(error, index) in errors">{{error}}</div>
    </div>
    <v-text-field
      name="email"
      type="email"
      color="input"
      v-model="email"
      :error="emailError"
      label="Email Address"
      id="email"
      prepend-icon="email"
    ></v-text-field>
    <v-text-field
      :append-icon="show ? 'visibility' : 'visibility_off'"
      :type="show ? 'text' : 'password'"
      :error="passwordError"
      v-model="password"
      color="input"
      label="Password"
      hint="At least 4 characters"
      prepend-icon="lock"
      @click:append="show = !show"
    ></v-text-field>
    <div class="alright margbot-30">
      <router-link class="forgetpass" to="/requestpassword">Forgot your password?</router-link>
    </div>
    <div>
      <input type="submit" value="Sign In" class="custom-primary-btn">
    </div>
  </form>
    </v-container>
</template>
<script src="./index.js"></script>
<style scoped src="@/assets/dashboardStyle.css">