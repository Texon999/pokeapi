const pokemonlist = document.getElementById('pokemon-list') 
// aca lo que haces es que hay una parte vacia del html, donde queremos rellenarlo cuando consumamos la api 
// la parte vacia es una lista desordenada, se busca llenarla con algo, con el dom sacamos ese elemento para meterle cosas 

const pokemons = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'eevee', 'snorlax']; 
// Estos son los pokemons que voy a buscar en el objeto, o sea el json que me manden 

async function obtenerPokemons(pokemon) {  


  //Despues toca encerar esto en un try y catch
    
   
   
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    
    // Ponemos una constante que recibe la respuesta del metodo de fetch, todo el objeto
    const data = await res.json()  
    // con esta constante data agarramos todo ese objeto y lo convertimos en json para leerlo mejor
    const resSpecies = await fetch (data.species.url); 
    // Se hace este mismo paso para la seccion de species, ya no apuntamos de una al endpoint si no que con data 
    // podemos ir a la info que queramos  
    const dataSpecies = await resSpecies.json() 
    // se convierte en json tambien   

    const descriptionEntry = dataSpecies.flavor_text_entries.find(
     entry => entry.language.name === 'es'
    ) ;   
    //Entonces, mandamos una constante que es la informacion entrante de la descripcion 
    // Accedemos a la constante que reicibo el json y buscamos el texto que este en espaniol
     
    const description = descriptionEntry 
    ? descriptionEntry.flavor_text.replace(/\f/g, ' ') 
    : ' Sin descripcion disponible bro' 
    // aqui se hace normalmente depurar la info, si no hay manda el mensaje de abajo  


    const item = document.createElement('li') ; 
    // con el dom creamos una lista 
    const namePokemon = document.createElement('h3') ;  
    // creamos un titlo h3 para poner el nombre del pokemon 
    namePokemon.textContent = data.name.toUpperCase();  
    // para Poner todo mayuscula  

    const imgPokemon = document.createElement('img') ; 
    imgPokemon.src = data.sprites.other['official-artwork'].front_default;
    // bueno aqui que pasa, la propieda img debe tener el src que es de donde 
    //sacamos el archivo, hacemos una igualdad  
    // y sacamos la info con data accedemos a esa info del json y nos la llevamos
    imgPokemon.alt = data.name ;    
     

    const typePokemon = document.createElement('p') ; 
    
    
    const types = data.types.map (t=> t.type.name).join(', ') ;  

    typePokemon.innerHTML =`<strong> Tipo de Pokemon : </strong> ${types} ` 
    

    const descPokemon = document.createElement('p') ; 
    descPokemon.innerText = description ;  
    

    item.append (namePokemon, imgPokemon,typePokemon,descPokemon) ;  
    pokemonlist.appendChild(item)   
}



pokemons.forEach(p => obtenerPokemons(p)) ; 


// id = boton-pokemon

