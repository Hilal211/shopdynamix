<template>
  <v-container fluid class="deback">
    <div class="aboveallloading" v-if="loading">
      <img
        class="loadingimg"
        alt="Loading"
        src="@/assets/images/Spinner-loader.svg"
      />
    </div>
    <v-layout class="custom-container page-header">
      <v-row justify="space-between" align="center">
        <v-flex class="page-title-container">
          <div class="page-title-main">
            <div class="page-title-image">
              <i
                aria-hidden="true"
                class="v-icon material-icons theme--light"
                style="color:#FFF;padding-top:8px;font-size:32px;"
                >category</i
              >
            </div>
            <div class="page-title">{{ $route.name }}</div>
          </div>
        </v-flex>
        <div>
         
        </div>
      </v-row>
    </v-layout>
    <v-layout class="custom-container smb">
      <v-flex>
        <v-card>
          <v-sheet height="3"></v-sheet>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="custom-container">
      <v-flex>
        <v-card>
          <v-card-title class="table-title-container">
            <div class="table-title">
              {{ $route.name }}
            </div>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              color="primary"
              append-icon="search"
              label="Search"
              class="search-field"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="data"
            :search="search"
            :mobile-breakpoint="1024"
          >
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="showDialog2(item)">visibility</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
<v-dialog v-model="dialog2" scrollable persistent max-width="600px">
   <v-row>
        <v-col>
          <img
            :src="`http://localhost/loginProject/api/images/products/${image}`"
            class="imgProduct"
        /></v-col>
   </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline"
              >Product Details</span
            >
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    color="input"
                     
                    v-model="name"
                    label="Name"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    color="input"
                     
                    v-model="summary"
                    label="Summary"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    color="input"
                     
                    v-model="quantity"
                    label="Quantity"
                    readonly
                  ></v-text-field>
                </v-flex>
              
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
              class="px-3"
              rounded
              color="btn2"
              @click="
                dialog2 = false;
                valid = true;
              "
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="errorDialog" max-width="340">
      <v-card>
        <v-card-title class="headline">An error has occurred!</v-card-title>
        <v-card-text>
          {{ error }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="errorDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script src="./index.js"></script>
<style scoped src="@/assets/dashboardStyle.css">
