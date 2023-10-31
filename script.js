const game = {

   start  : document.querySelector("#start"),
   reset  : document.querySelector("#reset"),
   display: document.querySelector("#display"),
   grid   : document.querySelectorAll(".box"),

   patternMatched: false,

   box1: document.querySelector("#box1"),
   box2: document.querySelector("#box2"),
   box3: document.querySelector("#box3"),
   box4: document.querySelector("#box4"),
   box5: document.querySelector("#box5"),
   box6: document.querySelector("#box6"),
   box7: document.querySelector("#box7"),
   box8: document.querySelector("#box8"),
   box9: document.querySelector("#box9"),
/*
   column1 : [this.userSelection.row1[0], this.userSelection.row2[0], this.userSelection.row3[0]],
   column2 : [this.userSelection.row1[1], this.userSelection.row2[1], this.userSelection.row3[1]],
   column3 : [this.userSelection.row1[2], this.userSelection.row2[2], this.userSelection.row3[2]],

   */

   resultArr      : [], 
   gameInPlay     : false,
   humanToChoose  : false,
   play           : 0,
       
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
         this.gameInPlay  = true;
         this.humanToChoose   = true;
         this.machineToChoose = false;
         console.log("game started");
       });
   },

   gameReset(){
       this.reset.addEventListener("click", event => {
           this.play     = 0;
           this.gameInPlay = false;
           this.humanToChoose   = false;
           this.machineToChoose = false;
           this.defaultSettings();
           console.log("game is reset");
       });
   },

   

  /* gamePlay(){
      this.userChooses();
      if(this.play === 1){
         this.firstPlay();
      }
   },
   */

   userChooses(){
      this.resultArr = [];
      for(const eachGrid of this.grid){
         eachGrid.addEventListener("click", event => {
             if((this.gameInPlay === true) && (this.patternMatched === false) && (this.humanToChoose === true)){
               eachGrid.innerHTML   = "X";
               eachGrid.style.color = "blue";
               eachGrid.style.backgroundColor = "blue";
               this.play++;
               console.log(`man chose, play:${this.play}`);
               if(this.play === 1){
                  this.firstPlay();
               };
         };  
      });
    };
  },

  randomChoice(){
    let randomNumber = Math.floor(Math.random() * this.resultArr.length);
    this.resultArr[randomNumber].innerHTML   = "C";
    this.resultArr[randomNumber].style.color = "red";
    this.resultArr[randomNumber].style.backgroundColor = "red";

    console.log(`machine chose, play:${this.play}`);
  },

   
   //computer chooses based on certain user's first move
   firstPlay(){
     this.humanToChoose = false;
     //this.play++;
     this.resultArr = [this.box5];

       if(this.userSelection.row1[0].innerHTML === "M"){
         console.log(this.resultArr);
         this.resultArr.push(this.box2, this.box4);
         this.randomChoice();

       }else if(this.userSelection.row1[2].innerHTML === "M"){
        this.resultArr.push(this.box2,this.box6);

       }else if(this.userSelection.row3[0].innerHTML === "M"){
        this.resultArr.push(this.box4,this.box8);

       }else if(this.userSelection.row3[2].innerHTML === "M"){
        this.resultArr.push(this.box6, this.box8);

       }else if(this.userSelection.row2[1].innerHTML === "M"){
       // this.resultArr  = [this.box1, this.box2, this.box3, this.box4, this.box6, this.box7, this.box8, this.box9];
       this.resultArr = [...this.userSelection.row1, ...this.userSelection.row2, ...this.userSelection.row3];
       this.resultArr.splice(this.resultArr.indexOf(box5), 1);

       };
       this.humanToChoose = true;
      
   },

  //sets all indices to "" 
   defaultSettings(){                                                                                        
     for(let value in this.userSelection){
        for(let index = 0; index < 3; index++){
           this.userSelection[value][index].innerHTML = "";
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
     //this.gamePlay();
   },
};

game.init();