window.addEventListener('load', () => {
    searchBtn = document.querySelector('.btn')

    searchBtn.addEventListener('click', () =>{

        fetch("superheroes.php")
        .then((res) => {
            if(res.ok)
                return res.text();
            else
                throw new Error('Something went wrong')
        })
        .then((data) => {
            alert(data)
        })
        .catch((err) => {
            alert(err)
        })
    })
})