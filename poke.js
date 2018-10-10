
const monNumbers = [25,79,52]; //the number of the indivual pokemon
// const monNumbers = [52,79,25,23,58,12,55,3,5,9,37,59,81,87,98,97,96,95,94,101,102,103,109,155]; //numbers of the pokemons I'll be using
 // var monNumbers = [];
 // for(let i = 0;i<801;i++){ monNumbers.push(i);}

var pokePic = document.getElementById("pokePic"); //picture of Pokemon
const pokeName = document.getElementById("pokeName"); //name of Pokemom
const back = document.getElementById("back");
const next = document.getElementById("next");
var listOfPokemons = []; //will hold the pokemon objects


class Pokemon{  
	constructor(apiPoke){ //passes in the the pokemon info object from the API
		console.log(apiPoke);
		this.name = apiPoke.name; //name
		this.img = apiPoke.sprites.front_default;  //url for image of pokeman
		this.hp = apiPoke.stats[5].base_stat;  //hit power, whtever that is
		this.attack = apiPoke.stats[4].base_stat;  
		this.defense = apiPoke.stats[3].base_stat;
		this.specialAttack = apiPoke.stats[2].base_stat;
		this.specialDefense = apiPoke.stats[1].base_stat;
		this.speed = apiPoke.stats[0].base_stat;
		this.moves = []
		for(let i = 0;i<5;i++){
			this.moves.push(apiPoke.moves[i].move.name)
		}
		for(let i = 0;i<5;i++){console.log(this.moves[i]);}
		this.rawAbilities= apiPoke.abilities; //stores abilities taken directly from API, has a bunch of unneeded data
		this.abilities = this.cleanAbilites(this.rawAbilities); //abilities in clean form
	}
	
	cleanAbilites(){
		var cleanedArray = []; //will hold the ability variable without all the extra junk data
		for(let i=0;i<this.rawAbilities.length;i++){ //loops through the abilities, they can have 2 or 3
			cleanedArray.push(this.rawAbilities[i].ability.name); //populates array with only the name of the ability
		}
		return cleanedArray; //returns only the ability names in an array
	}
}

class Trainer{ 
	constructor(pokes) {      //called upon loading the window. 
		this.pokes = pokes;     //the array of pokemons created in the window load event listener
		this.current = 0;
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
	loadPoke(){
		console.log("special speed: "+this.pokes[this.current].speed);
		console.log(this.pokes[this.current].abilities);
		pokeName.innerHTML = this.pokes[this.current].name;
		pokePic.src=this.pokes[this.current].img;
		pokePic.alt="Image of "+this.pokes.name;
		console.log(this.pokes[this.current].img);
		$("#hp").html(this.pokes[this.current].hp);
		$("#attack").html(this.pokes[this.current].attack);
		$("#defense").html(this.pokes[this.current].defense);
		this.createAbilities();
		console.log(this.pokes[this.current].name+"'s number is: "+this.current);
	}
	createAbilities(){
		$("#abilities").html("");
		for (let i=0;i<this.pokes[this.current].abilities.length;i++){
			$("#abilities").append("<li>"+this.pokes[this.current].abilities[i]+"</li>");
		}
	}

	nextPoke(){
		if(this.current==this.pokes.length-1){ //checks to see if its at the last pokemon in the array
			this.current=0; //if it is, it cycles back to zero
		}
		else{
			this.current++; //otherwise goes to the next one
		}
		this.loadPoke();
	}
	prevPoke(){
		if(this.current==0){ //checks to see its at the first pokemon, and cycles to the last member of the array if it is of the previous if it isn't
			this.current = this.pokes.length-1;
		}
		else{
			this.current--;
		}
		this.loadPoke();
	}
}

for(let i = 0;i<monNumbers.length;i++){ //loops through all pokemon numbers in the array
	$.ajax({url:"https://fizal.me/pokeapi/api/"+monNumbers[i]+".json", //calls the API
		success: function(response){ //callback for API object data
			let pokeObj = new Pokemon(response); //creates an instance of the Pokemon object
			listOfPokemons.push(pokeObj); //pushes the new instance to the array of Pokemon
		}
	})
}

var nurseSeths = new Trainer(listOfPokemons);

if (nurseSeths[0]==undefined){
	console.log("API still loading");
	window.setTimeout(function(){ //had to set a timeout as a safegaurd because the load function was executing before the listOfPoke array could be populated (maybe with a slower processor and faster internet connection that wouldn't be the case?) 
		nurseSeths = new Trainer(listOfPokemons);
		nurseSeths.loadPoke();
	}, 200+2*monNumbers.length);
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
