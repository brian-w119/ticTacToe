
const game = {

    start  : document.querySelector("#start"),
    reset  : document.querySelector("#reset"),
    display: document.querySelector("#display"),
    grid   : document.querySelectorAll(".box"),

    box1: document.querySelector("#box1"),
    box2: document.querySelector("#box2"),
    box3: document.querySelector("#box3"),
    box4: document.querySelector("#box4"),
    box5: document.querySelector("#box5"),
    box6: document.querySelector("#box6"),
    box7: document.querySelector("#box7"),
    box8: document.querySelector("#box8"),
    box9: document.querySelector("#box9"),

    resultArr      : [], 
    gameInPlay     : false,
    humanToChoose  : false,
    machineToChoose: false,
    round          : 0,
        
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

    gameStart(){
        this.start.addEventListener("click", event => {
          this.gameInPlay      = true;
          this.humanToChoose   = true;
          this.machineToChoose = false;
          console.log(`game started,round: ${this.round}`);
        });
    },

    gameReset(){
        this.reset.addEventListener("click", event => {
            this.round           = 0;
            this.gameInPlay      = false;
            this.humanToChoose   = false;
            this.machineToChoose = false;
            this.defaultSettings();
            console.log("game is reset");
        });
    },

    userChooses(){
        this.resultArr = [];
        for(const eachGrid of this.grid){
           eachGrid.addEventListener("click", event => {
               if((this.gameInPlay === true) && (this.round < 5) && (this.humanToChoose === true)){
                 eachGrid.innerHTML             = "X";
                 eachGrid.style.color           = "blue";
                 eachGrid.style.backgroundColor = "blue";
                 setTimeout(this.computerChooses(), 1500);
                //this.computerChooses();
            }
        });
      };
    },

    computerChooses(){
       let items;
       let choice;
       this.resultArr = [];
       for(let row in this.userSelection){
          for(let index = 0; index < 3; index++){
             if(this.userSelection[row][index].innerHTML === ""){
                 this.resultArr.push(this.userSelection[row][index]);
             };
         };
      };
      console.log(this.resultArr);
      items  = this.resultArr.length;
      choice = Math.floor(Math.random() * 9);
      console.log(this.resultArr[choice]);
      this.round += 1;
      this.resultArr[choice].innerHTML  = "C";
      this.resultArr[choice].style.color   = "red";
      this.resultArr[choice].style.backgroundColor = "red";
    },

    //sets all indices to "null"
    defaultSettings(){
       for(let value in this.userSelection){
           for(let index = 0; index < 3; index++){
               this.userSelection[value][index].innerHTML= "";
               this.userSelection[value][index].style.backgroundColor = "grey";
           };
        };
    },

    init(){
        window.addEventListener("load", () => {
          this.typingIntro();
          this.defaultSettings();
        });
       this.gameStart();
       this.gameReset();
       this.userChooses();
    },
};

game.init();