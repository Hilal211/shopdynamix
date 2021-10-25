<template>
  <div class="containerLogin">
    <v-container>
      <v-form ref="form">
        <v-row no-gutters justify="center" align-content="center">
          <v-col cols="8" class="field-col">
            <div>Email *</div>
            <v-text-field
              label="Email"
              v-on:keyup.enter="login"
              v-model="loginInfo.email"
              :rules="emailRule"
              :hide-details="loginInfo.email_details"
              :class="
                loginInfo.email_details
                  ? 'custom-field'
                  : 'custom-field error-field'
              "
              solo
              flat
              elevation="0"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align-content="center">
          <v-col cols="8" class="field-col">
            <div>Password *</div>
            <v-text-field
              v-on:keyup.enter="login"
              :rules="required"
              type="password"
              :hide-details="loginInfo.password_details"
              :class="
                loginInfo.password_details
                  ? 'custom-field'
                  : 'custom-field error-field'
              "
              v-model="loginInfo.password"
              label="Password"
              solo
              flat
              elevation="0"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align-content="center">
          <v-col cols="8"> </v-col>
        </v-row>
        <v-row no-gutters justify="center" align-content="center" class="mb-5">
          <v-col cols="8" class="align-end mt-5 button-submit">
            <v-btn class="btn" id="login_button" @click="login">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.containerLogin {
  background-color: rgb(217, 223, 223);
  margin: auto;
  padding: 50px;
  border-radius: 20px;
}
.btn {
  float: right;
}


</style>
<script src="./script.js"></script>
