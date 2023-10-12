const mainBlock = document.getElementById('mainBlock');
const userToken = localStorage.getItem("token");


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
    if (result.user.admin) {
      createAccountPage('Admin Area', 'Manage everything', './manage.html')

    }
    createAccountPage('My Items List', 'Your items list', './items.html')
    createAccountPage('Account details', 'Edit your details', './details.html')
  }

}

loadUserDetails();


const createAccountPage = (heading = "heading", text = "description", link = "#") => {
  const overallBlock = document.createElement('div');
  const manageBlock = document.createElement('div');
  const manageLink = document.createElement('a');
  manageLink.href = link
  overallBlock.classList.add('col')
  manageBlock.classList.add('p-5', 'my-4', 'border', 'd-flex', 'justify-content-center', 'flex-column', 'align-items-center', 'accountCategory')
  const manageHeading = document.createElement('h3');
  manageHeading.classList.add('mb-3')
  const manageText = document.createElement('p');
  manageHeading.textContent = heading;
  manageText.textContent = text;
  manageBlock.appendChild(manageHeading)
  manageBlock.appendChild(manageText)
  manageLink.appendChild(manageBlock)
  overallBlock.appendChild(manageLink)
  mainBlock.appendChild(overallBlock)
}


