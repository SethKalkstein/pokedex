
var monNumbers = [52,79,25]; //numbers of the pokemons I'll be using
var pokePic = document.getElementById("pokePic");
var pokeName = document.getElementById("pokeName");


// class Pokemon

window.addEventListener("load",function(){

	$.ajax({url:"https://fizal.me/pokeapi/api/52.json",
		success: function(response){
			testFunction(response);
		}
	})
})

function testFunction(x){
	console.log(x);
	pokeName.innerHTML=x.name;
		// backgroundSize: 100% 100%;
	pokePic.style.backgroundImage="url("+x.sprites.front_default+")"
}