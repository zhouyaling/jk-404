//webSocket 配置
if (window.WebSocket) {
    var ws = new WebSocket('ws://101.200.194.246:22116'); //  ws://101.200.194.246:22112 ws://localhost:65433
    ws.onopen = function(e) {
        console.log("连接服务器成功");
        var item = {};
        item.type = "regist";
        item.server = "no";
        item.value = "server2010701";
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
        var item = JSON.parse(e.data);
        console.log(item);
        showPage(item.partCode);
        var item = order("1");
        ws.send(JSON.stringify(item));
    }
}

//
function order(_status) {
    var item = {};
    item.type = "order";
    item.server = "client2010701"; //识别客户端
    item.value = "";
    item.order = [];
    var jObj = {
        status: "1",
    };
    item.order.push(jObj)
    return item;
}



function showPage(code) {
    switch (code) {
        case "one":
            $('#iframe').fadeOut(600, function() {
                clearAll();
                $('#iframe').attr('src', './page/page1.html');
                $('#iframe').addClass('block-show-1');
            });
            break;
        case "two":
            $('#iframe').fadeOut(600, function() {
                clearAll();
                $('#iframe').attr('src', './page/page2.html');
                $('#iframe').addClass('block-show-4');
            });
            break;
        case "three":
            $('#iframe').fadeOut(600, function() {
                clearAll();
                $('#iframe').attr('src', './page/page3.html');
                $('#iframe').addClass('block-show-3');
            });
            break;
            /* case "four-1":
                $('#iframe').fadeOut(600, function() {
                    var curr = localStorage.getItem("currIndex")
                    clearAll();
                    $('#iframe').attr('src', './page/page4-1.html');
                    $('#iframe').addClass('block-show-2');
                });

                break;
            case "four-2":
                $('#iframe').fadeOut(600, function() {
                    clearAll();
                    $('#iframe').attr('src', './page/page4-2.html');
                    $('#iframe').addClass('block-show-2');
                });
                break;
            case "four-3":
                $('#iframe').fadeOut(600, function() {
                    clearAll();
                    $('#iframe').attr('src', './page/page4-3.html');
                    $('#iframe').addClass('block-show-1');
                });
                break;
            case "four-4":
                $('#iframe').fadeOut(600, function() {
                    clearAll();
                    $('#iframe').attr('src', './page/page4-4.html');
                    $('#iframe').addClass('block-show-4');
                });
                break;
            case "four-5":
                $('#iframe').fadeOut(600, function() {
                    clearAll();
                    $('#iframe').attr('src', './page/page4-5.html');
                    $('#iframe').addClass('block-show-3');
                });
                break; */

        case "change":
            changeModule4Page();
            break;
        case "close":
            $('#iframe').fadeOut(300, function() {
                clearAll();
            });
            break;
        default:
            break;
    }
}

// 切换模块四
var moduleIndex = 0;

function changeModule4Page() {
    moduleIndex++;
    if (moduleIndex >= 6) {
        moduleIndex = 1;
    }

    switch (moduleIndex) {
        case 1:
            $('#iframe').fadeOut(1000, function() {
                clearAll();
                $('#iframe').attr('src', './page/page4-1.html');
                $('#iframe').addClass('block-show-2');
            });
            break;
        case 2:
            $('#iframe').fadeOut(1000, function() {
                clearAll();
                $('#iframe').attr('src', './page/page4-2.html');
                $('#iframe').addClass('block-show-5');
            });
            break
        case 3:
            $('#iframe').fadeOut(1000, function() {
                clearAll();
                $('#iframe').attr('src', './page/page4-3.html');
                $('#iframe').addClass('block-show-2');
            });
            break;
        case 4:
            $('#iframe').fadeOut(1000, function() {
                clearAll();
                $('#iframe').attr('src', './page/page4-4.html');
                $('#iframe').addClass('block-show-5');
            });
            break;
        case 5:
            $('#iframe').fadeOut(1000, function() {
                clearAll();
                $('#iframe').attr('src', './page/page4-5.html');
                $('#iframe').addClass('block-show-6');
            });
            break;
    }

}

// 清除
function clearAll() {
    $('#iframe').removeClass('block-show-1').removeClass('block-show-2').removeClass('block-show-3').removeClass('block-show-4').removeClass('block-show-5').removeClass('block-show-6');

}