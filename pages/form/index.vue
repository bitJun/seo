<template>
<div id="buttonddr" class="app-container">
  <div class="dashboard-font" style="width: 1169px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部" name="first" :key="'first'">
        <div style="background: #ffffff;padding: 50px;border-radius: 10px">
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">章坤&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Zhangkun</b> / 教学总监</div>
              <div class="fontsize_list">犀鸟教育研究中心负责人，
                山东大学管理学硕士，
                教师风采大赛跨科目总决赛冠军，
                全面科学的把握判断推理的出题特点，
                教学教研体系清晰完整。
              </div>
            </div>
            <img src="/images/tec/zhangkun.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/zhangyan.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">张艳&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Zhangyan</b> / 行测文</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                9年一线授课经验；
                授课逻辑清晰简明，
                直达命题趋势；
                多维选项分析直击学员困惑；
                待人耐心细致，
                是公考旅途的贴心姐姐。
              </div>
            </div>
          </div>
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">蔡文吉&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Caiwenji</b> / 行测数资、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                长期一线教学，
                授课时长累计4000+，
                授课风格幽默风趣，
                简单易懂，
                深入剖析学生学习的痛点、
                难点，
                授课内容易于接受、
                掌握。</div>
            </div>
            <img src="/images/tec/caiwenji.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/luotao.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">罗涛&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Luotao</b> / 申论、面试</div>
              <div class="fontsize_list">双一流大学教育硕士，
                参与申论核心课程研发预测，
                具有丰富的教学实战经验，
                授课时长6000+，
                独创申论材料快速阅读，
                要点精准提取法，
                带领众多学员突破75+。
              </div>
            </div>
          </div>
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">陈永仁&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Chenyongren</b> / 面试</div>
              <div class="fontsize_list">犀鸟公考面试资深讲师
                “ 深度思维法 ”创立者，
                在多年的面试教学生涯中，因材施教，循循善诱，
                帮助考生深刻理解面试的内在逻辑，
                培养考生的政府思维，
                曾辅导多名考生斩获全场第一。
              </div>
            </div>
            <img src="/images/tec/chenyongren.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/renxiaoxiao.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">任晓庆&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Renxiaoqing</b> / 行测文、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                8年一线授课经验，
                独创“ 判断推理吸分大法 ”，
                授课思路清晰，直击要点，
                学员心中的“ 干货王 ”，
                找准切入点，逻辑任我行。
              </div>
            </div>
          </div>
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">扶文达&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Fuwenda</b> / 申论</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                不同申论体系创立者，
                累计授课时长5000+，
                擅长申论培优，结构化面试，
                申论80分金牌老师，
                考场实战教研，
                以命题人角度教学。</div>
            </div>
            <img src="/images/tec/fuwenda.png" alt="" style="width: 18%">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行测" name="second" :key="'second'">
        <div style="background: #ffffff;padding: 50px;border-radius: 10px">
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">章坤&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Zhangkun</b> / 教学总监</div>
              <div class="fontsize_list">犀鸟教育研究中心负责人，
                山东大学管理学硕士，
                教师风采大赛跨科目总决赛冠军，
                全面科学的把握判断推理的出题特点，
                教学教研体系清晰完整。
              </div>
            </div>
            <img src="/images/tec/zhangkun.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/zhangyan.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">张艳&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Zhangyan</b> / 行测文</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                9年一线授课经验；
                授课逻辑清晰简明，
                直达命题趋势；
                多维选项分析直击学员困惑；
                待人耐心细致，
                是公考旅途的贴心姐姐。
              </div>
            </div>
          </div>
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">蔡文吉&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Caiwenji</b> / 行测数资、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                长期一线教学，
                授课时长累计4000+，
                授课风格幽默风趣，
                简单易懂，
                深入剖析学生学习的痛点、
                难点，
                授课内容易于接受、
                掌握。</div>
            </div>
            <img src="/images/tec/caiwenji.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/renxiaoxiao.png" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">任晓庆&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Renxiaoqing</b> / 行测文、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                8年一线授课经验，
                独创“ 判断推理吸分大法 ”，
                授课思路清晰，直击要点，
                学员心中的“ 干货王 ”，
                找准切入点，逻辑任我行。
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申论" name="third" :key="'third'">
        <div style="background: #ffffff;padding: 50px;border-radius: 10px">
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">扶文达&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Fuwenda</b> / 申论</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                不同申论体系创立者，
                累计授课时长5000+，
                擅长申论培优，结构化面试，
                申论80分金牌老师，
                考场实战教研，
                以命题人角度教学。</div>
            </div>
            <img src="/images/tec/fuwenda.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/luotao.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">罗涛&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Luotao</b> / 申论、面试</div>
              <div class="fontsize_list">双一流大学教育硕士，
                参与申论核心课程研发预测，
                具有丰富的教学实战经验，
                授课时长6000+，
                独创申论材料快速阅读，
                要点精准提取法，
                带领众多学员突破75+。
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="面试" name="fourth" :key="'fourth'">
        <div style="background: #ffffff;padding: 50px;border-radius: 10px">
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">蔡文吉&nbsp;&nbsp;</b></span> <b style="font-size: 20px"> Caiwenji</b> / 行测数资、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                长期一线教学，
                授课时长累计4000+，
                授课风格幽默风趣，
                简单易懂，
                深入剖析学生学习的痛点、
                难点，
                授课内容易于接受、
                掌握。</div>
            </div>
            <img src="/images/tec/caiwenji.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/luotao.png" alt="" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">罗涛&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Luotao</b> / 申论、面试</div>
              <div class="fontsize_list">双一流大学教育硕士，
                参与申论核心课程研发预测，
                具有丰富的教学实战经验，
                授课时长6000+，
                独创申论材料快速阅读，
                要点精准提取法，
                带领众多学员突破75+。
              </div>
            </div>
          </div>
          <div class="name_lists" style="display: flex;align-items: center;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">陈永仁&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Chenyongren</b> / 面试</div>
              <div class="fontsize_list">犀鸟公考面试资深讲师，
                “ 深度思维法 ”创立者，
                在多年的面试教学生涯中，因材施教，循循善诱，
                帮助考生深刻理解面试的内在逻辑，
                培养考生的政府思维，
                曾辅导多名考生斩获全场第一。</div>
            </div>
            <img src="/images/tec/chenyongren.png" alt="" style="width: 18%">
          </div>
          <div class="name_list" style="display: flex;align-items: center;background: #ffffff;border-radius: 10px;justify-content: space-around;padding: 50px 80px">
            <img src="/images/tec/renxiaoxiao.png" style="width: 18%">
            <div>
              <div style="margin-bottom: 10%"><span style="border-bottom: 3px solid #33CCD3;padding-bottom: 10px"><b style="font-size: 20px">任晓庆&nbsp;&nbsp;</b></span><b style="font-size: 20px"> Renxiaoqing</b> / 行测文、面试</div>
              <div class="fontsize_list">犀鸟公考资深讲师，
                8年一线授课经验，
                独创“ 判断推理吸分大法 ”，
                授课思路清晰，直击要点，
                学员心中的“ 干货王 ”，
                找准切入点，逻辑任我行。
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
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
  watch: {},
  methods: {}
}
</script>

<style lang="scss" >
@import "../../static/styles/form/index.scss";
</style>
