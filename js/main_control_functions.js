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