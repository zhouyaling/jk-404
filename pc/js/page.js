var baseUrl = "http://jinkevideo.tq-service.com" // "http://dev-manager.tq-service.com"; http://10.15.8.241:8081 //http://jinkevideo.tq-service.com
var timer1 = null;

// 年度目标页面
function page1() {
    getAnnualTarget();

}

// 项目接入页面
function page2(params) {
    getProjectList();
}

// kpi页面
function page3(params) {
    getKpiTop3();
    getKpiList();
}

// 报事预警页面
function page41() {

    var app41 = new Vue({
        el: "#app41",
        data() {
            return {
                areaList: [], // 区域报事预警
                totalDate: {}, // 总量

                dataAxis: ['重庆', '渝西', '渝东', '西部', '贵州', '云南', '中原', '山东', '华东', '华北', '华中', '华南', '新疆'],
                mymaxData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                mymaxData1: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                occurrences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                completionRates: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                timeOuts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                followupTimeouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
        },
        filters: {
            filterString: function(value) {
                return value ? value.replace('%', '') : 0;
            }
        },
        mounted() {
            this.getNewspaperWarning();
        },
        methods: {

            // 获取报事预警
            getNewspaperWarning() {
                let _this = this;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: baseUrl + "/jinke-video/apivideo.do?getNewspaperWarning",
                    success: function(result) {
                        if (result.tableType == 0) {
                            let mymaxData = [],
                                mymaxData1 = [];
                            for (let i = 0; i < result.tableData.listDate.length; i++) {
                                mymaxData.push(100);
                                mymaxData1.push(600);
                            }

                            _this.areaList = result.tableData.listDate;
                            _this.totalDate = result.tableData.totalDate;

                            _this.occurrences = result.tableData.occurrences;
                            _this.completionRates = result.tableData.completionRates;
                            _this.timeOuts = result.tableData.timeOuts;
                            _this.followupTimeouts = result.tableData.followupTimeouts;

                            _this.mymaxData = mymaxData;
                            _this.mymaxData1 = mymaxData1;
                            _this.areaNames = result.tableData.areaNames;
                        }

                        var linechart1 = echarts.init(document.getElementById("linechart1"));
                        var linechart2 = echarts.init(document.getElementById("linechart2"));
                        var linechart3 = echarts.init(document.getElementById("linechart3"));
                        var linechart4 = echarts.init(document.getElementById("linechart4"));
                        var timopt1 = BarChart({ dataAxis: _this.areaNames, data: _this.occurrences, mymaxData: _this.mymaxData1 }, "#176BE7", "发生情况");
                        var timopt2 = BarChart({ dataAxis: _this.areaNames, data: _this.timeOuts, mymaxData: _this.mymaxData }, "#50E3C2", "");
                        var timopt3 = BarChart({ dataAxis: _this.areaNames, data: _this.followupTimeouts, mymaxData: _this.mymaxData }, "#50E3C2", "");
                        var timopt4 = BarChart({ dataAxis: _this.areaNames, data: _this.completionRates, mymaxData: _this.mymaxData }, "#50E3C2", "");
                        linechart1.setOption(timopt1);
                        linechart2.setOption(timopt2);
                        linechart3.setOption(timopt3);
                        linechart4.setOption(timopt4);
                    },
                    error: function(e) {}
                });
            }
        },
    });
}

// 投诉预警p42页面
function page42() {
    var app42 = new Vue({
        el: "#app42",
        data() {
            return {
                areaList: [],
                total: 0
            };
        },
        mounted() {
            this.getComplaintWarning();
        },
        methods: {
            getComplaintWarning() {
                let _this = this;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: baseUrl + "/jinke-video/apivideo.do?ComplaintWarning",
                    success: function(result) {
                        if (result.tableType == 0) {

                            _this.areaList = result.tableData.listDate;
                            _this.total = result.tableData.total;
                        }
                    },
                    error: function(e) {}
                });
            }
        },
    });
}


