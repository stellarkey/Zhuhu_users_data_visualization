class SearchEngine {
  constructor() {  }

  create_search_engine_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "初始化……";
    
    var final_used_columns = [{
        name: translate_columns["name"],
        width: "150px",
        // sort: true,
        formatter: (_, row) => gridjs.html(`${row.cells[0].data}`)
      }, {
        name: translate_columns["url_token"],
        hidden: true,
      }, {
        name: translate_columns["user_type"],
        width: "150px",
        hidden: true,
      }, {
        name: translate_columns["avatar_url"],
        hidden: true,
      }, {
        name: translate_columns["business"],
        hidden: true,
      }, {
        name: translate_columns["description"],
        width: "300px",
        formatter: (_, row) => gridjs.html(`${row.cells[5].data}`)
      }, {
        name: translate_columns["educations"],
        hidden: true,
      }, {
        name: translate_columns["employments"],
        hidden: true,
      }, {
        name: translate_columns["gender"],
        hidden: true,
      }, {
        name: translate_columns["headline"],
        width: "300px",
        formatter: (_, row) => gridjs.html(`${row.cells[9].data}`)
      }, {
        name: translate_columns["locations"],
        hidden: true,
      }, {
        name: translate_columns["answer_count"],
        width: "120px",
      }, {
        name: translate_columns["articles_count"],
        width: "120px",
      }, {
        name: translate_columns["voteup_count"],
        width: "120px",
      }, {
        name: translate_columns["thanked_count"],
        width: "120px",
      }, {
        name: translate_columns["favorited_count"],
        width: "120px",
      }, {
        name: translate_columns["follower_count"],
        width: "120px",
      }, {
        name: translate_columns["following_count"],
        width: "120px",
      },
    ]
    let grid;
    
    $("#"+element_id).load("static_content/search_engine_page.html", function(){
      document.getElementById("search-button").onclick = function(){
        let search_text = document.getElementById("search-text").value;
        if(search_text == "") {
          search_text = "数据可视化";
          document.getElementById("search-text").value = search_text;
        }
        console.log("search_text:", search_text);

        let ret_list_of_list = [];
        $.post(
          'http://407s2.dns.navy:2334/search', 
          {
            search_text : String(search_text)
          },
          function(data){
            // console.log("[data]");
            // console.log(data["hits"]["hits"]);
            // console.log("[data]");
            
            // document.getElementById("search-result").innerHTML = JSON.stringify(data["hits"]["hits"]);

            data = data["hits"]["hits"];
            // console.log("OK");
            // console.log("random_split_range_id:",random_split_range_id);
            
            for (let ele in data){
              // console.log('data[ele]["highlight"]:', data[ele]["highlight"]);
              let tmp_list = [];
              for (let column in en_columns){
                // console.log("en_columns[column]:", en_columns[column])
                
                if( data[ele]["highlight"] != null && en_columns[column] in data[ele]["highlight"] ){
                  tmp_list.push(String(data[ele]["highlight"][en_columns[column]]));
                }
                else{
                  tmp_list.push(String(data[ele]["_source"][en_columns[column]]));
                }
              }
              // console.log(tmp_list);
              ret_list_of_list.push(tmp_list);
            }
            // console.log(ret_list_of_list);
            
            
            if (document.getElementById("search-result").innerHTML == ""){
              grid = new gridjs.Grid({
                columns: final_used_columns,
                data: ret_list_of_list,
                search: true,
                // resizable: true,
                sort: true,
                pagination: {limit: 10},
                style: {
                  table: {
                    border: '3px solid #ccc'
                  },
                  th: {
                    'background-color': 'rgba(0, 0, 0, 0.1)',
                    color: '#000',
                    'border-bottom': '3px solid #ccc',
                    'text-align': 'center'
                  },
                  td: {
                    // 'text-align': 'center'
                  }
                }
              });
              grid.render(document.getElementById("search-result"));
            }
            else {
              grid.updateConfig({
                data: ret_list_of_list
              }).forceRender();
            }

          }
        );
      }
      // $("#search-button").click();
      close_loading_preview();
    });
  }

  create_keywords_based_visualization_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "初始化……";
    var current_index_keywords_based_visualization = 0;
    $("#"+element_id).load("static_content/search_engine-keywords_based_visualization.html", function(){
      document.getElementById("search-button").onclick = function(){
        open_loading_preview();
        let search_text = document.getElementById("search-text").value;
        if(search_text == "") {
          search_text = "清华大学";
          document.getElementById("search-text").value = search_text;
        }
        console.log("search_text:", search_text);

        $.post(
          'http://407s2.dns.navy:2334/search_count', 
          {
            search_text : String(search_text)
          },
          function(data){
            // 数据可视化
            console.log("[开始数据可视化]");
            document.getElementById("data-visualization").setAttribute("style", "visibility: visible;");
            let attr_key_dict = {
              0: "locations",
              1: "educations_school",
              2: "educations_major",
              3: "employments_job",
              4: "employments_company",
              5: "business",
              6: "gender",
              7: "user_type",
              8: "extract_words",
              9: "voteup_count",
              10: "favorited_count",
              11: "thanked_count",
              12: "answer_count",
              13: "articles_count",
              14: "follower_count",
              15: "following_count",
            }
            
            function plot_everything(idx){
              console.log('attr_key_dict[idx]:', attr_key_dict[idx]);
              if (! attr_key_dict[idx].includes("_count")){
                let attr = attr_key_dict[idx];
                if (attr == "locations" || attr == "business"){
                  getSearchEnginePiePlot("pie-" + attr, data[attr]);
                  getSearchEngineBarPlot("bar-" + attr, data[attr]);
                }
                else if(attr.includes("educations") || attr.includes("employments")){
                  let lv1 = attr.split("_")[0], lv2 = attr.split("_")[1];
                  // console.log("data:", data)
                  // console.log("lv1:", lv1)
                  // console.log("lv2:", lv2)
                  getSearchEnginePiePlot("pie-" + attr, data[lv1][lv2]);
                  getSearchEngineBarPlot("bar-" + attr, data[lv1][lv2]);
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
                  getSearchEnginePiePlot("pie-" + attr, data[attr]);
                  getSearchEngineBarPlot("bar-" + attr, data[attr]);
                }
                else if(attr == "user_type"){
                  getSearchEnginePiePlot("pie-" + attr, data[attr]);
                  getSearchEngineBarPlot("bar-" + attr, data[attr]);
                }
                else if(attr == "extract_words"){
                  open_loading_preview();
                  $.post(
                    'http://407s2.dns.navy:2334/extract_words', 
                    {
                      search_text : String(search_text)
                    },
                    function(data){
                      
                      // console.log("data:", data);
                      getSearchEngineWordCloudPlot("wordcloud-word_cloud", data);
                      getSearchEngineBarPlot("bar-" + attr, data);
                      getSearchEnginePiePlot("pie-" + attr, data);
                      
                    }
                  ).then(data => {
                    close_loading_preview();
                  })
                }
                else if(attr == "word_cloud"){
                  open_loading_preview();
                  $.post(
                    'http://407s2.dns.navy:2334/extract_words', 
                    {
                      search_text : String(search_text)
                    },
                    function(data){
                      getSearchEngineWordCloudPlot("wordcloud-" + attr, data);
                      // console.log("data:", data);
                      // getSearchEngineBarPlot("bar-" + attr, data);
                      // getSearchEnginePiePlot("pie-" + attr, data);
                      
                    }
                  ).then(data => {
                    close_loading_preview();
                  })
                }
              }
              else{
                function show_all_counts(idx, maxidx){
                  console.log("数值活跃度……", idx, maxidx)
                  let attr = attr_key_dict[idx];
                  if(idx < maxidx && attr.includes("_count")){
                    getSearchEnginePiePlot("pie-" + attr, data[attr], true, false);
                    show_all_counts(idx + 1, maxidx);
                  }
                  else return;
                }
                show_all_counts(idx, Object.keys(attr_key_dict).length);
              }
            }

            
            plot_everything(current_index_keywords_based_visualization);

            layui.use('element', function(){
              var element = layui.element;
              element.on('tab(data_analysis)', function(plot_ele){
                let idx = plot_ele.index;
                plot_everything(idx);
                current_index_keywords_based_visualization = idx;
              });
            });
          }
        ).then( data =>{
          document.getElementById("data-visualization").setAttribute("style", "visibility: visible;");
          close_loading_preview();
        });
      }
      $("#search-button").click();
      close_loading_preview();
    });
  }

  create_higher_order_retrieval_and_visualization_at(element_id){
    open_loading_preview();
    document.getElementById(element_id).innerHTML = "初始化……";
    
    $("#"+element_id).load("static_content/search_engine-higher_order_retrieval_and_visualization.html", function(){
      

      close_loading_preview();
    });
  }
}


