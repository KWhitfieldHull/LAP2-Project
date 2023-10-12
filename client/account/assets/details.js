const userToken = localStorage.getItem("token");

const email = document.querySelector('#userName');
const address = document.querySelector('#userAddress');
const points = document.querySelector('#userPoints');
const status = document.querySelector('#userStatus');

const emailChange = document.querySelector('#changeUsername');
const addressChange = document.querySelector('#changeAddress');


let userID;
let emailPlaceholder;
let addressPlaceholder;
async function loadUserDetails () {
    
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
        userID = result.user.user_id;
        emailChange.value = result.user.username;
        addressChange.value = result.user.address;
        email.textContent = result.user.username;
        if(result.user.address)
        address.textContent = result.user.address;
        points.textContent = result.user.points;
        if (result.user.admin) {
            status.textContent = "Admin";
        } else {
            status.textContent = "User"
        }
        
    }
}

loadUserDetails();




///////



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("editDetailsButton").addEventListener("click", async (e) => {
        e.preventDefault();
        const email = document.querySelector('#changeUsername');
        const password = document.querySelector('#changePassword');
        const password2 = document.querySelector('#changePassword2');
        const address = document.querySelector('#changeAddress');

        if(password.value != password2.value) {
            alert("Passwords do not match!")
        } else {

            console.log(email.value, password.value, password2.value, address.value);
            

            const options = {
                method: "PATCH",
                body: JSON.stringify({
                username: email.value,
                password: password.value,
                address: address.value
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                }
            }
            const response = await fetch(`http://localhost:3000/users/${userID}`, options);
            const result = await response.json();
            window.location.reload();
            
            
        }






    })

    });