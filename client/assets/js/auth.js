const logInButtons = document.getElementById('logInButtons');
const accountButton = document.getElementById('accountButton');

if (localStorage.getItem('token') == null) {
  window.location.href = './login.html'
}
if (localStorage.getItem('token') != null) {
  console.log('hi')
  accountButton.href = "./account.html"
  const logOut = document.createElement('a')
  logOut.href = '#'
  logOut.id = 'log-out'
  logOut.style.textDecoration = 'none'
  logOut.classList.add('ms-2')
  logOut.textContent = 'Log Out'
  logInButtons.appendChild(logOut)
}
document.addEventListener('click', (event) => {
  if (event.target.matches("#log-out")) {
    console.log('hi')
    localStorage.removeItem("token")
    window.location.href = './login.html'
  }
})
