
const game = {

    start  : document.querySelector("#start"),
    reset  : document.querySelector("#reset"),
    display: document.querySelector("#display"),
    grid   : document.querySelectorAll(".box"),

    box1: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,
    box7: null,
    box8: null,
    box9: null,

    resultArr: [], 
        
    // the result for the game is stored in an array in an object
    userSelection: {
        row1: [this.box1, this.box2, this.box3],
        row2: [this.box4, this.box5, this.box6],
        row3: [this.box7, this.box8, this.box9],
    },
   

    typingIntro(){
        const speed        = 50;
        const textPosition = 0;
        const introduction = ["A game of 5 rounds will be played. Man chooses first."];

        this.display.innerHTML = introduction[0].substring(0, this.textPosition);
        if(this.textPosition++ != introduction[0].length){
         setTimeout(this.typingIntro, this.speed);
        };
     },

    userChooses(){
        for(const eachGrid of this.grid){
           eachGrid.addEventListener("click", event => {

           /* if(manChooses){
                eachGrid.innerHTML = "X";
            }else{
                eachGrid.innerHTML = "O";
            };
            */

        });
      };
    },

    computerChooses(){
       this.resultArr = [];
       for(let row in this.userSelection){
          for(let index = 0; index < 3; index++){
             if(this.userSelection[row][index] === null){
                 this.resultArr.push(this.userSelection[row][index]);
             };
          };
       };
       console.log(this.resultArr);
    },

    init(){
       window.addEventListener("load", () => this.typingIntro() );
       this.userChooses();
       this.computerChooses();
    },


};//end

game.init();