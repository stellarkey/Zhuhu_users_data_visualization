function open_loading_preview(){  // 开启加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner");
}

function close_loading_preview(){ // 关掉加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner-no-more");
}

// 创建首页内容
function create_homepage_at(element_id){
  document.getElementById(element_id).innerHTML = `
  <div id="main-title" style="font-size: 2em; text-align: center; margin-bottom: 3em;">
    <h1>10W+知乎用户数据可视化项目</h1>
  </div>

  <div id="group-members" style="margin: auto; width:55vw; display: block; overflow:hidden; padding: 5px; border:2px solid black; border-radius: 10px;">
    <div>
      <h2 style="margin-left: 10px;">小组成员</h2>
    </div>
    <div class="layui-card layui-col-space15" style="">
      <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
        <div class="layui-card-header">
          <img src="img/u1.jpg" style="width: 45px;">
        </div>
        <div class="layui-card-header">彭晓 计算机系</div>
        <div class="layui-card-body">
          233
        </div>
      </div>
      <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
        <div class="layui-card-header">
          <img src="img/u2.jpg" style="width: 45px;">
        </div>
        <div class="layui-card-header">李世林 机械系</div>
        <div class="layui-card-body">
          666<br>
        </div>
      </div>
      <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
        <div class="layui-card-header">
          <img src="img/u3.jpg" style="width: 45px;">
        </div>
        <div class="layui-card-header">胡业媛 材料学院</div>
        <div class="layui-card-body">
          233<br>
        </div>
      </div>
    </div>
  </div>
  `;
}