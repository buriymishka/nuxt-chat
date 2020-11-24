export default {
  methods: {
    MixinParser(str) {
      let res = str.trim()
      res = res.replace(/ +(?= )/g,'');
      return res
    }
  }
}
