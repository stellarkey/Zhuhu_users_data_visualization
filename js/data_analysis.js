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

  //-------------------data advanced analysis-----------------//
  create_data_advanced_analysis_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "数据分析模块初始化……";
    
    $("#"+element_id).load("static_content/data_advanced_analysis_page.html", function(){
      // analysis_element_list 必须与 data_analysis_page.html 中的 tab 顺序一致
      var analysis_element_list = [
        "advanced_data",
      ];
      let idx = 0;
      $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
        getDataAdvanedAnalysisParallelPlot("parallel-" + analysis_element_list[idx], data);
      })
      // layui.use('element', function(){
      //     var element = layui.element;
      //   element.on('tab(data_analysis)', function(data){
      //     // console.log(this); //当前Tab标题所在的原始DOM元素
      //     // console.log(data.index); //得到当前Tab的所在下标
      //     // console.log(data.elem); //得到当前的Tab大容器
      //     let idx = data.index;
      //     if (! analysis_element_list[idx].includes("_count")){
      //       $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
      //         getDataAnalysisBarPlot("bar-" + analysis_element_list[idx], data);
      //         getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data);
      //       })
      //     }
      //     else{
      //       function show_all_counts(idx, maxidx){
      //         if(idx < maxidx){
      //           $.getJSON("data/count_analytics/"+analysis_element_list[idx]+"_count.json").then(data => {
      //             getDataAnalysisPiePlot("pie-" + analysis_element_list[idx], data, true, false);
      //           }).then( nothing => {
      //             show_all_counts(idx + 1, maxidx);
      //           })
      //         }
      //         else return;
      //       }
      //       show_all_counts(idx, analysis_element_list.length); 
      //     }
          
      //   });
      // });
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
    document.getElementById(element_id).innerHTML = "文本数据分析模块初始化……";
    var current_index_data_text_analysis = 0;
    
    $("#"+element_id).load("static_content/data_text_analysis_page.html", function(){
      // 注意这里只取了 1w 条
      $.post(
        'http://407s2.dns.navy:2334/match_fields_count', 
        {},
        function(data){
          // 数据可视化
          console.log("[开始文本数据分析]");
          document.getElementById("data-visualization").setAttribute("style", "visibility: visible;");
          let attr_key_dict = {
            0: "locations",
            1: "educations_school",
            2: "educations_major",
            3: "employments_job",
            4: "employments_company",
            5: "business",
            6: "extract_words",
          }
          
          function plot_everything(idx){
            console.log('attr_key_dict[idx]:', attr_key_dict[idx]);
            if (! attr_key_dict[idx].includes("_count")){
              let attr = attr_key_dict[idx];
              if (attr == "locations" || attr == "business"){
                for(let key in data[attr]){
                  if(data[attr][key] == "") delete data[attr][key];
                }
                // getDataAnalysisPiePlot("pie-" + attr, data[attr]);
                getDataAnalysisBarPlot("bar-" + attr, data[attr]);
                console.log("[getDataAnalysisWordCloudPlot]", attr);
                getDataAnalysisWordCloudPlot("wordcloud-" + attr, data[attr]);
              }
              else if(attr.includes("educations") || attr.includes("employments")){
                let lv1 = attr.split("_")[0], lv2 = attr.split("_")[1];
                // console.log("data:", data)
                // console.log("lv1:", lv1)
                // console.log("lv2:", lv2)
                // getDataAnalysisPiePlot("pie-" + attr, data[lv1][lv2]);
                getDataAnalysisBarPlot("bar-" + attr, data[lv1][lv2]);
                getDataAnalysisWordCloudPlot("wordcloud-" + attr, data[lv1][lv2]);
              }
              else if(attr == "gender"){
                if (1 in data[attr]){
                  data[attr]['男'] = data[attr][1];
                  data[attr]['女'] = data[attr][-1];
                  data[attr]['未知'] = data[attr][0];
                  delete data[attr][1];
                  delete data[attr][-1];
                  delete data[attr][0];
                }
                // getDataAnalysisPiePlot("pie-" + attr, data[attr]);
                getDataAnalysisWordCloudPlot("wordcloud-" + attr, data[attr]);
                getDataAnalysisBarPlot("bar-" + attr, data[attr]);
              }
              else if(attr == "user_type"){
                // getDataAnalysisPiePlot("pie-" + attr, data[attr]);
                getDataAnalysisWordCloudPlot("wordcloud-" + attr, data[attr]);
                getDataAnalysisBarPlot("bar-" + attr, data[attr]);
              }
              else if(attr == "extract_words"){
                open_loading_preview();
                $.getJSON("data/count_analytics/"+attr+"_count.json").then(data =>{
                  console.log("data:", data);
                  getDataAnalysisWordCloudPlot("wordcloud-extract_words", data);
                  getDataAnalysisBarPlot("bar-" + attr, data);
                  getDataAnalysisPiePlot("pie-" + attr, data);
                })
                .then(data => {
                  close_loading_preview();
                })
                
              }
            }
            else{
              function show_all_counts(idx, maxidx){
                console.log("数值活跃度……", idx, maxidx)
                let attr = attr_key_dict[idx];
                if(idx < maxidx && attr.includes("_count")){
                  getDataAnalysisPiePlot("pie-" + attr, data[attr], true, false);
                  show_all_counts(idx + 1, maxidx);
                }
                else return;
              }
              show_all_counts(idx, Object.keys(attr_key_dict).length);
            }
          }

          
          plot_everything(current_index_data_text_analysis);

          layui.use('element', function(){
            var element = layui.element;
            element.on('tab(data_analysis)', function(plot_ele){
              let idx = plot_ele.index;
              plot_everything(idx);
              current_index_data_text_analysis = idx;
            });
          });
        }
      ).then( data =>{
        document.getElementById("data-visualization").setAttribute("style", "visibility: visible;");
        close_loading_preview();
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

//----------------------------------------------------------------//
function getDataAdvanedAnalysisParallelPlot(plot_element_id, data){
  let myChart = echarts.init(document.getElementById(plot_element_id));
  let option = {
    parallelAxis: [
      { dim: 0, name: '回答数' },
      { dim: 1, name: '文章数' },
      { dim: 2, name: '关注者' },
      { dim: 3, 
        name: '所在大学', 
        type: 'category',
        data: ["清华大学", "北京大学", "浙江大学", "上海交通大学", "武汉大学", "复旦大学", "南京大学", "华中科技大学"]
      },
    ],
    series: {
      type: 'parallel',
      lineStyle: {
        width: 2
      },
      data: data
    }
  };
  myChart.setOption(option);
}

function getDataAnalysisWordCloudPlot(plot_element_id, data){
  let atttribute_name = plot_element_id.split("-")[1];
  // let atttribute_name = plot_element_id.replace("_count", "");
  console.log("getDataAnalysisWordCloudPlot:",translate_columns[atttribute_name], "data:", data)
  let data_list = [];
  for(let key in data){
    data_list.push({"name": key, "value": data[key]});
  }
  data_list.sort(function(a, b){
    return b["value"] - a["value"];
  })
  
  data_list = data_list.slice(0,200);
  // console.log("data_list:", data_list);
  
  let myColorList = [
    d3.scaleSequential().domain([0, data_list.length]).interpolator(d3.interpolateRainbow),
    d3.scaleSequential().domain([0, data_list.length]).interpolator(d3.interpolateSinebow),
    d3.scaleSequential().domain([0, data_list.length]).interpolator(d3.interpolateTurbo),
  ];
  let myColor = myColorList[Math.floor(Math.random() * myColorList.length)];
  let myChart = echarts.init(document.getElementById(plot_element_id));
      let option = {
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            sizeRange: [20, 85],
            // drawOutOfBound: true,
            textStyle: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                textStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data_list,
            name: translate_columns[atttribute_name],
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}