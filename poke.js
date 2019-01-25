//in case I decide to catch all 801 Pokemen
//var monNumbers = [];
//for(let i = 0;i<801;i++){
//	monNumbers.push(i);
//}

//numbers of the pokemons I'll be using. Numbers according to Poke API
const monNumbers = [52,79,25,23,58,12,55,3,5,9,37,59,81,87,98,97,96,95,94,101,102,103,109,155];
//picture of Pokemon
var pokePic = document.getElementById("pokePic"); 
//name of Pokemom
const pokeName = document.getElementById("pokeName");
const back = document.getElementById("back");
const next = document.getElementById("next");
 //will hold the pokemon objects
var listOfPokemons = [];

//represents an individual Pokeman
class Pokemon{  
	//passes in the the pokemon info object from the API
	constructor(apiPoke){ 
		this.name = apiPoke.name; 
		 //url for image of pokeman
		this.img = apiPoke.sprites.front_default;
		 //hit power, whatever that is 
		this.hp = apiPoke.stats[5].base_stat; 
		this.attack = apiPoke.stats[4].base_stat;  
		this.defense = apiPoke.stats[3].base_stat; 
		//stores abilities taken directly from API, has a bunch of unneeded data
		this.rawAbilities= apiPoke.abilities; 
		 //cleans all the unneeded data from the abilities json object
		this.abilities = this.cleanAbilites(this.rawAbilities);
	}
	
	cleanAbilites(){
		 //will hold the ability variable without all the extra junk data
		var cleanedArray = [];
		 //loops through the abilities, they can have 2 to 3
		for(let i=0;i<this.rawAbilities.length;i++){
			//populates array with only the name of the ability
			cleanedArray.push(this.rawAbilities[i].ability.name);
		}
		//returns only the ability names in an array
		return cleanedArray; 
	}
}
//Trainer will hold a bunch of Pokemon objects
class Trainer{ 
	//called upon loading the window.
	constructor(pokes) {
		//pokes is the array of pokemons created in the window load event listener       
		this.pokes = pokes;  
		//this.current represents the position in the array of pokemons above. the default is the first memeber of the the array   
		this.current = 0;
	}
	//lists all pokemen. not used but assignment asks for it, so it is here
	all(){
		return this.pokes;
	}
	//can match a pokemon by name. feature not used but assignment asks for it. worked perfect when testing
	name(nameMatch){
		//loops through all the pokemon objects to match name
		for(let i=0; i<this.pokes.length; i++) { 
			if(this.pokes[i].name == nameMatch){
				//returns name and exists function
				return this.pokes[i];
			}	
		}
		//testing leftover. if function called and not exited during loop then this console.log will execute
		console.log("specified pokemon does not belong to this trainer.")
	}
	//loads attributes of a poke (Pokemon) object according to its position in thje array (this.current)
	loadPoke(){
		//testing
		//console.log(this.pokes[this.current].abilities);

		pokeName.innerHTML = this.pokes[this.current].name;
		pokePic.src=this.pokes[this.current].img;
		pokePic.alt="Image of "+this.pokes.name;
		//console.log(this.pokes[this.current].img);
		$("#hp").html(this.pokes[this.current].hp);
		$("#attack").html(this.pokes[this.current].attack);
		$("#defense").html(this.pokes[this.current].defense);
		//the number of abilities varries in number so I put it in its own function 
		this.createAbilities();
	}

	createAbilities(){
		//clear out old abilities
		$("#abilities").html("");
		//each ability becomes its own list item
		for (let i = 0; i < this.pokes[this.current].abilities.length; i++) {
			$("#abilities").append("<li>" + this.pokes[this.current].abilities[i] + "</li>");
		}
	}
	//scrolls to the next Pokemon in the list
	nextPoke(){
		//first checks to see if its at the last pokemon in the array
		if(this.current == this.pokes.length - 1){ 
			//if it is, the variable representing the position of the pokemon in the array cycles back to zero
			this.current = 0; 
		}
		else{
			//if it's not the last position in the array it simply goes to the next one
			this.current++; 
		}
		//then calls the function to load those attributes
		this.loadPoke();
	}
	//scrolls to the previous Pokemon in the list
	prevPoke(){
		//checks to see variable representing the pokemon's position is at the first pokemon in the array
		if(this.current == 0){ 
			//cycles to the last position in the array if it is currently in the first position
			this.current = this.pokes.length-1;
		}
		else{
			//otherwise go to the previous array postion
			this.current--;
		}
		//call function to load attributes for that pokemon
		this.loadPoke();
	}
}

//loops through all desired pokemon numbers in the array that were set above
for(let i = 0;i<monNumbers.length;i++){ 
	//calls the API
	$.ajax({url:"https://fizal.me/pokeapi/api/"+monNumbers[i]+".json", 
		//callback for API object data
		success: function(response){ 
			//creates an instance of the Pokemon object each time the loop is executed
			let pokeObj = new Pokemon(response);
			//pushes the new Pokemon instance to the array of Pokemon objects
			listOfPokemons.push(pokeObj); 
		}
	})
}
//sets a new instance of a trainer object
var nurseSeths = new Trainer(listOfPokemons);
//the following code compensates for the time it takes to load the API from the internet ()
//the first memebt 
if (nurseSeths.pokes[0] == undefined){
	console.log("API still loading");
	window.setTimeout(function(){ //had to set a timeout as a safegaurd because the load function was executing before the listOfPoke array could be populated (maybe with a slower processor and faster internet connection that wouldn't be the case?) 
		nurseSeths = new Trainer(listOfPokemons);
		nurseSeths.loadPoke();
		console.log(nurseSeths.pokes[0]);
	}, 150+20*monNumbers.length);
}
else{
	nurseSeths.loadPoke();
}

next.addEventListener("click",function(){  //calls Trainer object's method to find the next pokemon
	nurseSeths.nextPoke();
});


back.addEventListener("click",function(){  //calls Trainer object's method to find the previous pokemon
nurseSeths.prevPoke();
});
