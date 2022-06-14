class SearchEngine {
  constructor() {  }

  create_search_engine_at(element_id){
    open_loading_preview();
    // console.log(element_id)
    // console.log(document.getElementById(element_id))
    document.getElementById(element_id).innerHTML = "初始化……";
    var translate_columns = {
      "name": "昵称",
      "url_token": "用户识别码",
      "user_type": "用户类型",
      "avatar_url": "头像链接",
      "business": "所属领域",
      "description": "个人描述",
      "educations": "教育背景",
      "employments": "职业背景",
      "gender": "性别",
      "headline": "签名",
      "locations": "地区",
      "answer_count": "回答数",
      "articles_count": "文章数",
      "voteup_count": "获赞数",
      "thanked_count": "感谢数",
      "favorited_count": "收藏数",
      "follower_count": "被关注数",
      "following_count": "关注数",
    };
    var en_columns = [
      "name",
      "url_token",
      "user_type",
      "avatar_url",
      "business",
      "description",
      "educations",
      "employments",
      "gender",
      "headline",
      "locations",
      "answer_count",
      "articles_count",
      "voteup_count",
      "thanked_count",
      "favorited_count",
      "follower_count",
      "following_count",
    ];
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
    var grid;
    
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
          'http://407s2.dns.navy:2334/search_zhihu', 
          {
            search_text : String(search_text)
          },
          function(data){
            // console.log("[data]");
            // console.log(data["hits"]["hits"]);
            // console.log("[data]");
            
            // document.getElementById("search-result").innerHTML = JSON.stringify(data["hits"]["hits"]);

            data = data["hits"]["hits"];
            console.log("OK");
            // console.log("random_split_range_id:",random_split_range_id);
            // console.log(data);
            for (let ele in data){
              let tmp_list = [];
              for (let column in en_columns){
                if( en_columns[column] in data[ele]["highlight"] ){
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


            // 数据可视化





          }
        );
      }

      close_loading_preview();
    });
  }
}