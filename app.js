let findCharater = async (name) =>{
    let heroList = document.querySelector('.heroList');
    let heroInfo = document.querySelector('.heroInfo')
    heroList.innerHTML = "";
    heroInfo.innerHTML = "";

    //Error handling, checks if the user entered 'original' which returns HTML instead of JSON
    try{
        let res = await fetch(`superheroes.php?query=${name}`)
        // data can be either multiple heroes or one hero
        let data = await res.json()
        // If data has multiple heroes, this create a li tag and appends it with the hero alias to a ul
        if (data.type === "multiple"){
            for(let i = 0; i < data.heroes.length; i++){
                li = document.createElement("li");
                li.appendChild(document.createTextNode(data.heroes[i].alias));
                heroList.appendChild(li)
            }
        // If data has one hero, this displays the hero's name, alias and biography
        }else if(data.type === "single"){
            hero = data.hero
            if(data.found){
                let alias = document.createElement("h3");
                alias.textContent = hero.alias;
                let realName = document.createElement("h4");
                realName.textContent = 'A.K.A ' + hero.name;
                let biography = document.createElement("p");
                biography.textContent = hero.biography;
    
                heroInfo.appendChild(alias);
                heroInfo.appendChild(realName);
                heroInfo.appendChild(biography);
            }
            // If the hero search for is not found, this displays SUPERHERO NOT FOUND
            else{
                let notFound = document.createElement("p");
                notFound.textContent = 'SUPERHERO NOT FOUND';
                notFound.classList.add('not-found');
                heroInfo.appendChild(notFound)
            }
        }
    }catch{
        let notFound = document.createElement("p");
        notFound.textContent = 'SUPERHERO NOT FOUND';
        notFound.classList.add('not-found');
        heroInfo.appendChild(notFound)
    }

    
}

window.addEventListener('load', () => {
    let form = document.querySelector('.form')

    findCharater('')
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        let name = document.querySelector('#name')
        findCharater(name.value)
        
    })
})