document.addEventListener('DOMContentLoaded', () => {
  console.log(localStorage.getItem('token'))
  const showItemsButton = document.getElementById('showItemsButton');
  const itemsList = document.getElementById('itemsList');
  const categoriesList = document.getElementById('categoriesList');
  const resetItemsButton = document.getElementById('resetItemsButton');
  const logInButtons = document.getElementById('logInButtons');
  const accountButton = document.getElementById('accountButton');

  if (localStorage.getItem('token') == null) {
    window.location.href = './login.html'
  }
  if (localStorage.getItem('token') != null) {
    accountButton.href = "./account/"
    const logOut = document.createElement('a')
    logOut.href = '#'
    logOut.id = 'log-out'
    logOut.textContent = 'Log Out'
    logInButtons.appendChild(logOut)
  }


  const getAllItems = async () => {
    try {
      const options = {
        headers: {
            Authorisation: localStorage.getItem("token")
        }
    }
      const response = await fetch("http://localhost:3000/items", options);
      const obj = await response.json();
      const items = await obj.data;
      items.forEach((item) => {
        const e = addItem(item)
        itemsList.appendChild(e)
      })
    } catch (err) {
      console.error(err)
      window.location.assign("login.html")
    }
  };
  getAllItems()

  showItemsButton.addEventListener('click', (event) => {
    const categoriesCheckboxed = document.querySelectorAll('.checkboxCategories');
    if (event.target.matches('#showItemsButton')) {
      let i = 0;
      categoriesCheckboxed.forEach(element => {
        if (element.checked) {
          itemsList.innerHTML = ''
          getItemsFromCategory(element.value)
        } else if (!element.checked) {
          i++
        }
        if (i === categoriesCheckboxed.length) {
          itemsList.innerHTML = ''
          getAllItems()
        }
      })
    }
  })
  resetItemsButton.addEventListener('click', (event) => {
    const categoriesCheckboxed = document.querySelectorAll('.checkboxCategories');
    if (event.target.matches("#resetItemsButton")) {
      itemsList.innerHTML = ''
      categoriesCheckboxed.forEach(checkbox => {
        checkbox.checked = false
      })
      getAllItems()
    }
  })



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
      categories.forEach((category) => {
        const e = addCategory(category)
        categoriesList.appendChild(e)
      })
    } catch (err) {
      console.error(err)
      window.location.assign("login.html")
    }
  };
  getAllCategories()

  const getItemsFromCategory = async (cat) => {
    try {
      const options = {
        headers: {
            Authorisation: localStorage.getItem("token")
        }
    }
      const response = await fetch("http://localhost:3000/items", options);
      const obj = await response.json();
      const items = await obj.data;
      items.forEach((item) => {
        if (item.category === cat) {
          const e = addItem(item)
          itemsList.appendChild(e)
        }
      })
    } catch (err) {
      console.error(err)
      window.location.assign("login.html")
    }
  }
  // add item
  const addItem = (item) => {



    const content = document.createElement('div')
    let id = item['id']
    content.id = `item-${id}`
    content.innerHTML = `
            <div class="card mb-3 border-0 col-lg-8 col-12 p-4 border-bottom">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${item['image_url']}" class="img-fluid rounded-start" title="#itemImg-${item['id']}" id="itemImg-${item['id']}">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title mb-2" id="itemTitle-${item['id']}">${item['name']}</h4>
                            <a href="#" class="fs-6" id="itemCategory-${item['id']}">${item['category']}</a>
                            <hr>
                            <p class="card-text" id="itemDescription-${item['id']}">${item['description']}</p>
                            <div class="input-group mb-3">
                            <label class="input-group-text" for="itemAddBid-${item['id']}">Max Bid: £50</label>
                            
                              <input type="text" class="form-control" id="itemAddBid-${item['id']}" placeholder="£0" aria-label="Your bid" aria-describedby="temAddButton-${item['id']}">
                              <button type="button" class="btn btn-add shadow-sm text-white addItemButton" id="itemAddButton-${item['id']}">Add</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
`
    return content;
  
  }

  //add category
  const addCategory = (category) => {
    const content = document.createElement('div')
    content.classList.add('form-check', 'mb-2')
    content.innerHTML = `
    <input class="form-check-input checkboxCategories" type="checkbox" value="${category['category']}" id="categoryItem-${category['id']}">
    <label class="form-check-label" for="categoryItem-${category['id']}">
        ${category['category']}
    </label>
`
    return content;
  }



  const listenItem = (id) => {
    let buttonId = `itemAddButton-${id}`
    let itemId = `item-${id}`;
    const button = document.getElementById(buttonId)
    const item = document.getElementById(itemId)
    return { button, item }
  }


  const deleteItem = (item) => {
    item.classList.add('fade')
    setTimeout(() => {
      item.remove()
    }, 500);
  }

  //add item to your list
  document.addEventListener('mouseover', (event) => {
    if (event.target.matches(".addItemButton")) {
      for (let i = 0; i < itemsList.childNodes.length; i++) {
        if (itemsList.childNodes[i].id) {
          let id = Number(itemsList.childNodes[i].id.slice(-1))
          const item = listenItem(id).button
          item.addEventListener('click', () => {
            deleteItem(listenItem(id).item)
          })
        }
      }
    }
  })
  document.addEventListener('click', (event) => {
    if (event.target.matches("#log-out")) {
      console.log('hi')
      localStorage.removeItem("token")
      window.location.href = './login.html'
    }
  })



})


