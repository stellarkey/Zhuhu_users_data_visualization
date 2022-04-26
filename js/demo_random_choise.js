class RandomChoiseDemo {
  constructor() {  }

  create_demo_random_choise(element_id){
    open_loading_preview();

    $("#"+element_id).load("static_content/genshin-purple-choise-animation.html", function(){
      let translate_columns = {
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
      let en_columns = [
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
      let final_used_columns = [{
          name: translate_columns["name"],
          width: "150px",
          // sort: true,
        }, {
          name: translate_columns["url_token"],
          hidden: true,
        }, {
          name: translate_columns["user_type"],
          width: "150px",
        }, {
          name: translate_columns["avatar_url"],
          hidden: true,
        }, {
          name: translate_columns["business"],
          hidden: true,
        }, {
          name: translate_columns["description"],
          width: "300px",
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
      var grid_demo;
      if(window.location.hash == "#/demo3/"){
        function random(lo, hi){
          return Math.floor(Math.random() * (hi-lo)) + lo;
        }
        let random_split_range_id = random(0, 100) *1000;
        $.getJSON("data/data_split/data_files_split_by_id/data_"+random_split_range_id+".json").then(data => {
          // console.log("OK");
          // console.log("random_split_range_id:",random_split_range_id);
          // console.log(data);
          let ret_list_of_list = [];
          for (let ele in data){
            let tmp_list = [];
            for (let column in en_columns){
              tmp_list.push(String(data[ele][en_columns[column]]));
            }
            // console.log(tmp_list);
            ret_list_of_list.push(tmp_list);
          }
          console.log(ret_list_of_list);
          let test_list_of_list = [
            ["John", "john@example.com", "(353) 01 222 3333"],
            ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
            ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
            ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
            ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
          ];
          grid_demo = new gridjs.Grid({
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
          document.getElementById(element_id).innerHTML += '<div id="wrapper" visibility="hidden"></div>';
          grid_demo.render(document.getElementById("wrapper"));
        })
      }

      function render_grid(){
        document.getElementById("img-genshin-choise").remove();
        document.getElementById("wrapper").setAttribute("visibility", "visible");
      }

      let myTimeout = setTimeout(render_grid, 3000);

      document.getElementById(element_id).addEventListener("click", function() {
        clearTimeout(myTimeout);
        render_grid();
      });
    
      close_loading_preview();
    });
  }

  
}