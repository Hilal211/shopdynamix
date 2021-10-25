import api from "./api.js";
export default {
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    products: [],
    show: false,
    page: 1,
    pageSize: 2,
    paginationSize:1,
    pp:[],
    visited: [],

    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  }),
  methods: {
    getproduct() {
      api.getproducts().then((res) => {
        this.products = res.data.data;
      });
    },

    filterProducts(value,newFilter = null) {
     

      let founded = this.visited.find(x => x == value);
      this.visited.push(value);
      this.page = value;
      if (!founded) {
      let formData = new FormData();
      formData.append("page", this.page - 1);
      formData.append("page_size", this.pageSize);
      if (newFilter)
      formData.append("pagination_count", 1);

      api.getpp(formData)
      .then(res => {
        if (res.data.responseCode == 1) {
          if (newFilter) {
            this.pp = [];
            this.paginationSize = parseInt(res.data.data['productCount']) / this.pageSize;
            if (this.paginationSize % 1 != 0)
              this.paginationSize = parseInt(this.paginationSize) + 1;
            this.visited.push(1);
          }
          let obj = { page: this.page,  pp: res.data.data['product'] };
          this.pp.push(obj);
          this.products = [];
          this.products = JSON.parse(JSON.stringify(res.data.data['product']));
        }
        // this.$emit("loading", false);
      })
      .catch(err => {
        console.log(err);
        // this.$emit("loading", false);
      });
    }else {
      this.paginatedTutors = [];
      let  pp = this. pp.find(it => it.page == this.page);
      this.products = JSON.parse(JSON.stringify( pp. pp));
    }

    }

  },
  mounted() {
    if (!this.user) {
      this.$router.push({ name: "login" });
      return;
    }
    // this.getproduct();

    let formData = new FormData();
    formData.append("pagination_count", 1);
    formData.append("page", 0);
    formData.append("page_size", this.pageSize);

    // this.$emit("loading", true);

    api.getpp(formData)
      .then((res) => {
        if (res.data.responseCode == 1) {
          let obj = { page: 1,  pp: res.data.data['product'] };
          this.pp.push(obj);
          this.products = [];
          this.products = res.data.data['product'];
          this.visited.push(1);
          this.paginationSize = parseInt(res.data.data['productCount']) / this.pageSize;
          if (this.paginationSize % 1 != 0)
            this.paginationSize = parseInt(this.paginationSize) + 1;
        }
        this.$emit("loading", false);
      })
      .catch((err) => {
        console.log(err);
        this.$emit("loading", false);
      });
  },
};
