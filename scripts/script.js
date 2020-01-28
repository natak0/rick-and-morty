var rickAndMorty = {
apiURL:"https://rickandmortyapi.com/api/character/?page=1",
next:"",
previous:"",
current:"",
//regular expression to get the number of the current page from the api address
regex: /[0-9]+/g,
//get the api data
getContent: function(url){
			fetch(url)
			.then(status)
            .then(response => response.json())
            .then(json =>{  
            	//get the links for the next and prev pages
            	info = json.info;
            	var hrefPrev = info.prev;
            	var hrefNext = info.next;
            	this.next=hrefNext;
            	this.previous=hrefPrev;
            	
            	//the number of the current page
            	this.current = url.match(this.regex);
            	document.querySelector('.current-page').innerHTML = this.current;
            	//get the data for the characters  
                results=json.results
                for (var item in results){
                    var character = results[item];
                    //create new div and elements
                    var container = document.createElement("div");
                    container.className += "character-grid";
					//add unique attribute to each div
					container.setAttribute("data-item",item);
                    document.getElementById('character-container-grid').appendChild(container);
					var characterLink = document.createElement("a");
					characterLink.className += "character-link";
                    var characterPoster = document.createElement("img");
                    characterPoster.className += "character-poster";
	                //add elements to container
					container.appendChild(characterLink);
                    characterLink.appendChild(characterPoster);
                    container.setAttribute("data-name",character.name);
                    container.setAttribute("data-species",character.species);
                    container.setAttribute("data-location",character.location.name);
                    container.setAttribute("data-gender",character.gender);
                    //add container to the page
                    document.getElementById('character-container-grid').appendChild(container);
                    //add api data to the image element
                    characterPoster.src = character.image;
					//add click event to the container with a character image
					container.addEventListener('click', this.getDetails);
                }          
        })
        //count the character genders after the json response
        .then((responseJson) => this.genderCount());
},
//count the genders in the list and pass the values to build the chart
genderCount: function(){
	//get NodeList
	var list = document.querySelectorAll('.character-grid');
	//counters
	var maleNumber = 0;
	var femaleNumber = 0;
	var unknownNumber = 0;
	for (i=0;i<list.length;i++){
		var item = list[i].dataset.gender;
		if (item === "Male"){
			maleNumber = maleNumber +1;
		}
		else if (item === "Female"){
			femaleNumber = femaleNumber +1;	
		}
		else if (item === "unknown"){
			unknownNumber = unknownNumber +1;	
		}
	}
	this.createGraph(maleNumber, femaleNumber, unknownNumber);
},

//create the chart from chart.js library
createGraph:function(male, female, unknown) {
	var ctx = document.getElementById('graph').getContext('2d');
	var chart = new Chart(ctx, {
    type: 'bar',
    //dataset
    data: {
        labels: ['Male', 'Female', 'Unknown'],
        datasets: [{
            label: 'Gender Character Count',
            backgroundColor: '#24292e',
            data: [ male, female, unknown]
        }]
    },})
},
getDetails: function(e){
	//get the attribute information from the clicked div 
	var image = e.target.src;
	var name = e.currentTarget.getAttribute('data-name');
	var species = e.currentTarget.getAttribute('data-species');
	var location = e.currentTarget.getAttribute('data-location');
	var gender = e.currentTarget.getAttribute('data-gender');
	//pass the data info to the createDetails function
	rickAndMorty.createDetails(image, name, species, location, gender);
},
//create the detailed information for the selected character
createDetails: function(image, name, species, location, gender){
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
    //add the text descriptions
    var newName = document.createTextNode("Name: "+name); 
    characterName.appendChild(newName);
	var newSpecies = document.createTextNode("Species: "+species);
    characterSpecies.appendChild(newSpecies);
    var newLocation = document.createTextNode("Location: "+location);
    characterLocation.appendChild(newLocation);
    var newGender = document.createTextNode("Gender: "+gender);
    characterGender.appendChild(newGender);
},
//add click events to prev and next buttons
addPrevNextPage: function(){
	const buttonPrev = document.querySelector('.prev-page');
	const buttonNext = document.querySelector('.next-page');
	buttonPrev.addEventListener('click', event => {
		//check if the previous link is not empty
		if (rickAndMorty.previous){
			this.clearGrid();
			this.getContent(rickAndMorty.previous)
		}
		else {
			rickAndMorty.previous = this.apiURL}
		});
	buttonNext.addEventListener('click', event => {
		//check if the next link is not empty
		if (rickAndMorty.next){
			this.clearGrid();
			this.getContent(rickAndMorty.next)
			}
		else {
			rickAndMorty.next = this.apiURL}
		});	
},
//clear the DOM in the character container grid and the clicked character details div
clearGrid: function(){
	document.getElementById('character-container-grid').innerHTML = "";
	document.querySelector('.details').innerHTML = "";
},
}
//add event listeners to the menu after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
	rickAndMorty.getContent(rickAndMorty.apiURL);
	rickAndMorty.addPrevNextPage();
});
