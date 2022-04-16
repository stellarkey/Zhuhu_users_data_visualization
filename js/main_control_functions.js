function open_loading_preview(){  // 开启加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner");
}

function close_loading_preview(){ // 关掉加载动画。
  document.getElementById("loading-preview-animation").setAttribute("class", "spinner-no-more");
}