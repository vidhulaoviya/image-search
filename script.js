const access_key = "J1vvZFtVzlH0gRcTYt6X3Tsb8rcJWGPUJVm6hg5BpOI";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchRes = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");


let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`;

    const response = await fetch(url);
    const data = await response.json();


    const results = data.results;

    if(page === 1) {
        searchRes.innerHTML = "";
    }

    results.forEach((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description; 
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchRes.appendChild(imageWrapper);


    });

    page++;
    if(page > 1) {
        //show more button
        showmore.style.display = "block";
    } else {
        showmore.style.display = "none";
    }
}

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();

});

showmore.addEventListener("click", () =>{
    page++;
    searchImages();

});