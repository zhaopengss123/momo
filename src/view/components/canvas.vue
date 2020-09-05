

<template>
  <div>
    <div class="canvas-content">
      <div class="text">{{ isLine ? '' : '签名处' }}</div>
      <canvas
        id="canvas"
        width="350"
        @touchstart="canvasDown($event)"
        @touchmove="canvasMove($event)"
        @touchend="canvasUp($event)"
        ref="canvas"
      >抱歉，您的浏览器不支持canvas元素</canvas>
    </div>
    <footer>
        <van-button type="primary" @click="submitCanvas">签好了</van-button>
        <van-button type="info" @click="handelClear">重新签名</van-button>
        <van-button type="default" @click="bankCanvas">返回</van-button>
    </footer>
  </div>
</template>
<script>
export default {
  name: "handlecanvas",
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
      isLine: false,
    };
  },
  methods: {
    initDraw() {
      // 初始化画布
      this.$nextTick(() => {
        const clientWidth = document.documentElement.clientWidth;
        this.canvas = this.$refs.canvas; //指定canvas
        this.canvas.width = clientWidth * 0.9;
        this.canvas.height = clientWidth * 0.5;
        this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
        this.ctx.lineWidth = 2; //设置线的宽度
      });
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.touches[0].pageX - e.target.offsetLeft;
      const canvasY =
        e.touches[0].pageY -
        e.target.offsetTop +
        document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX = e.touches[0].pageX - t.offsetLeft;
        canvasY =
          e.touches[0].pageY - t.offsetTop + document.documentElement.scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.isLine = true;
      this.canvasMoveUse = false;
    },
    /**
     * 清空画布
     */
    handelClear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    /**返回 */
    bankCanvas(){
        this.$emit('closeCanvas');
    },
    /**
     * 确定签名
     */
    submitCanvas(){
        if(this.isCanvasBlank()){
            this.$dialog({  message: '请签上您的名字~' })
            return ;    
        }
        const url = this.canvas.toDataURL();
        this.$emit('submitCanvas',url)
    },
        isCanvasBlank() {
        //PNG 算法
        var blank = document.createElement('canvas');
        blank.width = this.canvas.width;
        blank.height = this.canvas.height;
        return this.canvas.toDataURL() == blank.toDataURL();
    }
  },
  mounted() {
    this.initDraw();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.canvas-content {
  position: relative;
  .text {
    width: 100%;
    height: 300px;
    line-height: 350px;
    text-align: center;
    color: #333;
    font-size: 50px;
    font-style: italic;
  }
  #canvas {
    margin: 0 auto;
    display: block;
    position: absolute;
    top: 80px;
    left: 5%;
    background: rgba(255, 255, 255, 0.8);
  }
}
footer{
    text-align: center;
}
</style>


