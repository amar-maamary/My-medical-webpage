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
let articlesDiv = document.querySelector(".band");

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
        data.forEach((articleData, i )=> {

            //creating a div to contain all the Articles
            var card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("card-extra");
            card.classList.add("item-" + eval(i+1));
            // card.classList.add("item-1");

            //getting link to the article
            var link = document.createElement("a");
            link.href = articleData.url;
            link.target = "_blank";

            //getting the image
            var cardImg = document.createElement("div");
            cardImg.src = articleData.urlToImage;
            cardImg.style.backgroundImage = "url(" + articleData.urlToImage +")"
            cardImg.classList.add("thumb");

            //creating a div (card-body) to contain all text inside this card
            var cardBody = document.createElement("article");
            // cardBody.classList.add("card-body");

            //getting the article title
            var cardTitle = document.createElement("h1");
            // cardTitle.classList.add("card-title");
            title =  articleData.title.split("-");
            cardTitle.innerText = title[0] ;

            //getting article description
            var cardDescription = document.createElement("p");
            // cardDescription.classList.add("card-text");
            
            function removeWhitespace(str) {
                return str.split('\n').filter(Boolean).join('');
            }
            description = articleData.description
            description = removeWhitespace(description);
            description = description.slice(0,200);
            cardDescription.innerText = description + "...";

            //getting article's author, source and publish date
            var cardFooter = document.createElement("span");
            // cardFooter.classList.add("card-text");
            // cardFooter.classList.add("text-muted");
            publishDate =  articleData.publishedAt.split("T");
            cardFooter.innerHTML = "Source: " + articleData.source.name + " </br> Author: " + articleData.author + " </br>  " + publishDate[0];
           
            //appending content to the card body
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardFooter);

            //appending image and body to the whole card
            link.appendChild(cardImg);
            link.appendChild(cardBody);

            //appending my link to the card to make it a link as well
            card.appendChild(link);

            //appending the card the articles div in html
            articlesDiv.appendChild(card);

            // console.log(articlesDiv);
        });
    }
}

//Default search (top news)
// articlesDiv.innerHTML=''
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
      'sortBy=popularity&' +
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
        'q=-actors +health +medicine +medical -films -LGBTQ&' +
        'searchIn=description&'+ 
        'language=en&' + 
        'sortBy=popularity&' +
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
        'q=-actors +health +medicine +medical -films -LGBTQ&' +
        'sortBy=popularity&' +
        'language=en&' + 
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

 //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
