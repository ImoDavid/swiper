const slides = document.querySelectorAll(".slidee");
const nextslide = document.querySelector(".buttn-next");
const prevslide = document.querySelector(".buttn-prev");
const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close');
const navLinks = document.getElementById('navlinks');
const menuButtons = document.getElementById('menu-buttons');
const menuItems = document.querySelector(".menu-container");
const menuItem = document.querySelector(".menu-item");
let query = 'pizza'; 

hamburger.addEventListener('click', show);

close.addEventListener('click', show);


function show(){
    navLinks.classList.toggle('show');
}

var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// slides.forEach((slidee,index)=>{
//     slidee.style.transform = `translateX(${index * 100}%)`;
// });

// //current slide counter
// let curSlide = 0;
// let maxSlide = slides.length -1;

//adding navigation function to buttons on slider

// nextslide.addEventListener("click", function(){

//     //check if cur slide is the last and reset cur slide
//     if (curSlide === maxSlide){
//         curSlide = 0;
//     } else {
//         curSlide++;
//     }

//     //move slide 
//     slides.forEach((slidee,index)=>{
//         slidee.style.transform = `translateX(${100 * (index - curSlide)}%)`;
//     });
// });

// prevslide.addEventListener("click", function(){

//     //check if cur slide is the last and reset cur slide
//     if (curSlide === 0){
//         curSlide = maxSlide;
//     } else {
//         curSlide--;
//     }

//     //move slide 
//     slides.forEach((slidee,index)=>{
//         slidee.style.transform = `translateX(${100 * (index - curSlide)}%)`;
//     });
// });

// var elem = document.querySelector('.slider');
// var flkty = new Flickity( elem, {
//   // options
//   cellAlign: 'left',
//   contain: true
// });

class render{
    constructor(query){
        this.query = query;
    }
    async getSelection(){
        try{
            const endPoint = new URL(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
            const res= await fetch(endPoint);
            const result = await res.json();
            this.result = result; 
        
           // console.log(this.result);
            }catch(error){
                alert(error);
            }
        }
    }


const renderRecipe = recipes =>{
    //console.log(recipes)    
    console.log(state.render.result.recipes.length)
    const markup = `
    <div class="menu-item">
    <figure class="menu-fig">
      <img class="menu-img" src="${recipes.image_url}" alt="Tomato" class="menu__img">
    </figure>
    <div class="menu-data">
      <h4 class="menu-name">${recipes.title}</h4>
      <p class="menu-price">$${Math.round(recipes.recipe_id/300)}.00</p>
    </div>
  </div>`
  menuItems.insertAdjacentHTML('beforeend', markup)

};
const clearField = () => {
        menuItems.innerHTML='';
        //elements.searchResPages.innerHTML='';
};


const renderResults = (recipes,page=2,resPerpage=5) => {
    //render result of current page
     const start=1 //(page -1)* resPerpage; 
    const end = 7 //page * resPerpage;
    
recipes.slice(start,end).forEach(renderRecipe);


//console.log(state.render.result.recipes.length)

};

const state = {};

const renderResult = async ()=>{
     //get query from view
       
    
    if(query){
        //console.log(`i am ${query}`)
        //new render obj and add to state
        state.render = new render(query);
       
        //prepare ui for results
        clearField();

        try{
             //make api call
           await state.render.getSelection();

             //render result on ui
         renderResults(state.render.result.recipes)
        //  console.log(state.render.result.recipes)

         }catch(error){
             alert(`Error getting search result!`);
         }


    }


}


menuButtons.addEventListener('click', function (e) {
  //  getValue();
  
     if (e.target.classList.contains('menu-button')){
     query =  e.target.value;
    
      }  
    
     renderResult();

});
renderResult();

