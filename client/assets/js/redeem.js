const userToken = localStorage.getItem("token");


const username = document.getElementById('username')
const points = document.getElementById('usernamePoints');
const points10 = document.getElementById('usernamePoints10');
const points25 = document.getElementById('usernamePoints25');
const points35 = document.getElementById('usernamePoints35');
const obtain10 = document.getElementById('obtainPoints10');
const obtain25 = document.getElementById('obtainPoints25');
const obtain35 = document.getElementById('obtainPoints35');
const emailChange = document.querySelector('#changeUsername');
const addressChange = document.querySelector('#changeAddress');


let userID;
async function loadUserDetails() {

  const form = {
    token: userToken
  };

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }
  const response = await fetch("http://localhost:3000/users/token", options);
  const result = await response.json();

  if (response.status == 201) {
    console.log(result)
    userID = result.user.user_id;
    username.textContent = result.user.username;
    points.textContent = result.user.points;
    points10.textContent = result.user.points;
    points25.textContent = result.user.points;
    points35.textContent = result.user.points;
    obtain10.innerHTML = Math.round(parseInt(result.user.points) / 350)
    obtain25.innerHTML = Math.round(parseInt(result.user.points) / 350)
    obtain35.innerHTML = Math.round(parseInt(result.user.points) / 350)
  }
}

loadUserDetails();


