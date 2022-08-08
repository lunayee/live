export default {
  methods: {
    logout() {
      this.$store.dispatch("setLogout");
      this.$router.push({ name: "Login" });
    },
    errorAction(data) {
      data.forEach((el) => {
        alert(el.text);
        const list = ["accountNoExisted", "tokenInvalid", "tokenExpired", "tokenError", "tokenNoExisted"];
        if (list.includes(el.type)) {
          this.$store.dispatch("setLogout");
          if (this.$route.name !== "Login") {
            this.$router.push({ name: "Login" });
          }
        }
      });
    },
    comboboxTranslation(items, value) {
      if (value) {
        const ary = value.split(",");
        return items
          .filter((el) => ary.includes(el.value))
          .map((el) => el.text)
          .toString();
      }
    },
    comboboxUnTranslation(items, text) {
      if (text) {
        const ary = text.split(",");
        return items
          .filter((el) => ary.includes(el.text))
          .map((el) => el.value)
          .toString();
      }
    },
  },
};