// 投诉预警p43页面
function page43() {
    var app43 = new Vue({
        el: "#app43",
        data() {
            return {
                areaList: [],
                tim43: null
            };
        },
        filters: {
            filterContent: function(value) {
                return value && value.length > 26 ? value.substring(0, 26) + '...' : value;
            }
        },
        mounted() {
            this.getComplaintWarnings();
        },
        beforeDestory() {
            clearInterval(this.tim43);
        },
        methods: {
            getComplaintWarnings() {
                clearInterval(this.tim43);
                let _this = this;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: baseUrl + "/jinke-video/apivideo.do?ComplaintWarnings",
                    success: function(result) {

                        if (result.tableType == 0) {
                            _this.areaList = result.tableData.listDate;
                            this.tim43 = setInterval(function() {
                                _this.tableInterval43();
                            }, 10000);
                        }
                    },
                    error: function(e) {}
                });
            },
            // 表格轮播
            change(table) {
                if (table) {
                    var row = table.insertRow(table.rows.length);
                    for (j = 0; j < table.rows[0].cells.length; j++) {
                        var cell = row.insertCell(j);
                        cell.height = "61px";
                        cell.innerHTML = table.rows[0].cells[j].innerHTML;
                    }
                    table.deleteRow(0);
                }
            },
            // 轮播项目
            tableInterval43() {
                var tables = document.getElementsByClassName("scrollTbody");
                for (let i = 0; i < tables.length; i++) {
                    this.change(tables[i]);
                }
            }
        },
    });
}


// 重点报事p44页面
function page44() {
    var app44 = new Vue({
        el: "#app44",
        data() {
            return {
                areaList: [],
                timer44: null
            };
        },
        filters: {
            filterContent: function(value) {
                return value && value.length > 26 ? value.substring(0, 26) + '...' : value;
            }
        },
        mounted() {
            this.getDataList();
        },
        beforeDestory() {
            clearInterval(this.tim44);
        },
        methods: {
            getDataList() {
                clearInterval(this.tim44);
                let _this = this;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: baseUrl + "/jinke-video/apivideo.do?KeyReporting",
                    success: function(result) {
                        if (result.tableType == 0) {
                            _this.areaList = result.tableData.listDate;
                            this.tim44 = setInterval(function() {
                                _this.tableInterval44();
                            }, 10000);
                        }
                    },
                    error: function(e) {}
                });
            },
            // 表格轮播
            change(table) {
                if (table) {
                    var row = table.insertRow(table.rows.length);
                    for (j = 0; j < table.rows[0].cells.length; j++) {
                        var cell = row.insertCell(j);
                        cell.height = "80px";
                        cell.innerHTML = table.rows[0].cells[j].innerHTML;
                    }
                    table.deleteRow(0);
                }
            },
            // 轮播项目
            tableInterval44() {
                var tables = document.getElementsByClassName("scrollTbody");
                for (let i = 0; i < tables.length; i++) {
                    this.change(tables[i]);
                }
            }
        },
    });
}

// 重点报事p45页面
function page45() {
    var app45 = new Vue({
        el: "#app45",
        data() {
            return {
                areaList: [],
                timer45: null
            };
        },
        filters: {
            filterContent: function(value) {
                return value && value.length > 26 ? value.substring(0, 26) + '...' : value;
            }
        },
        mounted() {
            this.getDataList();
        },
        beforeDestory() {
            clearInterval(this.tim45);
        },
        methods: {
            getDataList() {
                clearInterval(this.tim45);
                let _this = this;
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: baseUrl + "/jinke-video/apivideo.do?KeyReportings",
                    success: function(result) {
                        if (result.tableType == 0) {
                            _this.areaList = result.tableData.listDate;
                            this.tim44 = setInterval(function() {
                                _this.tableInterval45();
                            }, 10000);
                        }
                    },
                    error: function(e) {}
                });
            },
            // 表格轮播
            change(table) {
                if (table) {
                    var row = table.insertRow(table.rows.length);
                    for (j = 0; j < table.rows[0].cells.length; j++) {
                        var cell = row.insertCell(j);
                        cell.height = "80px";
                        cell.innerHTML = table.rows[0].cells[j].innerHTML;
                    }
                    table.deleteRow(0);
                }
            },
            // 轮播项目
            tableInterval45() {
                var tables = document.getElementsByClassName("scrollTbody");
                for (let i = 0; i < tables.length; i++) {
                    this.change(tables[i]);
                }
            }
        },
    });
}

