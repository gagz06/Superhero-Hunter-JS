let allSuperHeroList = [];
let searchHeroList=[];
const superHeroList = document.getElementById("superHeroList");
let inputbox = document.getElementById("input-box");
let searchResults=document.getElementById("superHeroList");

const searchBox=document.querySelector(".result-box");

const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";

const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
//const ts= new Date().getTime();
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;

const urlParams = new URLSearchParams(window.location.search);
const superheroId = urlParams.get("id");
//var MD5 = require("crypto-js/md5");
//const hashCode=CryptoJS.MD5((ts+privateKey+publicKey).toString());
//console.log(hashCode);

//searchBar.addEventListener("input",()=>{searchHeroes(searchBar.value)});

inputbox.onkeyup=function(){
let result=[];
let input=inputbox.value;
searchHeroList=searchHeroes(input);
if(input.length){
result = searchHeroList.filter((keyword)=>{
return keyword.toLowerCase().includes(input.toLowerCase());
});
console.log(result);
}
};

function displaySearchList(result){
  const content = result.map((list)=>{
    return "<li onclick=seletcInput(this)>"+list+"</li>";
  });
  searchResults.innerHTML="<ul>"+content.join('')+"</ul>";
}



async function searchHeroes(searhedText){
// if(searhedText.length==0){
//   searchResults.innerHTML="";
// }
// await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${textSearched}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`)
// .then(res=>res.json)
// .then(data=>showSearchedResults(data.data.results))
try {
  const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${searhedText}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`)
  const data = await res.json();
  return data.data.results;
} catch (error) {
  console.log(error);
}
};




async function fetchAllSuperHeroList() {
  try {
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await response.json();
    //console.log(data);
    allSuperHeroList = data.data.results;
    console.log(allSuperHeroList);
    renderList();
  } catch (error) {
    console.log(error);
  }
}

async function fetchSuperheroData() {
  try {
    
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const data = await response.json();
    const superhero = data.data.results[0];
    console.log(superhero);
    const img = document.getElementById("potraitImage");
    img.src=`${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    const name = document.getElementById("nameTag");
    const desc = document.getElementById("descTag");
    const comicTag = document.getElementById("comicTag");
    const seriesTag= document.getElementById("seriesTag");
    const storiesTag = document.getElementById("storiesTag")
    const eventsTag = document.getElementById("storiesTag");


    name.textContent=superhero.name;
    desc.textContent=superhero.description;
    comicTag.textContent= "Comics "+ superhero.comics.available;
    seriesTag.textContent = "Series "+superhero.series.available;
    storiesTag.textContent = "Stories " +superhero.stories.available;
  } catch (error) {
    console.log(error);
  }
}

fetchAllSuperHeroList();

function addSuperHeroToDom(allSuperHeroList) {
  const li = document.createElement("li");
  li.className = "listItemTag";
  li.innerHTML = `
        <li>
        <div id="listItemLeftDiv">
        <strong><label for="${allSuperHeroList.id}">${allSuperHeroList.name}</label>
        </strong>
        <br/>    
        <label>${allSuperHeroList.description}</label>
        </div>
        <br/>
        <div id="listItemRightDiv">
        <img src="${allSuperHeroList.thumbnail.path}.jpg" class="superhero" data-id=${allSuperHeroList.id}></img>
        </div>
        </li>
        `;
  li.addEventListener("click", function () {
    // Handle the click event here
    console.log(`Clicked on superhero with ID: ${allSuperHeroList.id}`);
    window.location.href = `superhero.html?id=${allSuperHeroList.id}`;
  });

 


  superHeroList.append(li);
}

function renderList() {
  superHeroList.innerHTML = "";
  for (let i = 0; i < allSuperHeroList.length; i++) {
    addSuperHeroToDom(allSuperHeroList[i]);
  }
}

if(superheroId){
    window.addEventListener("load", fetchSuperheroData);
}

function returnToHome(){
    window.location.href = "homepage.html";
}