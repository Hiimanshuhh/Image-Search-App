const accessKey = "2DixUzXIkx_wxwHg_yId4Lj2Af4OACRXVzyhw6pDUb0";

const formEl = document.querySelector('form')
const inputEl = document.getElementById('search-id')
const searchResultEl = document.querySelector(".search-results")
const showMoreEl = document.getElementById("show-more-b")

let inputData = "";
let page = 1;

async function searchImages(){
  inputData =  inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if(page === 1){
    searchResultEl.innerHTML=" ";
  }


  const results = data.results;

  results.map((result) =>{
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img")
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html
    imageLink.target = '_blank';
    imageLink.textContent= result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEl.appendChild(imageWrapper);

  });

  page++;


  if(page>1){
    showMoreEl.style.display = 'block';
  }

}



formEl.addEventListener("submit",(event)=>{
  event.preventDefault();
  searchImages();
  page = 1;
})

showMoreEl.addEventListener("click",()=>{
  searchImages();
})