// 获取当前kpi列表
function getKpiList() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "/jinke-video/apivideo.do?getKpi",
        success: function(result) {
            if (result.tableType == 0) {
                var kpiTopListHtml = '',
                    listItemStartHtml = '',
                    cacheData = result.tableData;

                /*  var pageCount = cacheData.listDate / 10 + cacheData.listDate % 10;
                 var currPage = 1;
                 for (var i = 0; i < pageCount; i++) {

                 } */

                var test = [];
                for (var j = 0; j < 10; j++) {
                    test.push(cacheData.listDate[j]);
                }

                cacheData.listDate.forEach(function(item, index) {


                    if (index == 0) {
                        console.log("start", index);
                        listItemStartHtml = '<div class="swiper-slide">' +
                            ' <ul class="kpimonth-list-item">';
                    } else if (index % 10 == 0) {
                        console.log("start", index);
                        listItemStartHtml += '</ul></div>' +
                            '<div class="swiper-slide">' +
                            ' <ul class="kpimonth-list-item">';
                    }

                    var itemHtml = '<li>' +
                        '<div class="kpimonth-card">' +
                        '        <div class="month-name">NO.' + (index + 1) + '  ' + item.userName + '</div>' +
                        '        <img class="img1" src="../imgs/ico/line.png" alt="">' +
                        '        <div class="kpimonth-ball">' +
                        '            <p>满意度</p>' +
                        '            <p class="' + (item.isStandard == '1' ? 'color-green' : 'color-pink') + '">' + item.satisfaction.replace('%', '') + '%</p>' +
                        '        </div>' +
                        '        <div class="kpimonth-ball">' +
                        '            <p>接待量</p>' +
                        '            <p>' + item.receptionVolume + '</p>' +
                        '        </div>' +
                        '        <div class="kpimonth-line-group">' +
                        '            <div class="kpimonth-line">' +
                        '                <p>' +
                        '                    <span>呼入参评率</span>' +
                        '                    <span class="line-number">' + item.callIn.replace('%', '') + '%</span>' +
                        '                </p>' +
                        '                <img src="../imgs/ico/line-back.png" style="width:148px;" alt=""><div class="kpitop-line-active" style="width:' + (148 * 0.01 * item.callIn) + 'px;"></div>' +
                        '            </div>' +
                        '            <div class="kpimonth-line">' +
                        '                <p>' +
                        '                    <span>态度类投诉</span>' +
                        '                    <span class="line-number">' + item.attitudeComplaint + '</span>' +
                        '                </p>' +
                        '                <img src="../imgs/ico/line-back.png" style="width:148px;" alt="">' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</li>';

                    listItemStartHtml += itemHtml;
                    if (index == cacheData.listDate.length - 1) {
                        console.log("end", index);
                        listItemStartHtml += '</ul></div>';
                    }
                });

                var tt = cacheData.listDate.length
                $('#totalJieDai').html(cacheData.listDate[tt - 1].receptionVolume);
                $('#totalManyidu').html(cacheData.listDate[tt - 1].satisfaction.replace('%', ''));
                $('.kpimonth-list-group').empty().html(listItemStartHtml);

                var mySwiper = new Swiper('.swiper-container2', {
                    autoplay: true,
                    speed: 1000,
                    loop: true,
                    autoplay: 20000,
                    effect: 'slide',
                    onSlideChangeEnd: function(swiper) {}
                })
            }
        },
        error: function(e) {}
    });
}

