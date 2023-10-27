
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
    machineToChoose: false,
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

    userChooses(){
        this.resultArr = [];
        for(const eachGrid of this.grid){
           eachGrid.addEventListener("click", event => {
               if((this.gameInPlay === true) && (this.patternMatched === false) && (this.humanToChoose === true)){
                 eachGrid.innerHTML   = "M";
                 eachGrid.style.color = "blue";
                 eachGrid.style.backgroundColor = "blue";
                 this.play += 1;
                 console.log(`man played, play: ${this.play}`);
                 if(this.play === 1){
                    setTimeout(this.firstPlay(), 3900);
                 };
                 this.display.innerHTML = "Please choose again";
                 if(this.play === 3){
                   setTimeout(this.secondPlay(), 1500);
                 };
                 };
        });
      };
    },
    
    //computer chooses based on certain user's first move
    firstPlay(){
      this.play++;
      this.resultArr = [];

        if(this.userSelection.row1[0].innerHTML === "M"){
          this.resultArr = [this.box2, this.box3, this.box4, this.box5, this.box7];

        }else if(this.userSelection.row1[2].innerHTML === "M"){
         this.resultArr  = [this.box1, this.box2, this.box5, this.box6, this.box9];

        }else if(this.userSelection.row3[0].innerHTML === "M"){
         this.resultArr  = [this.box1, this.box4, this.box5, this.box8, this.box9];

        }else if(this.userSelection.row3[2].innerHTML === "M"){
         this.resultArr  = [this.box3, this.box5, this.box6, this.box7, this.box8];

        }else if(this.userSelection.row2[1].innerHTML === "M"){
         this.resultArr  = [this.box1, this.box2, this.box3, this.box4, this.box6, this.box7, this.box8, this.box9];
        };
        this.randomChoice();
        console.log(`machine played, play: ${this.play}`);
    },

    box5Chosen(boxA, boxB, boxC){
      this.resultArr  = [];
      this.resultArr  = [boxA, boxB, boxC];
    },

    //computer chooses at random if the user does not choose adjacent boxes after first play
    secondPlayRandom(){
    //this.resultArr  = [];
      for(let row in this.userSelection){
         for(let box = 0; box < (row.length); box++ ){
            if(this.userSelection[row][box].innerHTML === ""){
               this.resultArr.push(this.userSelection[row][box]);
            };
         };
      };
     this.randomChoice();
   },

   //computer's random function
   randomChoice(){
      let randomNum = Math.floor(Math.random() * (this.resultArr.length));
      if(this.resultArr[randomNum].innerHTML === "C"){ //if the machine has already chosen a box that is now an option, call the function again
         this.randomChoice();
      }
      this.resultArr[randomNum].innerHTML   = "C";
      this.resultArr[randomNum].style.color = "red";
      this.resultArr[randomNum].style.backgroundColor = "red";
   },

    //computer chooses based on user's second move
   secondPlay(){
       this.resultArr = [];

       //if box1 and an adjacent box is chosen
       if(this.userSelection.row1[0].innerHTML === "M"){
         this.resultArr = [this.box3, this.box7];
         
         if(this.userSelection.row1[1].innerHTML === "M"){
            this.resultArr.push(this.box4);
           
         }else if(this.userSelection.row2[0].innerHTML === "M"){
            this.resultArr.push(this.box2);

         }else if(this.userSelection.row2[1].innerHTML === "M"){
            this.box5Chosen(this.box6, this.box8, this.box9);

         }else{
            this.secondPlayRandom();
         };
       };

      //if box3 and an adjacent box is chosen
      if(this.userSelection.row1[2].innerHTML === "M"){
         options = [this.box1, this.box9];

         if(this.userSelection.row1[1].innerHTML === "M"){
            options.push(this.box6);

         }else if(this.userSelection.row2[2].innerHTML === "M"){
            options.push(this.box2);

         }else if(this.userSelection.row2[1].innerHTML === "M"){
            this.box5Chosen(this.box4, this.box7, this.box8);
         }else{
            this.secondPlayRandom();
         };
      };

      //if box7 and an adjacent box is chosen
      if(this.userSelection.row3[0].innerHTML === "M"){
         options = [this.box1, this.box9];

         if(this.userSelection.row2[0].innerHTML === "M"){
            options.push(this.box8);

         }else if(this.userSelection.row3[1].innerHTML === "M"){
            options = [this.box4];

         }else if(this.userSelection.row2[1].innerHTML === "M"){
            this.box5Chosen(this.box2, this.box3, this.box6);
         }else{
            this.secondPlayRandom();
         };
      };

      //if box9 and an adjacent box is chosen
      if(this.userSelection.row3[2].innerHTML === "M"){
         options = [this.box3, this.box7];

         if(this.userSelection.row2[2].innerHTML === "M"){
            options.push(this.box8);

         }else if(this.userSelection.row3[1].innerHTML === "M"){
            options = [this.box6];

         }else if(this.userSelection.row2[1].innerHTML === "M"){
            this.box5Chosen(this.box1, this.box2, this.box4);

         }else{
            this.secondPlayRandom();
         };
      };

       //if middle box and an adjacent box is chosen by user
      if(this.userSelection.row2[1].innerHTML === "M"){
         this.resultArr = [];
         if(this.userSelection.row1[1].innerHTML === "M"){
            this.resultArr = [this.box7, this.box8];

         }else if(this.userSelection.row3[1].innerHTML === "M"){
            this.resultArr = [this.box1, this.box2];

         }else if(this.userSelection.row2[0].innerHTML === "M"){
            this.resultArr = [this.box3, this.box6];

         }else if(this.userSelection.row2[2].innerHTML === "M"){
            this.resultArr = [this.box1, this.box4];
         };
      };
      this.randomChoice();
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
    },
};

game.init();