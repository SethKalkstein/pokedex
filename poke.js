
var monNumbers = [52,79,25,23,58,12]; //numbers of the pokemons I'll be using
var pokePic = document.getElementById("pokePic"); //picture of Pokemon
var pokeName = document.getElementById("pokeName"); //name of Pokemom


class Pokemon{  
	constructor(apiPoke){ //passes in the the pokemon info object from the API
		this.name = apiPoke.name; //name
		this.img = apiPoke.sprites.front_default;  //url for image of pokeman
		this.hp = apiPoke.stats[5].base_stat;  //hit power, whtever that is
		this.attack = apiPoke.stats[4].base_stat;  
		this.defense = apiPoke.stats[3].base_stat;
		this.rawAbilities= apiPoke.abilities; //stores abilities taken directly from API, has a bunch of unneeded data
		this.abilities = this.createAbilites(this.rawAbilities); //abilities in clean form
	}
	
	createAbilites(){
		var cleanedArray = []; //will hold the ability variable without all the extra junk data
		for(let i=0;i<this.rawAbilities.length;i++){ //loops through the abilities, they can have 2 or 3
			cleanedArray.push(this.rawAbilities[i].ability.name); //populates array with only the name of the ability
		}
		return cleanedArray; //returns only the ability names in an array
	}
}

var listOfPokemons = []; //will hold the pokemon objects
window.addEventListener("load",function(){ //executes on window loading
	for(let i = 0;i<monNumbers.length;i++){ //loops through all pokemon numbers in the array
		$.ajax({url:"https://fizal.me/pokeapi/api/"+monNumbers[i]+".json", //calls the API
			success: function(response){ //callback for API object data
				let pokeObj = new Pokemon(response); //creates an instance of the Pokemon object
				listOfPokemons.push(pokeObj); //pushes the new instance to the array of Pokemon
			}
		})
	}
})

class Trainer{ 
	constructor(pokes) {//called upon loading the window. 
		this.pokes = pokes; //the array of pokemons created in the window load event listener
		this.currentPoke = this.pokes[0];
	}
	all(){
		return this.pokes;
	}
	name(nameMatch){
		for(let i=0;i<this.pokes.length;i++){
			if(this.pokes[i].name==nameMatch){
				return this.pokes[i];
			}
		}
		console.log("specified pokemon does not belong to this trainer.")
	}
	changePoke(){
		
	}
}


console.log(listOfPokemons);

// window.addEventListener("load",function(){
// 	$.ajax({url:"https://fizal.me/pokeapi/api/25.json",
// 		success: function(response){
// 			testFunction(response);
// 			var testObj = new Pokemon(response);
// 			console.log("I'm the Test");
// 			console.log(testObj);
// 		}
// 	})
// })

function testFunction(x){
	console.log(x);
	pokeName.innerHTML=x.name;
		// backgroundSize: 100% 100%;
	pokePic.style.backgroundImage="url("+x.sprites.front_default+")"
	console.log(x.abilities);
	console.log(x.abilities.length-1);
	console.log(x.abilities[1].ability.name);
}