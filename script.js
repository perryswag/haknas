
//grab
const section = document.querySelector('section');
const playerLivesCount = document.querySelector("span");
const playerLives =  6;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
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

//randomize
const randomize = () => {
    const cardData = getData();  
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
    
};

// Card generator funtion
const cardGenerator = () => {
    const cardData = randomize();
    // console.log(cardData);

    // Generate the HTML

    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        //attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        

        //Attach card to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

//Check cards
const checkCards = (e) => {
    console.log(e);
    const clickedCards = e.target;
    const flippedCards = document.querySelectorAll('.flipped');
    clickedCards.classList.add("flipped");
    // console.log(clickedCards); funkar

    //Logic
    if(flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === 
        flippedCards[1].getAttribute("name")) 
        // console.log(flippedCards);

        {
          console.log("match");  
        }
    }
};

cardGenerator();






      