// 获取kpi前三
function getKpiTop3() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "/jinke-video/apivideo.do?getTopKpi",
        success: function(result) {
            if (result.tableType == 0) {
                var kpiTop3Html = '',
                    cacheData = result.tableData;

                cacheData.listDate.forEach(function(item, index) {
                    var itemHtml = '<li>' +
                        '<div class="kpi-card">' +
                        '    <div class="kpitop-title">' +
                        '       <img src="../imgs/ico/ranking.png" style="width:30px;" alt="">' +
                        '        <span style="color:#F5A623;">NO.' + (index + 1) + '</span>' +
                        '       <span>' + item.userName + '</span>' +
                        '    </div>' +
                        '    <div class="kpitop-info">' +
                        '        <div class="kpitop-ball">' +
                        '            <img class="kpitop-ballimg" src="../imgs/ico/ball1.png" alt="">' +
                        '            <p class="manyidu">满意度</p>' +
                        '            <p class="manyidu-number color-green">' + item.satisfaction.replace('%', '') + '%</p>' +
                        '        </div>' +
                        '        <div class="kpitop-line">' +
                        '            <p>' +
                        '                <span>呼入参评率</span>' +
                        '                <span class="line-number">' + item.referenceRate.replace('%', '') + '%</span>' +
                        '            </p>' +
                        '            <img src="../imgs/ico/line-back.png" style="width:148px;" alt=""><div class="kpitop-line-active" style="width:' + (148 * 0.01 * item.referenceRate) + 'px;"></div>' +
                        '        </div>' +
                        '    </div>' +
                        '    <div class="kpitop-info">' +
                        '        <div class="kpitop-ball">' +
                        '            <img class="kpitop-ballimg" src="../imgs/ico/ball1.png" alt="">' +
                        '            <p class="manyidu">接待量</p>' +
                        '            <p class="manyidu-number color-pink">' + item.receptionVolume + '</p>' +
                        '        </div>' +
                        '        <div class="kpitop-line">' +
                        '            <p>' +
                        '                <span>态度类投诉</span>' +
                        '                <span class="line-number color-gray">' + item.attitudeComplaint + '</span>' +
                        '            </p>' +
                        '            <img src="../imgs/ico/line-back.png" style="width:148px;" alt="">' +
                        '        </div>' +
                        '    </div>' +
                        '</div>' +
                        '</li>';
                    kpiTop3Html += itemHtml;
                });
                $('.kpiTop2-ul').html(kpiTop3Html);

            }

        },
        error: function(e) {}
    });
}

// 获取项目列表
var cityDateCache = [];

function getProjectList() {
    debugger;
    clearTimeout(timer1);
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "/jinke-video/apivideo.do?getProjectAll",
        success: function(result) {
            if (result.tableType == 0) {
                debugger;
                var projectListHtml1 = '',
                    projectListHtml2 = '',
                    cacheData = result.tableData;
                cacheData.listDate.forEach(function(item, index) {
                    var itemHtml = '<tr id="' + item.province + '"> <td>' + item.qycompanyName + '</td><td>' + item.projectName + '</td><td>' + item.property + '</td></tr>';
                    if (item.onlineStatus == "1") {
                        projectListHtml1 += itemHtml;
                    } else {
                        projectListHtml2 += itemHtml;
                    }
                });

                var arr = [];
                var mark = true;
                var mapHtml = ""; // mapPoints
                cityDateCache = cacheData.cityDate;
                cacheData.cityDate.forEach(item => {
                    provinceData.forEach(pro => {
                        if (pro.province.indexOf(item.cityName) > -1) {
                            /*  mapHtml += ' <li class="' + pro.className + '">' +
                                 '<div class="map-p ' + (item.cityName === "重庆市" ? 'active' : '') + '">' +
                                 (item.cityName == "重庆市" ? '<img src="../imgs/ico/point-big.png" style="width:82px;" alt="">' : '<img src="../imgs/ico/point-s.png" alt="">') +
                                 '<p>' + item.cityName + '</p> ' +
                                 '</div></li>'; */

                            mapHtml += ' <li class="' + pro.className + '">' +
                                '<div class="map-p" id="' + item.cityName + '">' +
                                '<div class="map-p-img ' + (item.cityName == "重庆市" ? 'active' : '') + '"></div>' +
                                '<p>' + item.cityName + '</p> ' +
                                '</div></li>';

                            /* arr.push({
                                className: pro.className,
                                isActive: mark
                            });
                            mark = false; */
                        }
                    });
                });

            }

            $('#mapPoints').html(mapHtml);
            $('.mapTotal').html(cacheData.total1);
            $('.mapProvince').html(cacheData.total2);
            $('.mapCity').html(cacheData.total3);
            $('#project-list1').html(projectListHtml1);
            $('#project-list2').html(projectListHtml2);

            timer1 = setInterval(function() {
                tableInterval1();
                tableInterval2()
            }, 10000);
        },
        error: function(e) {}
    });
}

