function menuIsOpen() {
    const menu = document.querySelector('.menu')
    const menuIcon = document.querySelector('.menu__icon')
    if(!menu.classList.contains('is__open')) {
        menuIcon.classList.add('icon__close')
        menu.classList.add('is__open')
    } else {
        menuIcon.classList.remove('icon__close')
        menu.classList.remove('is__open')
    }
}
//fetch data from api
const url = 'https://api.github.com/users/grynhas'
const getData = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(`data`, data)
        return data

    } catch (error) {
        console.log(error)
    }
}

const replaceData = async (url) => {
    const body = document.querySelector('body')
    body.classList.add('loading')
    try {
        const data = await getData(url)
        console.log(`replcace`, data)
        const name = document.querySelector('.name') ?? ''
        const username = document.querySelector('.username') ?? ''
        const avatar = document.querySelector('.avatar') ?? ''
        const bio = document.querySelector('.bio') ?? ''
        const location = document.querySelector('.location') ?? ''
        const email = document.querySelector('.email') ?? ''

        name.innerHTML = data.name
        username.innerHTML = data.login
        avatar.src = data.avatar_url
        // bio.innerHTML = data.bio
        location.innerHTML = data.location
        email.innerHTML = data.email
    } catch (error) {
        console.log(error)
    }
    finally {
        body.classList.remove('loading')
    }
}

const getRepos = async (url) => {
    try {
        const response = await fetch(`${url}/repos`)
        const data = await response.json()
        console.log(`repos`, data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const replaceRepos = async (url) => {
    const repos = await getRepos(url)
    const language = repos.map((repo) => {
        return repo.language
    })
    const conterLanguage = language.reduce((acc, cur) => {
        cur === null ? cur = 'other' : cur
        if (acc[cur]) {
            acc[cur]++
        } else {
            acc[cur] = 1
        }
        return acc
    }
    , [])
// reorganiza o objeto para ficar em ordem decrescente
    const sortLanguage = Object.entries(conterLanguage).sort((a, b) => b[1] - a[1])

    const grafic = document.querySelector('.repos__list')
    sortLanguage.map((lang) => {
        grafic.innerHTML += 
        `<span>${lang[0]}</span>
        <div class="progress__bar" >
            <div class="progress__bar__percent" style="width: ${lang[1]}0%;">
            </div>
        </div> 
        `
    })

}




//chama as funções
replaceData(url)
replaceRepos(url)


