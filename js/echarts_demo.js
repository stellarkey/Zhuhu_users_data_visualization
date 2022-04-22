class MyDemo {
  constructor() {  }

  create_echarts_demo_name_follower_count_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "233";
    
    document.getElementById(element_id).innerHTML = '<div id="echarts-name_follower_count" style="margin: 1em auto; width:1200px; height:600px;"></div>';
    
    let myChart = echarts.init(document.getElementById("echarts-name_follower_count"));
    $.getJSON("data/data_name_follower_count.json").then(data => {
      // 指定图表的配置项和数据
      var list_name = []
      var list_follower_count = []
      for(let record in data["name"]){
        if(data["follower_count"][record] > 0){
          list_name.push(data["name"][record]);
          list_follower_count.push(data["follower_count"][record]);
        }
      }
      // console.log(list_name);
      var option = {
        title: {
          left: "center",
          text: '知乎用户关注数'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        toolbox: {
          feature: {
            // restore: {},
            // saveAsImage: {}
          }
        },
        legend: {
            right: 20,
            // data: ['关注数', '收藏数'],
            // selected: { '关注数': true, '收藏数': false }   // false hides it
        },
        xAxis: {
          data: list_name
        },
        yAxis: {
          type: 'log',
          name: '关注数',
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          }
        ],
        series: [
          {
            name: '关注数',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: list_follower_count
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      
      close_loading_preview();
    })
  }
}