// 表格轮播
function change(table) {
    if (table) {
        var row = table.insertRow(table.rows.length);
        for (j = 0; j < table.rows[0].cells.length; j++) {
            var cell = row.insertCell(j);
            cell.height = "42px";
            cell.innerHTML = table.rows[0].cells[j].innerHTML;
        }
        table.deleteRow(0);
    }
};

// 轮播已上线项目
function tableInterval1() {
    var table = document.getElementById("project-list1");
    if (table.rows.length > 0) {
        $($("#mapPoints .map-p-img")).removeClass('active');
        var act_text = $(table.rows[1]).attr('id');
        $("#mapPoints " + "#" + act_text).find('.map-p-img').addClass("active");
    }

    change(table);
};

// 轮播待上线项目
function tableInterval2() {
    var table = document.getElementById("project-list2");
    change(table);
};

// 获取年度指标方法
function getAnnualTarget() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "/jinke-video/apivideo.do?getAnnualTarget",
        success: function(result) {
            if (result.tableType == 0) {
                var chartParams = {
                    dataAxis: ['目标', '达成情况', '差距'],
                    data: [0, 0, 0],
                    mymaxData: [100, 100, 100]
                };
                result.tableData.listDate.forEach(function(childData) {
                    chartParams.data = [(childData.target < 0 ? -childData.target : childData.target), (childData.situation < 0 ? -childData.situation : childData.situation), (childData.disparity < 0 ? -childData.disparity : childData.disparity)];
                    var timopt = BarBigChart(chartParams, "");
                    if (childData.yearIndex == "年度满意度") {
                        var chartManyidu = echarts.init(document.getElementById("chart-manyidu"));
                        $('#tip-manyidu li').eq(0).html(childData.target + "%");
                        $('#tip-manyidu li').eq(1).html(childData.situation + "%");
                        $('#tip-manyidu li').eq(2).html(childData.disparity + "%");
                        chartManyidu.setOption(timopt);
                    } else if (childData.yearIndex == "年度接通率") {
                        var chartJietong = echarts.init(document.getElementById("chart-jietong"));
                        $('#tip-jietong li').eq(0).html(childData.target + "%");
                        $('#tip-jietong li').eq(1).html(childData.situation + "%");
                        $('#tip-jietong li').eq(2).html(childData.disparity + "%");
                        chartJietong.setOption(timopt);
                    } else {
                        var chartNengxiao = echarts.init(document.getElementById("chart-nengxiao"));
                        $('#tip-xiaoneng li').eq(0).html(childData.target);
                        $('#tip-xiaoneng li').eq(1).html(childData.situation);
                        $('#tip-xiaoneng li').eq(2).html(childData.disparity);
                        chartNengxiao.setOption(timopt);
                    }
                });
            }
        },
        error: function(e) {}
    });
}

// 获取报事预警
function getNewspaperWarning() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "/jinke-video/apivideo.do?getNewspaperWarning",
        success: function(result) {
            if (result.tableType == 0) {
                result.tableData.listDate.forEach(function() {

                });
            }
        },
        error: function(e) {}
    });
}