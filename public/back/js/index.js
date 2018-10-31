/*
  echarts的使用, 基于准备好的dom, 初始化echarts实例
*/
$(function(){
  var leftChart = echarts.init(document.querySelector('.echarts_left'));
  // 指定图表的配置项和数据
  console.log(leftChart);
  var option1 = {
    // 大标题
    title: {
      text:'2017年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data:['人数']
    },
    // x轴
    xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    // Y轴
    yAxis: {
        type: 'value'
        // y轴的刻度是根据数据自动生成的
    },
    series: [{
        data: [500, 202, 360, 1000, 800, 600],
        type: 'bar',
        name:'人数'
    }]
  };
  leftChart.setOption(option1);

  // 右侧饼状图
  var echartsRight = echarts.init(document.querySelector('.echarts_right'));
  var option2 = {
    // 大标题
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center',
      textStyle: {
        color: 'red',
        fontSize: 25
      },
    },
    // 标题样式
    // 提示框组件
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','斐乐','万斯','新百伦']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'斐乐'},
                {value:135, name:'万斯'},
                {value:1548, name:'新百伦'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  echartsRight.setOption(option2);
})