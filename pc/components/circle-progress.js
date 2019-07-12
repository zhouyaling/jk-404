Vue.component('circle-progress', {
    template: '<canvas ref="progress" width="110" height="110"></canvas>',
    props: {
        percent: 0
    },
    mounted() {
        this.DrawCircle(this.percent);
    },
    methods: {
        DrawCircle(percent) {
            var canvas = this.$refs.progress, //获取canvas元素
                context = canvas.getContext('2d'), //获取画图环境，指明为2d
                centerX = canvas.width / 2, //Canvas中心点x轴坐标
                centerY = canvas.height / 2, //Canvas中心点y轴坐标
                rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
                speed = 0.3; //加载的快慢就靠它了 

            //绘制8像素宽的运动外圈
            function blueCircle(n) {
                context.save();
                context.strokeStyle = "#0453B0"; //设置描边样式
                context.lineWidth = 6; //设置线宽
                context.beginPath(); //路径开始
                context.arc(centerX, centerY, 50, -Math.PI / 2, -Math.PI / 2 + n * rad, false);
                //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke(); //绘制
                context.closePath(); //路径结束
                context.restore();
            }
            //绘制底圈
            function whiteCircle() {
                context.save();
                context.beginPath();
                context.lineWidth = 6; //设置线宽
                context.strokeStyle = "#001E50";
                context.arc(centerX, centerY, 50, 0, Math.PI * 2, false);
                context.stroke();
                context.closePath();
                context.restore();
            }
            //百分比文字绘制
            function text(n) {
                context.save();
                context.beginPath();
                context.font = '24px Arial';
                context.fillStyle = '#FF70A8';
                var text = n.toFixed(0) + '%';
                context.fillText(percent + '%', centerX - 25, centerY + 20);
                context.stroke(); //执行绘制
                context.closePath();
                context.restore();
            }
            //动画循环
            var timer = "";
            (function drawFrame() {
                timer = window.requestAnimationFrame(drawFrame);
                context.clearRect(0, 0, canvas.width, canvas.height);
                whiteCircle();
                //text(speed);
                blueCircle(speed);
                if (speed > percent) {
                    window.cancelAnimationFrame(timer);
                };
                speed += 0.3;
            }())
        }
    }
});