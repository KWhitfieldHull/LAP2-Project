const mainBlock = document.getElementById('mainBlock');

const createAccountPage = (heading = "heading", image = './default.jpg', link = "#") => {
  const overallBlock = document.createElement('div');
  const manageBlock = document.createElement('div');
  const manageLink = document.createElement('a');
  manageLink.href = link
  overallBlock.classList.add('col')
  manageBlock.classList.add('p-5', 'my-4', 'border', 'd-flex', 'justify-content-center', 'flex-column', 'align-items-center', 'itemCategories')
  manageBlock.style.background = `linear-gradient(270deg, rgb(79 222 66 / 85%) 23.18%, rgb(55 233 39 / 80%) 98.18%), url(${image})`
  const manageHeading = document.createElement('h3');
  manageHeading.classList.add('my-4')
  const manageText = document.createElement('p');
  manageHeading.textContent = heading;
  manageBlock.appendChild(manageHeading)
  manageBlock.appendChild(manageText)
  manageLink.appendChild(manageBlock)
  overallBlock.appendChild(manageLink)
  mainBlock.appendChild(overallBlock)
}

createAccountPage('Paper', './assets/paper-bg.jpg', './manage.html')
createAccountPage('Glass', './assets/glass-bg.webp', './manage.html')
createAccountPage('Metal', './assets/metal-bg.jpg', './manage.html')
