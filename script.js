
//Hämta delar från html
const section = document.querySelector('section');
const playerLivesCount = document.querySelector("span");
// Deklarera let istället för count på playerLives för att kunna ändra objektet
let playerLives =  0;

//Innehållet i texten ska uppdateras i takt med vad som händer i memoryt
playerLivesCount.textContent = playerLives;

//Data med alla bilder som ska va med i memoryt
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

//Deklarering av funktion randomoize
//som ger objekten i cardData ett random nummer 

// Varför -0.5 här egentligen , testa utan
const randomize = () => {  
    const cardData = getData();    
    cardData.sort(() => Math.random() - 0.5);
    return cardData;    
};

// CardGenerator genererar slumpat memory genom att köra randomize
const cardGenerator = () => {
    const cardData = randomize();

    // Generate the HTML
    //För varje objekt i cardData, gör ett kort, en framsida och en baksida
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        //Attach info till varje kort
        //Facet ska vara en bild, kortet ska ha bildnamnet som attribut
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        //Attach kortet i sektionsdelen av koden
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        //När användaren klickar på ett kort, kommer funktionen? (e) genomföras
        //toggleCard kommer adderas till varje objekt när ett kort klickas
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

//Kolla på kortet vi klickar på
//Varje gång vi flippar ett kort adderar vi flipped till objektet
//Vi samlar alla objekt som har klasserna flipped och toggelCard i varsina nodeLists
const checkCards = (e) => {
    const clickedCards = e.target;
    clickedCards.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");

    
    //Om det första vända kortet är en tjäder, börja om!!
    if(flippedCards.length === 1) {
        if (flippedCards[0].getAttribute("name") === "tjader") {        
            console.log("tjäderattack kort1!!!"); 
            
              setTimeout(() => restart(
                "TJÄDERATTACK!!!!!! 🚨🚨🚨🚨🚨 Aj aj aj, nu kom 🦃tjädern🦃 och tog dig. Bara att börja om.")
                , 2000);

                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                  });

            playerLives = 0;
            playerLivesCount.textContent = playerLives;
        };
    
    }
    
    //Om det finns två flippade kort och det första namnet är samma 
    //som det andra namnet, dvs det är samma kort får vi en match.
    //För varje flippat kort tar vi då bort flipped och gör korten 
    //oklickbara, dvs det går inte att göra något med dom utan dom stannar uppvända
    if(flippedCards.length === 2) {

        //Om det andra vända kortet är en tjäder, börja om!!

        // if (flippedCards[0].getAttribute("name") === "tjader") {
        //     console.log("tjäderattack kort2!!!"); 
            
        //     flippedCards.forEach(card => {
        //         card.classList.remove("flipped");
        //       });

        //     setTimeout(() => restart(
        //         "TJÄDERATTACK!! 🚨🚨🚨🚨🚨 Nu rymde alla hästarna, du får leta rätt på dom igen.")
        //         , 2000);

        //     playerLives = 0;
        //     playerLivesCount.textContent = playerLives;
        // };

        //göra en for-loop istället ? som itererar typ

        if ((flippedCards[1].getAttribute("name") === "tjader") ||
        (flippedCards[0].getAttribute("name") === "tjader")) {
            console.log("tjäderattack kort2!!!"); 
            
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
              });

            setTimeout(() => restart(
                "TJÄDERATTACK!! 🚨🚨🚨🚨🚨 Nu rymde alla hästarna, du får leta rätt på dom igen.")
                , 2000);

            playerLives = 0;
            playerLivesCount.textContent = playerLives;
        };  
        
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("rätt ihopparat!");  
            playerLives++;
            playerLivesCount.textContent = playerLives;
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
          });
        } 

        
        //Annars är det inte rätt. Vi tar bort flipped samt toggleCard så att
        //kortet inte visas längre. Vi togglar tillbaka till hide helt enkelt.
        //Timern bestämmer när kortet ska bli hidden igen
        else {
            console.log("ingen match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
        }
    }

    //Om längden på toggleCard är 14 så är memoryt klarat!
    if(toggleCard.length === 14) {
        //lägg in här så att allt visas och att det finns någon knapp med börja om? eller inte 
        // du behöver inte ta vatten över huvudet
        // lägg in här så det återställs osv!
        setTimeout(() => restart(
            "!! Du klarade det!! Bra jobbat, nu kan du andas ut inga tjädrar kan ta dig nu."
              ), 2000);
    }

};

//Restart av memoryt
// Ta bort all info vi har sen innan och reseta hela brädet!
// Vänd alla kort tillbaka och gör ett nytt random bräde
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    //Inget går att klicka på förens återställningen är gjord
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize på nytt
        setTimeout(() => {
        //Gör så att de klickade korten går att klicka på på nytt efter omtstart
            cards[index].style.pointerEvents = "all";
            //Ge alla kort en ny bild
            faces[index].src = item.imgSrc;
            // Uppdatera namnet på objekten också
            cards[index].setAttribute('name', item.name);
            // Återställningen är gjord, nu kan vi klicka på grejer igen
            section.style.pointerEvents = "all";
        }, 1000) // Fördröj lite så att korten hinner vända tillbaka innan de byts
    });
    
    setTimeout(() => window.alert(text), 1000);

};



//Kör igen! Samma villkor allting
cardGenerator();