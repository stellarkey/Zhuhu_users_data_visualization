class RandomChoiseDemo {
  constructor() {  }

  create_demo_random_choise(element_id){
    open_loading_preview();
    
    
    function random(lo, hi){
      return Math.floor(Math.random() * (hi-lo)) + lo;
    }
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
      let grid_demo;
      let ret_list_of_list = [];
      let data;
      let random_split_range_id = random(0, 100) *1000;
        
      $.getJSON("data/data_split/data_files_split_by_id/data_"+random_split_range_id+".json").then(raw_data => {
        data = raw_data;
        // console.log("OK");
        // console.log("random_split_range_id:",random_split_range_id);
        // console.log(data);
        for (let ele in data){
          let tmp_list = [];
          for (let column in en_columns){
            tmp_list.push(String(data[ele][en_columns[column]]));
          }
          // console.log(tmp_list);
          ret_list_of_list.push(tmp_list);
        }
        // console.log(ret_list_of_list);
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
      })

      function render_grid(){
        let infomation = `
        <h1 style="text-align:center;">🙌🙌🙌<br><br>
        您抽中的用户范围为: `
        +"["+String(random_split_range_id)
        +", "+ String(random_split_range_id+1000)
        +"]"+`
        <a href="javascript:location.reload();" class="layui-btn layui-btn-normal">再来一发</a></h1>`;
        document.getElementById("platformBox").innerHTML = `<div>${infomation}</div>`;
        let index = layer.open({
          type:1,// type:div
          title:"提示",
        //   skin: 'layui-layer-rim',
          area: ['800px', 'fit-content'],
          shadeClose: true,
          content:$("#platformBox"),
        });
        // alert("抽取用户范围:","["+String(random_split_range_id)+", "+ String(random_split_range_id+1000)+"]");
        
        
        document.getElementById("img-genshin-choise").remove();
        grid_demo.render(document.getElementById("wrapper"));
      }

      let myTimeout = setTimeout(render_grid, 3000);
      
      document.getElementById("img-genshin-choise").addEventListener("click", function() {
        clearTimeout(myTimeout);
        setTimeout(render_grid, 300);
      });
      window.addEventListener("click", function() {
        clearTimeout(myTimeout);
      });
    
      close_loading_preview();
    });
  }

  
}