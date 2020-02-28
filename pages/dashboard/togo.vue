<template>
<div></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  head() {
    return {
      title: '犀鸟公考-犀鸟公考 - 大学生职业教育服务平台 公考、招教、部队文职',
      meta: [{
        hid: "description",
        name: "description",
        content: "犀鸟公考，公考，招教，部队文职，公务员，事业单位，教师招聘，公务员考试网，国家公务员考试网，国考，省考，国家公务员考试，公务员培训"
      }, {
        hid: 'viewport',
        name: 'keywords',
        content: '犀鸟公考是大学生职业教育服务平台，通过“在线直播+督学系统+游戏化激励+AI”的方式，让考试有效也有趣！提供公务员、事业单位、教师招聘、部队文职等考试服务'
      }]
    }
  },
  created() {
    var pm = document.body.clientWidth
    console.log("pmpmpmpmpmpmpm:", pm)
    if (pm > 950) {
      //  localStorage.setItem("os", "ipad");
      var url = "http://www.xiniaogongkao.com/#/dashboard"
      window.location.replace(url);
    } else {
      console.log("手机：22222222222222")
      var url = "http://wap.xiniaogongkao.com"
      window.location.replace(url);
    }

  },
  mounted() {}
}
</script>

<style lang="scss" >
.myDiv {}
</style>
