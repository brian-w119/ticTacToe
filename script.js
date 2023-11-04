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
   play           : 0,
   randomNumber   : null,

   patternMatched: false,
       
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
         console.log(`game started,round: ${this.play}`);
       });
   },

   gameReset(){
       this.reset.addEventListener("click", event => {
           this.play       = 0;
           this.gameInPlay = false;
           this.humanToChoose   = false;
           this.machineToChoose = false;
           this.defaultSettings();
           console.log("game is reset");
       });
   },

   userChooses(){
       if(this.play < 4){
         this.manChooses();
       }else{
         this.manChooses();
       }
       console.log(this.play);
       
   },

   manChooses(){
       let resultArr1 = [];
       for(const eachGrid of this.grid){
           eachGrid.addEventListener("click", event => {
               if((this.gameInPlay === true) && (this.humanToChoose === true)){
                 eachGrid.innerHTML   = "M";
                 eachGrid.style.color = "blue";
                 eachGrid.style.backgroundColor = "blue";
                 this.play++;
               };
               console.log(`man played: ${this.play}`);
               if(this.play <= 8){
                 setTimeout(this.machinePlay(), 2000);
               };
               //console.log(`man played: ${this.play}`);
           });
       }; 
   },

   patternSearch(){

      let pattern = {
         pattern1: [this.box1, this.box2, this.box3],
         pattern2: [this.box4, this.box5, this.box6],
         pattern3: [this.box7, this.box8, this.box9],
         pattern4: [this.box1, this.box4, this.box7],
         pattern5: [this.box3, this.box6, this.box9],
         pattern6: [this.box1, this.box5, this.box9],
         pattern7: [this.box3, this.box5, this.box7],
      };
      
      for(let array in pattern){
           for(index of pattern[array]){
              if((index.innerHTML ===  pattern[array][0].innerHTML) && this.play >= 5){
                 this.patternMatched = true;
                 console.log("match found");
              }else{
                console.log("n0 match found");
              };
           };
      };
   },

   //computer's first play
   machinePlay(){
       this.resultArr = [this.box5];
      
       if(this.userSelection.row1[0].innerHTML === "M"){
               this.resultArr.push(this.box2, this.box4);
               this.randomChoice();

       }else if(this.userSelection.row1[2].innerHTML === "M"){
              this.resultArr.push(this.box1,this.box6);
              this.randomChoice();
      
       }else if(this.userSelection.row3[0].innerHTML === "M"){
              this.resultArr.push(this.box4,this.box8);
              this.randomChoice();

      }else if(this.userSelection.row3[2].innerHTML === "M"){
              this.resultArr.push(this.box6, this.box8);
              this.randomChoice();

      }else if(this.userSelection.row3[1].innerHTML === "M"){
               this.resultArr.push(this.box8, this.box4);
               this.randomChoice();

      }else if(this.userSelection.row2[1].innerHTML === "M"){
               this.resultArr.push(this.box1, this.box2, this.box3, this.box4, this.box6, this.box7, this.box8, this.box9);
               this.resultArr.shift();
               this.randomChoice();
      }else{
        this.randomChoice();
      };

       console.log("options computer can choose from:", this.resultArr);
       
       console.log(`machine played: play${this.play}`);
   },

   
   
   //machines random choooses from a predefined list"
   randomChoice(){
      this.play++;
        if(this.play < 5){
            this.selectBox();
        }else{
            if(this.play < 10){
                this.loopThrough();
            };
        };
   },

   loopThrough(){
        this.resultArr = [];
        for(let eachRow in this.userSelection){
            for(let eachGrid of this.userSelection[eachRow]){
                if(eachGrid.innerHTML === ""){
                    this.resultArr.push(eachGrid);
                };
            };
        };
      console.log(this.resultArr);
      this.selectBox2();
   },

   generateRandomNumber(){
        randomNumber = Math.floor(Math.random() * (this.resultArr.length)); 
   },

   //machine selects if play < 5
   selectBox(){
        this.generateRandomNumber();
        this.resultArr[randomNumber].innerHTML !== ""? this.generateRandomNumber(): "" ;
        if(this.resultArr[randomNumber].innerHTML === ""){
             this.resultArr[randomNumber].innerHTML = "C";
             this.resultArr[randomNumber].style.color = "red";
             this.resultArr[randomNumber].style.backgroundColor = "red";
        };
        console.log("machine chose:",  this.resultArr[randomNumber]);
    },
   
    //machine selects if play is greater than 5
   selectBox2(){
      let randomNumber = Math.floor(Math.random() * (this.resultArr.length));
      this.resultArr[randomNumber].innerHTML = "C";
      this.resultArr[randomNumber].style.color = "red";
      this.resultArr[randomNumber].style.backgroundColor = "red"; 
      console.log("machine chose:",  this.resultArr[randomNumber]); 
    },


   //sets all indices to "null"
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
      this.patternSearch();
   },
};

game.init();