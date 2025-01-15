function entropy(str){
    const symbolSet = RegExp("[!|?|,|=|_|*|{|}|@|#|$|%|&|(|)|°|+|;]")
    const length = str.length
    let combinations = 0

    const hasLetter = (/[a-za]/gm.exec(str) === null ? false : true)
    const hasCaptalize = (/[A-ZA]/gm.exec(str) === null ? false : true)
    const hasNumber = (/[0-9]/gm.exec(str) === null ? false : true)
    const hasSymbol = (symbolSet.exec(str) === null ? false : true)

    if (hasLetter){
        combinations += 26
    }
    if (hasCaptalize){
        combinations += 26
    }
    if (hasNumber){
        combinations += 10
    }
    if (hasSymbol){
        combinations += 18
    }

    return Math.log2(combinations**length)
}

window.onload = function(){
    let passwd = document.getElementById('passwd').value
    let confirm = document.getElementById('confirm').value
    let err_client = document.getElementById('err_client')


    passwd.oninput = function(){
        let pentropy = entropy(passwd)
        if (pentropy <= 36){
            err_client.textContent = 'Senha muito fraca'
        }
        if(pentropy > 36 && pentropy < 45){
            err_client.textContent = 'Senha fraca'
        }
        if(pentropy > 45){
            err_client.textContent = ''
        }
    }

    document.getElementById('form').onsubmit = function(e){
        if (passwd !== confirm){
            err_client.textContent = "As senhas não são iguais!"
            e.preventDefault()
            
            return
        }
    }
}