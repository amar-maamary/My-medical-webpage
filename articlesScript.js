/////////////////////////////////   Preloader   /////////////////////////////////
let slideBox = document.querySelector('.slide-box');
let solid = document.querySelector('.solid');

let width = 100;

let slide = setInterval(() => {
    solid.style.width = `${width}%`;
    width -= 1;
}, 20)

setTimeout(() => {
    clearInterval(slide);
    solid.style.width = `100%`;
}, 2050);

setInterval(() => {

    width = 100;
    let slide = setInterval(() => {
        solid.style.width = `${width}%`;
        width -= 1;
    }, 20)

    setTimeout(() => {
        clearInterval(slide);
    }, 2050);

}, 2050);

let preloader = document.querySelector(".loader-container");
let elements = document.querySelector(".main");
window.addEventListener("load", function loading(){
    preloader.style.display = "none";
    elements.style.display = "block";
});

///////////////////////////////// ------  Article Page  ------ /////////////////////////////////
/////////////////////////////////   Articles    /////////////////////////////////

//Getting the div where to display articles in htm
let articlesDiv = document.getElementById("articles-div");

//Creating an articles object to store the fetch data and displaying them functions
let articles ={
    //fetching data from url (passed as an argument depending on what button is clicked)
    fetchArticles : function(url){
        var req = new Request(url);
        fetch(req)
        .then(response => response.json())
        .then( data => {
        console.log(data);
        this.displayArticles(data);
        })
    },

    //Displaying data in html function
    displayArticles: function(data){
        //accessing the articles object
        data = data.articles;
        
        //looping over all articles 
        data.forEach(articleData => {

            //creating a div to contain all the Articles
            var card = document.createElement("div");
            card.classList.add("card");

            //getting the image
            var cardImg = document.createElement("img");
            cardImg.src = articleData.urlToImage;
            cardImg.classList.add("card-img-top");

            //creating a div (card-body) to contain all text inside this card
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            //getting the article title
            var cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            title =  articleData.title.split("-");
            cardTitle.innerText = title[0] + ".";

            //getting article description
            var cardDescription = document.createElement("p");
            cardDescription.classList.add("card-text");
            cardDescription.innerText = articleData.description;

            //getting article's author, source and publish date
            var cardFooter = document.createElement("p");
            cardFooter.classList.add("card-text");
            cardFooter.classList.add("text-muted");
            publishDate =  articleData.publishedAt.split("T");
            cardFooter.innerText = "Source: " + articleData.source.name + " ~ Author: " + articleData.author + " -  " + publishDate[0];
           
            //appending content to the card body
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardFooter);

            //appending image and body to the whole card
            card.appendChild(cardImg);
            card.appendChild(cardBody);

            //appending the card the articles div in html
            articlesDiv.appendChild(card);

            console.log(articlesDiv);
        });
    }
}

//Default search (top news)
// articles.fetchArticles('https://newsapi.org/v2/top-headlines?' +
// 'country=us&category=health&q=medical&science&' +
// 'apiKey=cf47e25f0cec4ec4857160d98754e556');

//Getting search buttons 
let brNewsBtn = document.querySelectorAll(".br-news-btn"); // nodelist 
let mdNewsBtn = document.querySelectorAll(".md-news-btn");
let otherNewsBtn = document.querySelectorAll(".other-news-btn");


//Breaking news buttons 
//looping over each brnews button (nodelist)
brNewsBtn.forEach(btn =>{
    //add event listener
    btn.addEventListener("click", (e)=>{
        brNewsBtn.forEach(brbt =>{
            brbt.classList.add("active");
        });
        //clear previous search result
        articlesDiv.innerHTML = '';
        //create a var for the proper url
        var url = 'https://newsapi.org/v2/top-headlines?' +
      'country=us&category=health&q=medical&' +
      'apiKey=cf47e25f0cec4ec4857160d98754e556';
        //calling functio form articles object
        articles.fetchArticles(url);
        otherNewsBtn.forEach(otherBt =>{
            otherBt.classList.remove("active");
        })
        mdNewsBtn.forEach(mdbt =>{
            mdbt.classList.remove("active");
        })
    });
})

//Medical news buttons
//looping over each mdnews button (nodelist)
mdNewsBtn.forEach(btn =>{
    //add event listener
    btn.addEventListener("click", ()=>{
        mdNewsBtn.forEach(mdbt =>{
            mdbt.classList.add("active");
        });
        //clear previous search result
        articlesDiv.innerHTML = '';
        //create a var for the proper url
        var url = 'https://newsapi.org/v2/everything?' +
        'q=medical&science&health&' +
        'sortBy=popularity&' +
        'language=en&' + 
        'apiKey=cf47e25f0cec4ec4857160d98754e556';
        //calling functio form articles object
        articles.fetchArticles(url);
        otherNewsBtn.forEach(otherBt =>{
            otherBt.classList.remove("active");
        })
        brNewsBtn.forEach(brBt =>{
            brBt.classList.remove("active");
        })
    });
})

//Other news buttons
//looping over each othernews button (nodelist)
otherNewsBtn.forEach(btn =>{
    //add event listener
    btn.addEventListener("click", ()=>{
        otherNewsBtn.forEach(otherbt =>{
            otherbt.classList.add("active");
        });
        //clear previous search result
        articlesDiv.innerHTML = '';
        //create a var for the proper url
        var url = 'https://newsapi.org/v2/everything?' +
        'language=en&' + 
        'sortBy=popularity&' +
        'apiKey=cf47e25f0cec4ec4857160d98754e556';
        //calling functio form articles object
        articles.fetchArticles(url);
        mdNewsBtn.forEach(mdBt =>{
            mdBt.classList.remove("active");
        })
        brNewsBtn.forEach(brBt =>{
            brBt.classList.remove("active");
        })
    });
})

