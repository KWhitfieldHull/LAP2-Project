const mainBlock = document.getElementById('mainBlock');

const createAccountPage = (heading, link = "#") => {
  const overallBlock = document.createElement('div');
  const manageBlock = document.createElement('div');
  const manageLink = document.createElement('a');
  manageLink.href = link
  overallBlock.classList.add('col')
  manageBlock.classList.add('p-5', 'my-4', 'border', 'd-flex', 'justify-content-center', 'flex-column', 'align-items-center', 'itemCategories')
  manageBlock.style.background = `linear-gradient(270deg, rgb(79 222 66 / 85%) 23.18%, rgb(55 233 39 / 80%) 98.18%)`
  const manageHeading = document.createElement('h3');
  manageHeading.classList.add('my-4')
  manageHeading.textContent = heading.category;
  manageBlock.appendChild(manageHeading)
  manageLink.appendChild(manageBlock)
  overallBlock.appendChild(manageLink)
  mainBlock.appendChild(overallBlock)
}

// createAccountPage('Paper', './assets/paper-bg.jpg', './manage.html')
// createAccountPage('Glass', './assets/glass-bg.webp', './manage.html')
// createAccountPage('Metal', './assets/metal-bg.jpg', './manage.html')
const getAllCategories = async () => {
  try {
    const options = {
      headers: {
          Authorisation: localStorage.getItem("token")
      }
  }
    const response = await fetch("http://localhost:3000/categories", options);
    const obj = await response.json();
    const categories = await obj.data;
    console.log(categories)
    categories.forEach((category) => {
      createAccountPage(category)
    })
  } catch (err) {
    console.error(err)
    window.location.assign("login.html")
  }
};
getAllCategories()
