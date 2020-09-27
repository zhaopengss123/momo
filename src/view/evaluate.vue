<template>
  <div class="evaluate">
    <van-loading size="24px" class="loading" v-if="loading">加载中……</van-loading>
    <van-nav-bar
      title="评价"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="saveEvaluate"
      v-if="evaluateStatus != 1 && isDelete != 1"
      right-text="提交"
    />
    <van-nav-bar title="查看评价" left-arrow @click-left="$router.go(-1)" @click-right="toHistory" right-text="历史评价" v-if="evaluateStatus == 1 && isDelete == 0" />
    <van-nav-bar title="查看历史评价" left-arrow @click-left="isDelete = 0" v-if="evaluateStatus == 1 && isDelete == 1" />
    <div class="form">
      <div class="evaluate-list">
        <van-field name="radio"  required label="安装状态">
          <template #input>
            <van-radio-group
              v-model="formData.install.evaluateStatus"
              :disabled="evaluateStatus == 1"
              direction="horizontal"
            >
              <van-radio :name="1">已完成</van-radio>
              <van-radio :name="0">未完成</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio"  required label="是否当天完成">
          <template #input>
            <van-radio-group
              v-model="formData.sameDay.evaluateStatus"
              :disabled="evaluateStatus == 1"
              direction="horizontal"
            >
              <van-radio :name="1">是</van-radio>
              <van-radio :name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio"  required label="是否额外收费">
          <template #input>
            <van-radio-group
              v-model="formData.charge.evaluateStatus"
              :disabled="evaluateStatus == 1"
              direction="horizontal"
            >
              <van-radio :name="1">是</van-radio>
              <van-radio :name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="evaluate-list">
        <div class="title">您对销售满意吗？</div>
        <van-field name="rate" label="评分">
          <template #input>
            <van-rate
              v-model="formData.sale.evaluateStatus"
              :readonly="evaluateStatus == 1"
              :size="28"
            />
          </template>
        </van-field>
        <van-field
          v-model="formData.sale.remake"
          :readonly="evaluateStatus == 1"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
      </div>
      <div class="evaluate-list">
        <div class="title">您对设计师满意吗？</div>
        <van-field name="rate" label="评分">
          <template #input>
            <van-rate
              v-model="formData.designer.evaluateStatus"
              :readonly="evaluateStatus == 1"
              :size="28"
            />
          </template>
        </van-field>
        <van-field
          v-model="formData.designer.remake"
          :readonly="evaluateStatus == 1"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
      </div>
      <div class="evaluate-list">
        <div class="title">您对安装服务满意吗？</div>
        <van-field name="rate" label="评分">
          <template #input>
            <van-rate
              v-model="formData.services.evaluateStatus"
              :readonly="evaluateStatus == 1"
              :size="28"
            />
          </template>
        </van-field>
        <van-field
          v-model="formData.services.remake"
          :readonly="evaluateStatus == 1"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
      </div>
      <div class="evaluate-list">
        <div class="title">签名</div>
        <van-field name="rate" v-if="formData.signature.remake" label="您的签名">
          <template #input>
            <van-image width="100%" :src="formData.signature.remake">
              <template v-slot:canvasUrl>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </template>
        </van-field>
        <van-cell name="rate" title="操作" v-if="evaluateStatus != 1">
          <template #right-icon>
            <van-button
              type="primary"
              size="mini"
              @click="handleCanvas"
            >{{ formData.signature.remake ? '重新签名' : '去签名' }}</van-button>
          </template>
        </van-cell>
      </div>
    </div>

    <van-popup
      v-model="show"
      position="top"
      closeable
      :style="{ height: '100%', background: '#f0f0f0' }"
    >
      <canvascomponent @closeCanvas="show = false" @submitCanvas="saveCanvas"></canvascomponent>
    </van-popup>
  </div>
</template>

