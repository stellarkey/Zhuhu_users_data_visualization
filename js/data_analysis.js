class DataAnalysis {
  constructor() {  }

  create_data_analysis_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "数据分析模块初始化……";
    
    $("#"+element_id).load("static_content/data_analysis_page.html", function(){
      // analysis_element_list 必须与 data_analysis_page.html 中的 tab 顺序一致
      var analysis_element_list = [
        "locations",
        "educations_school",
        "educations_major",
        "employments_job",
        "employments_company",
        "business",
        "gender",
        "user_type",
        "voteup_count",
        "favorited_count",
        "thanked_count",
        "answer_count",
        "articles_count",
        "follower_count",
        "following_count",
      ];
      let idx = 0;
      $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
        getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
        getDataAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
      })
      layui.use('element', function(){
          var element = layui.element;
        element.on('tab(data_analysis)', function(data){
          // console.log(this); //当前Tab标题所在的原始DOM元素
          // console.log(data.index); //得到当前Tab的所在下标
          // console.log(data.elem); //得到当前的Tab大容器
          let idx = data.index;
          if (! analysis_element_list[idx].includes("_count")){
            $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
              getDataAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
              getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
            })
          }
          else{
            function show_all_counts(idx, maxidx){
              if(idx < maxidx){
                $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
                  getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data, true, false);
                }).then( nothing => {
                  show_all_counts(idx + 1, maxidx);
                })
              }
              else return;
            }
            show_all_counts(idx, analysis_element_list.length);
            // while(idx < analysis_element_list.length){
            //   console.log("idx:", idx);
            //   console.log("analysis_element_list[idx]:", analysis_element_list[idx]);
            //   $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
            //     getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data, true);
            //   });
            //   idx += 1;
            // }
            
          }
          
        });
      });
      close_loading_preview();
    });
  }

  // -----------Data Anomaly Analysis-------------
  create_data_anomaly_analysis_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "数据分析模块初始化……";
    
    $("#"+element_id).load("static_content/data_anomaly_analysis_page.html", function(){
      // analysis_element_list 必须与 data_anomaly_analysis_page.html 中的 tab 顺序一致
      var analysis_element_list = [
        "following_num",
        "answer_articles_num",
        "voteup_thanked_num"
      ];
      let idx = 0;
      $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
        getDataAnomalyAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
        // getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
      })
      layui.use('element', function(){
          var element = layui.element;
        element.on('tab(data_anomaly_analysis)', function(data){
          // console.log(this); //当前Tab标题所在的原始DOM元素
          // console.log(data.index); //得到当前Tab的所在下标
          // console.log(data.elem); //得到当前的Tab大容器
          let idx = data.index;
          
          $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
            getDataAnomalyAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
            // getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
          })
          
        });
      });
      close_loading_preview();
    });
  }

  create_data_text_analysis_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "数据分析模块初始化……";
    
    $("#"+element_id).load("static_content/data_text_analysis_page.html", function(){
      // analysis_element_list 必须与 data_analysis_page.html 中的 tab 顺序一致
      var analysis_element_list = [
        "locations",
        "educations_school",
        "educations_major",
        "employments_job",
        "employments_company",
        "business",
        "gender",
        "user_type",
        "voteup_count",
        "favorited_count",
        "thanked_count",
        "answer_count",
        "articles_count",
        "follower_count",
        "following_count",
      ];
      let idx = 0;
      $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
        getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
        getDataAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
      })
      layui.use('element', function(){
          var element = layui.element;
        element.on('tab(data_analysis)', function(data){
          // console.log(this); //当前Tab标题所在的原始DOM元素
          // console.log(data.index); //得到当前Tab的所在下标
          // console.log(data.elem); //得到当前的Tab大容器
          let idx = data.index;
          if (! analysis_element_list[idx].includes("_count")){
            $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
              getDataAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
              getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
            })
          }
          else{
            function show_all_counts(idx, maxidx){
              if(idx < maxidx){
                $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
                  getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data, true, false);
                }).then( nothing => {
                  show_all_counts(idx + 1, maxidx);
                })
              }
              else return;
            }
            show_all_counts(idx, analysis_element_list.length);
            // while(idx < analysis_element_list.length){
            //   console.log("idx:", idx);
            //   console.log("analysis_element_list[idx]:", analysis_element_list[idx]);
            //   $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
            //     getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data, true);
            //   });
            //   idx += 1;
            // }
            
          }
          
        });
      });
      close_loading_preview();
    });
  }
}


