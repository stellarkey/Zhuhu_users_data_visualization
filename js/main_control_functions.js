function open_loading_preview(){  // 开启加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner");
}

function close_loading_preview(){ // 关掉加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner-no-more");
}

function clear_nav_hightlight(){  // 取消导航栏高亮
  for (let item of document.getElementsByClassName("layui-this")){
      item.classList.remove("layui-this");
    }
}

// 创建首页
function create_homepage(){
  $("#main-content-area").load("static_content/main_page.html", function(){
    // 创建3d词云
    function create_3d_cloud() {
      console.log("create_3d_cloud");
      try {
        TagCanvas.Start('myCanvas','tags',{
          interval: 20,
          textColour: '#97d4ff',
          outlineColour: '#fff',
          shape: 'sphere',
          textHeight: 25,
          reverse: true,
          // noMouse:true,
          depth: 0.5,
          dragControl: false,
          //                    decel:0.95,
          maxSpeed: 0.05,
          minSpeed: 0.05,
          initial: [-0.08, 0]
        });
      } catch(e) {
        // something went wrong, hide the canvas container
        document.getElementById('myCanvasContainer').style.display = 'none';
      }
    }

    create_3d_cloud();
  })
  
}

// 创建404页面
function create_404_page(){
  $("#main-content-area").load("static_content/404.html");
}