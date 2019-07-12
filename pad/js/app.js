var app = new Vue({
    el: '#app',
    data: function() {
        return {
            scrivenerData: [{
                    menuName: '弹出模块一',
                    titleName: '',
                    isChoose: true,
                    partCode: 'one'
                }, {
                    menuName: '弹出模块二',
                    titleName: '',
                    isChoose: false,
                    partCode: 'two'
                }, {
                    menuName: '弹出模块三',
                    titleName: '',
                    isChoose: false,
                    partCode: 'three'
                },
                {
                    menuName: '切换模块四',
                    titleName: '',
                    isChoose: false,
                    partCode: 'change'
                },
                {
                    menuName: '关闭',
                    titleName: '',
                    isChoose: false,
                    partCode: 'close'
                }
            ],
            showContent: '',
            showTitle: '',
            showMenu: '',
        }

    },
    mounted: function() {


    },
    methods: {
        IsChoose(item) {
            var _this = this;
            _this.ReSet();
            BiShow(item.partCode)
            item.isChoose = true;

        },
        ReSet() {
            var _this = this;
            for (var i = 0; i < _this.scrivenerData.length; i++) {
                _this.scrivenerData[i].isChoose = false
            }
        }
    }
});

//显示选中内容
function BiShow(partCode) {
    var item = {};
    item.type = "order";
    item.server = "server2010701";
    item.value = "";
    item.order = [];
    item.order.push({ partCode })
    ws.send(JSON.stringify(item));
}

//服务控制端  是否点击成功
var status = false;

var ws;
if (window.ReconnectingWebSocket) {
    var ws = new ReconnectingWebSocket('ws://101.200.194.246:22112'); // ws://localhost:65432 ws://101.200.194.246:22112
    ws.onopen = function(e) {
        console.log("连接服务器成功");
        var item = {};
        item.type = "regist";
        item.server = "server2010701";
        item.value = "";
        item.order = [];
        ws.send(JSON.stringify(item));
    }
    ws.onclose = function(e) {
        console.log("服务器关闭");
    }
    ws.onerror = function() {
        console.log("连接出错");
    }

    ws.onmessage = function(e) {
        status = true;
        var item = JSON.stringify(e.data);
        if (item.status === "1") {
            status = true;
        }
    }
}