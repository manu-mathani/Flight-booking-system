function openNav() {
  document.getElementById("mySidebar").style.width = "50%";
  document.getElementById("hamburger").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function displayField(field) {
  // Get all elements with class "active-field"
  var activeFields = document.querySelectorAll(".active-field");
  
  // Remove "active-field" class from all elements that have it
  activeFields.forEach(function(element) {
    element.classList.remove("active-field");
  });
  
  // Add "active-field" class to elements with the class same as the argument passed to the function
  var elementsWithFieldClass = document.querySelectorAll("." + field);
  elementsWithFieldClass.forEach(function(element) {
    element.classList.add("active-field");
  });
}



//Swiper function
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  centerSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//active background color to red
$(document).ready(function () {
 
  $('ul.navbar-nav > li')
          .click(function (e) {
      $('ul.navbar-nav > li')
          .removeClass('active');
      $(this).addClass('active');
  });
});

$("#add_user").submit(function(event){
  alert("Flight added successfully")})
//Event listener to filter our query parameters that are empy
function filterEmptyFields(event) {
  const form = event.target;
  const elements = form.elements;
  const elementsToRemove = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // Check if the element is an input field and if it has no value
    if (element.tagName === 'INPUT' && element.value.trim() === '') {
      elementsToRemove.push(element);
    }
  }

  // Remove elements without values from the form
  elementsToRemove.forEach((element) => {
    element.remove();
  });
}


