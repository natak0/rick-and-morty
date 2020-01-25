
//get data

function getContentx(){
fetch("https://rickandmortyapi.com/api/character")
			.then(status)
            .then(response => console.log(response.json()))
            //.then(json =>{ })
            }

function getContent(){
fetch("https://rickandmortyapi.com/api/character")
			.then(status)
            .then(response => response.json())
            .then(json =>{              
                results=json.results
                for (var item in results){
                    var character = results[item];
                    //create new div and elements
                    var container = document.createElement("div");
                    container.className += " character-grid";

					//add unique attribute to each div
					container.setAttribute("data-item",item);
                    document.getElementById('character-container-grid').appendChild(container);
					var characterLink = document.createElement("a");
					characterLink.className += "character-link";
                    var characterPoster = document.createElement("img");
                    characterPoster.className += "character-poster";
                    //add gray pixel preload holder for the poster
                    characterPoster.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";


                    //add elements to container
					container.appendChild(characterLink);
                    characterLink.appendChild(characterPoster);
                    container.setAttribute("data-name",character.name);
                    container.setAttribute("data-species",character.species);
                    container.setAttribute("data-location",character.location.name);
                    container.setAttribute("data-gender",character.gender);
					
                    //add container to the page
                    document.getElementById('character-container-grid').appendChild(container);
                    //add api data to elements
                   	var newName = document.createTextNode(character.name); 
                    characterPoster.src = character.image;
					characterPoster.setAttribute("alt",newName.nodeValue+" poster");
					//get a value to add to a new URL for details page
					hrefStr = newName.nodeValue;
					//search regEX for spaces or ' special characterin the character name and replace it with "-"
					hrefStr = hrefStr.replace(/\s+|[`'`]/g, '-');
					//change the string to lowercase
					hrefStr = hrefStr.toLowerCase();
					//create URL for clicked element
					characterLink.setAttribute("href", "#" + hrefStr);
					//add click event to the container with a character image
					container.addEventListener('click', showDetails);
                }          
        })
}

//create the detailed information for the selected character
function createDetails(image, name, species, location, gender){
	var details = document.querySelector('.details');
	//clear the content of the details div
	details.innerHTML = "";
	//create the container for detailed information
	var container = document.createElement("div");
	container.className += "character-details";	
	details.appendChild(container);
	var characterPoster = document.createElement("img");
	characterPoster.className += "character-poster";
	characterPoster.src = image;
	var characterName = document.createElement("p");
    characterName.className += "character-name";
	var characterSpecies = document.createElement("p");
	characterSpecies.className += "character-species"; 
	var characterLocation =document.createElement("p"); 
	characterLocation.className += "character-location"; 
	var characterGender = document.createElement("p");
	characterGender.className += "character-gender";
	//add DOM to the container
	container.appendChild(characterPoster);
	container.appendChild(characterName);
	container.appendChild(characterSpecies);
    container.appendChild(characterLocation);
    container.appendChild(characterGender);

    var newName = document.createTextNode("Name: "+name); 
    characterName.appendChild(newName);
	var newSpecies = document.createTextNode("Species: "+species);
    characterSpecies.appendChild(newSpecies);
    var newLocation = document.createTextNode("Location: "+location);
    characterLocation.appendChild(newLocation);
    var newGender = document.createTextNode("Gender: "+gender);
    characterGender.appendChild(newGender);

}
function showDetails(e){
	//get attribute information from the clicked div 
	var image = e.target.src;
	var name = e.currentTarget.getAttribute('data-name');
	var species = e.currentTarget.getAttribute('data-species');
	var location = e.currentTarget.getAttribute('data-location');
	var gender = e.currentTarget.getAttribute('data-gender');
	//pass the info to the createDetails function
	createDetails(image, name, species, location, gender);
}


//add event listeners to the menu after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
	getContent();
});