<script>
import canvascomponent from "./components/canvas";
import { base64toFile, put } from "@/assets/js/base";
export default {
  name: "examine",
  data() {
    return {
      rate: 2,
      text: "",
      radio: 1,
      show: false,
      ctx: null,
      loading: false,
      canvas: null,
      canvasMoveUse: false,
      canvasUrl: null,
      evaluateStatus: 0,
      initStatus: null,
      baseFile: null,
      orderInfo: {},
      isDelete: 0,
      installOrderEvaluatesDetail: {
        installOrderEvaluates: [
          {
            evaluateStatus: "0",
            evaluateLabel: "安装状态",
            evaluateType: 1,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: "0",
            evaluateLabel: "是否当天完成",
            evaluateType: 2,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: "0",
            evaluateLabel: "是否有额外收费",
            evaluateType: 3,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: "一天",
            evaluateLabel: "安装周期",
            evaluateType: 10,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: 5,
            evaluateLabel: "设计师评分",
            evaluateType: 6,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: 5,
            evaluateLabel: "安装服务评分",
            evaluateType: 7,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: 5,
            evaluateLabel: "销售评分",
            evaluateType: 9,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: "",
            evaluateLabel: "反馈意见",
            evaluateType: 8,
            remake: "",
            customerServiceId: null,
          },
          {
            evaluateStatus: "",
            evaluateLabel: "签名图片",
            evaluateType: 11,
            remake: "",
            customerServiceId: null,
          },
        ],
        installationOrderId: null,
        createAt: null,
      },
      formData: {
        install: {
          evaluateStatus: null,
          remake: "",
          evaluateType: 1,
        },
        sameDay: {
          evaluateStatus: null,
          remake: "",
          evaluateType: 2,
        },
        charge: {
          evaluateStatus: null,
          remake: "",
          evaluateType: 3,
        },
        sale: {
          evaluateStatus: 5,
          remake: "",
          evaluateType: 9,
        },
        designer: {
          evaluateStatus: 5,
          remake: "",
          evaluateType: 6,
        },
        services: {
          evaluateStatus: 5,
          remake: "",
          evaluateType: 7,
        },
        signature: {
          remake: "",
          evaluateType: 11,
        },
      },
    };
  },
  components: { canvascomponent },
  methods: {
    toHistory(){
      this.isDelete = 1;
    },
    handleCanvas() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.show = true;
    },
    saveCanvas(url) {
      document.documentElement.scrollTop = 2000;
      this.show = false;
      this.baseFile = base64toFile(url);
      put(this.baseFile).then((data) => {
        this.canvasUrl = data.url;
        this.formData.signature.remake = data.url;
      });
    },
    /**
     * 获取评价详情
     */
    getEvaluateDetail() {
      this.axios
        .get(
          `/api/app/orderEvaluater/listInstallOrderEvaluate?source=0&customerServiceId=${this.orderInfo.customerServiceId}&isDelete=${ this.isDelete }`
        )
        .then((res) => {
          this.listData = res.data.data;
          if(res.status == 200){
            this.editorData();
          }else{
            this.$toast.fail(res.message || '网络错误');
          }
          
        });
    },
    editorData(){
          let datas = [];
          if(this.isDelete == 0 && this.listData && this.listData.nowList ){
            datas = this.listData.nowList
          }else if(this.isDelete == 1 && this.listData && this.listData.historyList){
            datas = this.listData.historyList
          }
          if ( datas.length) {
            this.installOrderEvaluatesDetail.installOrderEvaluates = datas;
            this.installOrderEvaluatesDetail.installOrderEvaluates.map(
              (item) => {
                item.customerServiceId = this.orderInfo.customerServiceId;
              }
            );
            const data = datas;
            const keys = Object.keys(this.formData);
            const values = Object.values(this.formData);
            data.map((item) => {
              values.map((val, index) => {
                if (item.evaluateType == val.evaluateType) {
                  this.formData[
                    keys[index]
                  ].evaluateStatus = item.evaluateStatus
                    ? Number(item.evaluateStatus)
                    : null;
                  this.formData[keys[index]].remake = item.remake || null;
                }
              });
            });
            const formData = this.formData;
            this.initStatus = formData.install.evaluateStatus;
          }
    },
    /** 提交评价 */
    saveEvaluate() {
      const keys = Object.keys(this.formData);
      const values = Object.values(this.formData);
      let installOrderEvaluatesDetail = JSON.parse(
        JSON.stringify(this.installOrderEvaluatesDetail)
      );
      if(this.formData.install.evaluateStatus == null){ this.$toast.fail("请选择安装状态"); return ;}
      if(this.formData.sameDay.evaluateStatus == null){ this.$toast.fail("请选择是否当天完成"); return ;}
      if(this.formData.charge.evaluateStatus == null){ this.$toast.fail("请选择是否额外收费"); return ;}
      installOrderEvaluatesDetail.installOrderEvaluates.map((item) => {
        values.map((val, index) => {
          if (item.evaluateType == val.evaluateType) {
            item.evaluateStatus = val.evaluateStatus;
            item.remake = val.remake || null;
          }
        });
      });
      if (this.initStatus == 0 && this.formData.install.evaluateStatus == 0) {
        this.$toast.fail("您已经评价过安装未完成了~");
        return false;
      }
      if (!this.formData.signature.remake) {
        this.$toast.fail("请签上您的名字~");
        return false;
      }
      this.loading = true;
      this.axios
        .post(
          `/api/app/orderEvaluater/addInstallOrderEvaluateFromCustomer`,
          installOrderEvaluatesDetail
        )
        .then((res) => {
          this.loading = false;
          if (res.status == 200) {
            this.$toast.success("评价成功！");
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  watch:{
    isDelete(){
      this.editorData();
    }
  },
  mounted() {
    if(this.$route.query.isDelete){ this.isDelete = 1;  }
    const orderInfo = this.$route.query.item;
    this.orderInfo = orderInfo;
    this.installOrderEvaluatesDetail.installOrderEvaluates.map((item) => {
      item.customerServiceId = orderInfo.customerServiceId;
    });
    this.installOrderEvaluatesDetail.createAt = this.$store.state.userInfo.customerId;
    this.installOrderEvaluatesDetail.installationOrderId =
      orderInfo.installationOrderId;
    this.evaluateStatus = orderInfo.evaluateStatus;

    this.getEvaluateDetail();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.evaluate {
  .loading {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    text-align: center;
    span {
      margin-top: 40%;
    }
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  padding-top: 45px;
  width: 100%;
  background: #f0f0f0;
  min-height: 100%;
  padding-bottom: 20px;
  .evaluate-list {
    width: 350px;
    margin: 0 auto;
    background: #fff;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    .title {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: solid 1px #eee;
      text-indent: 15px;
    }
  }
}
</style>
