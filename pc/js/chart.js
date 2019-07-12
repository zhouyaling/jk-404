// 画年度目标柱形图
function BarBigChart(chartParams, chartName) {
    var option = {
        grid: {
            left: '0%',
            top: 0,
            bottom: 20,
            right: '0%',
        },
        xAxis: {
            data: chartParams.dataAxis,

            position: true ? 'bottom' : 'top', //设置出现的位置
            axisTick: { // 多少个单元 出现一个锯齿
                show: false,
                interval: 0
            },
            axisLine: { //设置第一条线
                show: true,
                lineStyle: {
                    color: '#4A90E2' //设置 x 轴的颜色 第一条线
                }
            },
            splitLine: { //设置虚线
            },
            axisLabel: { //设置 字体颜色
                interval: 0,
                /*  rotate: 45, */
                textStyle: {
                    color: '#fff', //y轴字体的颜色
                    fontSize: '24px'
                },
                /* formatter: function(val) {
                    return val.split("-").join("\n");
                } */
            }
        },
        yAxis: {
            show: false,
            splitLine: {

                show: false, //等分线的设置
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)' //设置 y 轴的颜色 第一条线
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#99AFB8' //y轴字体的颜色
                }
            }
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: [{ // For shadow
                name: chartName,
                type: 'bar',
                itemStyle: {
                    normal: { color: '#2C395B' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                barWidth: 22,
                data: chartParams.mymaxData,
                animation: false
            },
            {
                name: chartName,
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                    normal: {
                        color: "#1D5DC3"
                    }
                },
                data: chartParams.data
            }
        ]
    }
    return option;
}

// 画区域柱形图
var whiteSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAGCAYAAAAsVdWjAAAAAXNSR0IArs4c6QAAACBJREFUGBljFM96/p+ByoCJyuaBjRvhhrIwMjE0UztcAfrbAvudmCSkAAAAAElFTkSuQmCC'
var whiteImg = new Image()
whiteImg.src = whiteSrc;

function BarChart(chartParams, colorNumber, chartName) {
    var option = {
        grid: {
            left: '1%',
            top: 30,
            bottom: 40,
            right: '0%',
        },
        xAxis: {
            data: chartParams.dataAxis,

            position: true ? 'bottom' : 'top', //设置出现的位置
            axisTick: { // 多少个单元 出现一个锯齿
                show: false,
                interval: 0
            },
            axisLine: { //设置第一条线
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)' //设置 x 轴的颜色 第一条线
                }
            },
            splitLine: { //设置虚线
            },
            axisLabel: { //设置 字体颜色
                interval: 0,
                /*  rotate: 45, */
                textStyle: {
                    color: '#99AFB8', //y轴字体的颜色
                    fontSize: '12px'
                },
                formatter: function(val) {
                    return val.split("-").join("\n");
                }
            }
        },
        yAxis: {
            show: false,
            splitLine: {

                show: false, //等分线的设置
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)' //设置 y 轴的颜色 第一条线
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#99AFB8' //y轴字体的颜色
                }
            }
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: [{ // For shadow
                name: chartName,
                type: 'bar',
                itemStyle: {
                    normal: { color: '#0E2C64', boxShadow: 'inset 0 0 5px 0 rgba(29,202,255,0.50)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                barWidth: 8,
                data: chartParams.mymaxData,
                animation: false
            },
            {
                name: chartName,
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        // barBorderRadius: [2, 2, 0, 0],
                        /*  color: {
                             image: whiteImg,
                             repeat: 'repeat'
                         } */
                        color: colorNumber
                    }
                },
                data: chartParams.data,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}' + (chartName != "发生情况" ? '%' : ''),
                        position: "top",
                        textStyle: {
                            color: "#fff",
                            fontSize: 10
                        }
                    }
                }
            }
        ]
    }
    return option;
}