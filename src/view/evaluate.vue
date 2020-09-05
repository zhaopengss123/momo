<template>
  <div class="evaluate">
    <van-nav-bar title="评价" left-arrow @click-left="$router.go(-1)" right-text="提交" />
    <!-- <div class="main">
      <van-cell title="订单号" value="123456" />
      <van-cell title="品牌" value="顾家" />
      <van-cell title="品类" value="顾家" />
    </div>-->
    <div class="form">
      <div class="evaluate-list">
        <van-field name="radio" label="安装状态">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">已完成</van-radio>
              <van-radio name="2">未完成</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="是否当天完成">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="是否额外收费">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="evaluate-list">
        <div class="title">您对销售满意吗？</div>
        <van-field name="rate" label="评分">
          <template #input>
            <van-rate v-model="rate" :size="28" />
          </template>
        </van-field>
        <van-field
          v-model="text"
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
            <van-rate v-model="rate" :size="28" />
          </template>
        </van-field>
        <van-field
          v-model="text"
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
            <van-rate v-model="rate" :size="28" />
          </template>
        </van-field>
        <van-field
          v-model="text"
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
        <van-field name="rate" v-if="canvasUrl" label="您的签名">
          <template #input>
            <van-image width="100%" :src="canvasUrl" >
                <template v-slot:canvasUrl>
                  <van-loading type="spinner" size="20" />
                </template>
            </van-image>
          </template>
        </van-field>
        <van-cell name="rate" title="操作">
          <template #right-icon>
            <van-button
              type="primary"
              size="mini"
              @click="handleCanvas"
            >{{ canvasUrl ? '重新签名' : '去签名' }}</van-button>
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
      formData: {},
      rate: 2,
      text: "",
      radio: 1,
      show: false,
      ctx: null,
      canvas: null,
      canvasMoveUse: false,
      canvasUrl: null,
      baseFile: null,
    };
  },
  components: { canvascomponent },
  methods: {
    handleCanvas() {
      document.documentElement.scrollTop = 0;
      this.show = true;
    },
    saveCanvas(url) {
      document.documentElement.scrollTop = 2000;
      this.show = false;
      this.baseFile = base64toFile(url);
      put(this.baseFile).then((data) => {
        this.canvasUrl = data.url;
        console.log(data.url);
      })
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.evaluate {
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
