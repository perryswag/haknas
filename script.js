
//Get parts from the HTML
const section = document.querySelector('section');
const matchingPairsCountCount = document.querySelector("span");

//Counter that keeps track of how many matching pairs user has found
let matchingPairsCount =  0;


//Text-content should update in sync with events happening in the game
matchingPairsCountCount.textContent = matchingPairsCount;

//Generate dataset with pictures included in memory
const getData = () => [

    { imgSrc: "./imagesM/hastm1.png", name:"nr1" },
    { imgSrc: "./imagesM/hastm2.png", name:"nr2" },
    { imgSrc: "./imagesM/hastm3.png", name:"nr3" },
    { imgSrc: "./imagesM/hastm4.png", name:"nr4" },
    { imgSrc: "./imagesM/hastm5.png", name:"nr5" },
    { imgSrc: "./imagesM/hastm6.png", name:"nr6" },
    { imgSrc: "./imagesM/hastm7.png", name:"nr7" },
    { imgSrc: "./imagesM/hastm1.png", name:"nr1" },
    { imgSrc: "./imagesM/hastm2.png", name:"nr2" },
    { imgSrc: "./imagesM/hastm3.png", name:"nr3" },
    { imgSrc: "./imagesM/hastm4.png", name:"nr4" },
    { imgSrc: "./imagesM/hastm5.png", name:"nr5" },
    { imgSrc: "./imagesM/hastm6.png", name:"nr6" },
    { imgSrc: "./imagesM/hastm7.png", name:"nr7" },
    { imgSrc: "./imagesM/tjader1.png", name:"tjader" },
    { imgSrc: "./imagesM/tjader2.png", name:"tjader" },

];

//Randomize order of items (cards) in dataset
const randomize = () => {  
    const cardData = getData();    
    cardData.sort(() => Math.random() - 0.5);
    return cardData;    
};

//Generate a card for each item 
const cardGenerator = () => {
   
    const cardData = randomize();

    //For each item, generate a card which has a face and back
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        //Attach relevant data to the cards
        //Face should be a picture and the card should have its itemname as attribute
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        //When user clicks on a card, function e will run 
        //and the class toggleCard will be added to that card
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });

    });

};

//This will happen everytime the user clicks on a card
const checkCards = (e) => {
    
    //Card gets flipped and ability to toggle
    const clickedCards = e.target;
    clickedCards.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");

    //If the first flipped card is a capercaillie(tjader), print error message, 
    //reset all cards to non-flipped and restart game
    if(flippedCards.length === 1) {
        if (flippedCards[0].getAttribute("name") === "tjader") {        
            console.log("tjäderattack kort1!!!"); 
            
              setTimeout(() => restart(
                "TJÄDERATTACK!!!!!! 🚨🚨🚨🚨🚨 Aj aj aj, nu kom 🦃tjädern🦃 och tog dig. Bara att börja om.")
                , 2000);

                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                  });


            //Reset counter and update text    
            matchingPairsCount = 0;
            matchingPairsCountCount.textContent = matchingPairsCount;
        };
    }
    
    //When two cards are flipped, check if there is a match
    if(flippedCards.length === 2) {

        //If the other flipped card is a capercaillie(tjader), 
        //restart game the same way as earilier described 
        if ((flippedCards[1].getAttribute("name") === "tjader") ||
        (flippedCards[0].getAttribute("name") === "tjader")) {
            console.log("tjäderattack kort2!!!"); 
            
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
              });

            setTimeout(() => restart(
                "TJÄDERATTACK!! 🚨🚨🚨🚨🚨 Nu rymde alla hästarna, du får leta rätt på dom igen.")
                , 2000);

            matchingPairsCount = 0;
            matchingPairsCountCount.textContent = matchingPairsCount;
        };  
        
        //If the two flipped cards has matching names, it's a match. 
        //Update the counter, update text and make the matching cards stay flipped
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("rätt ihopparat!");  

            matchingPairsCount++;
            matchingPairsCountCount.textContent = matchingPairsCount;

            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
          });
        } 
    
        //If it's not a match, flip the cards back
        else {
            console.log("ingen match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
        }
    }

    //If the user finds all 7 pairs they've finished the memory and it will restart
    if(toggleCard.length === 14) {
        setTimeout(() => restart(
            "!! Du klarade det!! Bra jobbat, nu kan du andas ut inga tjädrar kan ta dig nu."
              ), 2000);
    }

};

//Restart of memory, reset data and generate new
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
 
    //Make cards unclickable while resetting is done
    section.style.pointerEvents = "none";

    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);

            //Make cards clickable again
            section.style.pointerEvents = "all";
        }, 1000) //Delay a little so cards are flipped back before reseting is made
    });
    
    setTimeout(() => window.alert(text), 1000);

};

//Run to generate new cards
cardGenerator();