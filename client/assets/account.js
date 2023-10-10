const mainBlock = document.getElementById('mainBlock');

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

createAccountPage('Admin Area', 'Manage everything')
createAccountPage('My Items List', 'Your items list')
createAccountPage('Account details', 'Edit your details')
