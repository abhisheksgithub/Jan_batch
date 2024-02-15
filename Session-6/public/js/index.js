(function() {
    fetch('/api/v1/pokemon').then(res => res.json())
    .then(data => {
        let div = document.createElement('div')
        let ul = document.createElement('ul')
        data.forEach(element => {
            const liTag = document.createElement('li')
            liTag.innerHTML = element.pokemon
            ul.appendChild(liTag)
        });
        div.appendChild(ul)
        document.body.appendChild(div)
    })
})()