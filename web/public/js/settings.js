const username = JSON.parse(atob(document.cookie.split('token=')[1].split('.')[1])).username

window.onload = function(){
  const user = document.getElementById('username')
  const bio = document.getElementById('bio')

  const Http = new XMLHttpRequest();
  
  Http.open("GET", '/api/getdetails/' + username);
  Http.send();
  Http.onreadystatechange = (e) => {
    const data = JSON.parse(Http.responseText)
    user.textContent = username
    bio.textContent = data.bio
  }
}