function getSearchEngineBarPlot(plot_element_id, data){
  let atttribute_name = plot_element_id.split("-")[1];
  // console.log(translate_columns[atttribute_name], "data:", data)
  let data_list = [], name_list = [], value_list = [];
  for(let key in data){
    data_list.push({"name": key, "value": data[key]});
  }
  data_list.sort(function(a, b){
    return b["value"] - a["value"];
  })
  data_list = data_list.slice(0,20);
  // console.log("data_list:", data_list);
  data_list.sort(function(a, b){
    return a["value"] - b["value"];
  })
  for(let ele in data_list){
    name_list.push(data_list[ele]["name"]);
    value_list.push(data_list[ele]["value"]);
  }
  // console.log("name_list:", name_list);
  // console.log("value_list:", value_list);
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
      // console.log("myColor:", myColor)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}


function getSearchEnginePiePlot(plot_element_id, data, show_title=false, ordered=true){
  let atttribute_name = plot_element_id.split("-")[1];
  // let atttribute_name = plot_element_id.replace("_count", "");
  // console.log(translate_columns[atttribute_name], "data:", data)
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
  // console.log("data_list:", data_list);
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


function getSearchEngineWordCloudPlot(plot_element_id, data){
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
  
  data_list = data_list.slice(0,100);
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