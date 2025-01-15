function islogged(){
    return document.cookie.split('token=')[1] === '' ? false : true 
}

function getUsername(){
    let username = undefined
    if (document.cookie.split('token=')[1] !== ''){
        username = JSON.parse(atob(document.cookie.split('token=')[1].split('.')[1])).username
    }

    return username
}

function logout(){
    document.cookie = 'token='
    window.location.href = '/login'
}

window.onload = function(){
    let loglink = document.getElementById('login')
    let newlink = document.getElementById('new')
    
    if (islogged() === true){
        loglink.textContent = getUsername()        
        loglink.href = '/settings'

        newlink.textContent = 'Sair'
        newlink.href = 'javascript:logout()'
    }
}