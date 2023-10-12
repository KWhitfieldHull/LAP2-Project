const userToken = localStorage.getItem("token");


const username = document.getElementById('username')
const points = document.getElementById('points');

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

  }
}

loadUserDetails();


