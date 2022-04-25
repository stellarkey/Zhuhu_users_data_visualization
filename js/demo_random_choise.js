class RandomChoiseDemo {
  constructor() {  }

  create_demo_random_choise(element_id){
    open_loading_preview();
    $("#"+element_id).load("static_content/genshin-purple-choise-animation.xml");

    setTimeout(function (){
      $("#"+element_id).load("static_content/random-choise-animation.xml");
    }, 3450);
    
    close_loading_preview();
  }
}