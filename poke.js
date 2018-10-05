
var monNumbers = [52,79,25]; //numbers of the pokemons I'll be using
var pokePic = document.getElementById("pokePic"); //picture of Pokemon
var pokeName = document.getElementById("pokeName"); //name of Pokemom


class Pokemon{  
	constructor(apiPoke){ //passes in the the pokemon info object from the API
		this.name = apiPoke.name;
		this.img = apiPoke.sprites.front_default;
		this.hp = apiPoke.stats[5].base_stat;
		this.attack = apiPoke.stats[4].base_stat;
		this.defense = apiPoke.stats[3].base_stat;
		this.rawAbilities= apiPoke.abilities; //stores abilities taken directly from API, has a bunch of unneeded data
		this.abilities = this.createAbilites(this.rawAbilities);
	}
	
	createAbilites(){
		var cleanedArray = []; //will hold the ability variable without all the extra junk data
		console.log("outside loop");
		for(let i=0;i<this.rawAbilities.length;i++){
			console.log("inside loop. i count: "+i);
			cleanedArray.push(this.rawAbilities[i].ability.name);
		}
		return cleanedArray;
	}
}



window.addEventListener("load",function(){
	$.ajax({url:"https://fizal.me/pokeapi/api/25.json",
		success: function(response){
			testFunction(response);
			var testObj = new Pokemon(response);
			console.log("I'm the Test");
			console.log(testObj);
		}
	})
})

function testFunction(x){
	console.log(x);
	pokeName.innerHTML=x.name;
		// backgroundSize: 100% 100%;
	pokePic.style.backgroundImage="url("+x.sprites.front_default+")"
	console.log(x.abilities);
	console.log(x.abilities.length-1);
	console.log(x.abilities[1].ability.name);
}