function getDataAnalysisBarPlot(plot_element_id, data){
  let atttribute_name = plot_element_id.split("-")[1];
  console.log(translate_columns[atttribute_name], "data:", data)
  let data_list = [], name_list = [], value_list = [];
  for(let key in data){
    data_list.push({"name": key, "value": data[key]});
  }
  data_list.sort(function(a, b){
    return b["value"] - a["value"];
  })
  data_list = data_list.slice(0,20);
  console.log("data_list:", data_list);
  data_list.sort(function(a, b){
    return a["value"] - b["value"];
  })
  for(let ele in data_list){
    name_list.push(data_list[ele]["name"]);
    value_list.push(data_list[ele]["value"]);
  }
  console.log("name_list:", name_list);
  console.log("value_list:", value_list);
  let myColorList = [
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateRainbow),
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateSinebow),
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateTurbo),
  ];
  let myColor = myColorList[Math.floor(Math.random() * myColorList.length)];
  let myChart = echarts.init(document.getElementById(plot_element_id));
      let option = {
        toolbox: {
          show: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        yAxis: {
          type: 'category',
          data: name_list
        },
        xAxis: {
          type: 'value'
        },
        series: [
          {
            name: translate_columns[atttribute_name],
            type: 'bar',
            data: value_list,
            itemStyle: {
              normal: {
                // 定制显示（按顺序）
                color: function(params) { 
                  return myColor(params.dataIndex) 
                }
              },
            }
          }
        ]
      };
      console.log("myColor:", myColor)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}

function getDataAnalysisPiePlot(plot_element_id, data, show_title=false, ordered=true){
  let atttribute_name = plot_element_id.split("-")[1];
  // let atttribute_name = plot_element_id.replace("_count", "");
  console.log(translate_columns[atttribute_name], "data:", data)
  let data_list = [], name_list = [], value_list = [];
  for(let key in data){
    data_list.push({"name": key, "value": data[key]});
  }
  if(ordered){
    data_list.sort(function(a, b){
      return b["value"] - a["value"];
    })
  }else{
    data_list.sort(function(a, b){
      return a["name"].split(",")[0].replace("[", "") - b["name"].split(",")[0].replace("[", "");
    })
  }
  
  data_list = data_list.slice(0,100);
  console.log("data_list:", data_list);
  let myChart = echarts.init(document.getElementById(plot_element_id));
      let option = {
        title: {
          show: show_title,
          text: translate_columns[atttribute_name],
          x: 'center'
        },
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        toolbox: {
          show: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '0%',
          left: 'center'
        },
        series: [
          {
            name: translate_columns[atttribute_name],
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['45%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 0
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
                formatter: '{b} : {c} ({d}%)'
              }
            },
            labelLine: {
              show: false
            },
            data: data_list
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}

//----------------------------------------------------------------//
function getDataAnomalyAnalysisBarPlot(plot_element_id, data){
  let atttribute_name = plot_element_id.split("-")[1];
  console.log(atttribute_name, "data:", data)
  let data_list = [], name_list = [], value_list = [];
  for(let key in data){
    data_list.push({"name": key, "value": data[key]});
  }
  data_list.sort(function(a, b){
    return b["value"] - a["value"];
  })
  // data_list = data_list.slice(0,10);
  console.log("data_list:", data_list);

  for(let ele in data_list){
    name_list.push(data_list[ele]["name"]);
    value_list.push(data_list[ele]["value"]);
  }
  console.log("name_list:", name_list);
  console.log("value_list:", value_list);
  let myColorList = [
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateRainbow),
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateSinebow),
    d3.scaleSequential().domain([0, value_list.length]).interpolator(d3.interpolateTurbo),
  ];
  let myColor = myColorList[Math.floor(Math.random() * myColorList.length)];
  let myChart = echarts.init(document.getElementById(plot_element_id));
      let option = {
        toolbox: {
          show: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        yAxis: {
          name: atttribute_name,
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: name_list,
          axisLabel: { 
            show: true, 
            interval: 0, 
            rotate: 45, 
          }
        },
        series: [
          {
            name: atttribute_name,
            type: 'bar',
            data: value_list,
            itemStyle: {
              normal: {
                // 定制显示（按顺序）
                color: function(params) { 
                  return myColor(params.dataIndex) 
                }
              },
            }
          }
        ]
      };
      console.log("myColor:", myColor)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}