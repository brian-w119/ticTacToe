
const game = {

    start  : document.querySelector("#start"),
    reset  : document.querySelector("#reset"),
    display: document.querySelector("#display"),
    speed               : 50,
    textPosition        : 0,
    introduction        : null,


    typingIntro(){
        this.introduction = ["A game of 5 rounds will be played. Man chooses first."]
        this.display.innerHTML = this.introduction[0].substring(0, this.textPosition);
        if(this.textPosition++ != this.introduction[0].length){
         setTimeout(this.typingIntro, this.speed);
        };
     },
    
    
    init(){
       window.addEventListener("load", () => {
          this.typingIntro();
       });
    },


};//end

game.init();