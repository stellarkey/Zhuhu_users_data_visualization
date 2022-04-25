class RandomChoiseDemo {
  constructor() {  }

  create_demo_random_choise(element_id){
    open_loading_preview();
    $("#"+element_id).load("static_content/genshin-purple-choise-animation.html");

    setTimeout(function (){
      if(window.location.hash == "#/demo3/"){
        $("#"+element_id).load("static_content/random-choise-animation.html");
      }
    }, 3400);
    
    close_loading_preview();
  }
}