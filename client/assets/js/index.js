document.addEventListener('DOMContentLoaded', () => {

  const showItemsButton = document.getElementById('showItemsButton');
  const itemsList = document.getElementById('itemsList');
  const categoriesList = document.getElementById('categoriesList');
  const resetItemsButton = document.getElementById('resetItemsButton');



  const updateBid = async (data) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorisation: localStorage.getItem("token")
        },
        mode: 'cors',
        body: JSON.stringify(data)
      }
      const response = await fetch('http://localhost:3000/bids/bidsupdated', options)
      const obj = await response.json();
    } catch (error) {
      console.error(error)
    }
  }

  const getBidById = async (id) => {
    try {
      const options = {
        headers: {
          Authorisation: localStorage.getItem("token")
        }
      }
      const response = await fetch(`http://localhost:3000/bids/${id}`, options);
      const obj = await response.json();
      const bids = await obj.data;
      return bids['highest_bid']
    } catch (err) {
      console.error(err)
    }
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
      items.forEach(async (item) => {
        const e = await addItem(item)
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
      categoriesCheckboxed.forEach(async element => {
        if (element.checked) {
          itemsList.innerHTML = ''
          getItemsFromCategory(element.value)
        } else if (!element.checked) {
          i++
        }
        if (i === categoriesCheckboxed.length) {
          itemsList.innerHTML = ''
          await getAllItems()
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
      items.forEach(async (item) => {
        if (item.category === cat) {
          const e = await addItem(item)
          itemsList.appendChild(e)
        }
      })
    } catch (err) {
      console.error(err)
      window.location.assign("login.html")
    }
  }


  // add item
  const addItem = async (item) => {
    const content = document.createElement('div')
    let id = item['id']
    let bid = await getBidById(id)
    content.id = `item-${id}`
    //itemAddBid-${item['id']}
    content.innerHTML = `
            <div class="card mb-3 border-0 col-lg-8 col-12 p-4 border-bottom">
                    <div class="row g-0">
                        <div class="col-md-4 text-center">
                        <img src="${item['image_url']}" class="img-fluid" title="#itemImg-${item['id']}" id="itemImg-${item['id']}">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title mb-2" id="itemTitle-${item['id']}">${item['name']}</h4>
                            <span href="#" class="fs-6" id="itemCategory-${item['id']}">${item['category']}</span>
                            <hr>
                            <p class="card-text" id="itemDescription-${item['id']}">${item['description']}</p>
                            <div class="input-group mb-3" id="item${item['id']}">
                            <label class="input-group-text" for="itemAddBid-${item['id']}">Current:&nbsp;£<span id="currentBid-${item['id']}">${bid}</span></label>
                            
                              <input type="number" class="form-control" id="itemAddBid-${item['id']}" placeholder="£0" aria-label="Your donation" aria-describedby="temAddButton-${item['id']}">
                              <button type="button" class="btn btn-add shadow-sm text-white addItemButton" id="itemAddButton-${item['id']}">Donate</button>
                            </div>
                            <div id="countdown-${item['id']}">${setInterval(async () => await countDownFunction(item['id']), 1000)}</div>
                        </div>
                        </div>
                    </div>
                </div>
`
    return content;
  }

  ////// Countdown function /////////

  //get time for each item using item id
  async function getBidExpires(id) {
    try {
      const options = {
        headers: {
          Authorisation: localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
      }
      let response = await fetch(`http://localhost:3000/items/expiresat/${id}`, options);
      let bidObject = await response.json();
      let bid_expires = bidObject.bid_expires
      return bid_expires
    } catch (error) {
      console.error(error)
    }
  }


  async function countDownFunction(id) {

    // Get today's date and time
    let now = new Date().getTime();
    countDownDate = new Date(await getBidExpires(id)).getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById(`countdown-${id}`).innerHTML = `Time left: ${d}d ${h}h ${m}m ${s}`;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval();
      document.getElementById(`countdown-${id}`).innerHTML = `Expired`;
    }
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


  //add item to your list
  document.addEventListener('mouseover', (event) => {
    if (event.target.matches(".addItemButton")) {
      for (let i = 0; i < itemsList.childNodes.length; i++) {
        if (itemsList.childNodes[i].id) {
          let id = Number(itemsList.childNodes[i].id.slice(-1))
          const item = listenItem(id).button
          item.addEventListener('click', () => {
            // document.getElementById(`item${id}`).deleteItem(smallBidText)
            //Sets the ID of the item you clicked Add on
            const bidID = `itemAddBid-${id}`
            const currentBid = parseInt(document.getElementById(`currentBid-${id}`).innerHTML)
            //gets the value of the bid
            const bidValue = document.getElementById(bidID).value
            data = { item_id: id, proposed_bid: bidValue, user_id: 3 }
            if (currentBid >= bidValue) {
              document.getElementById(bidID).value = ''
              document.getElementById(bidID).placeholder = 'Too Small'
              document.getElementById(bidID).style.backgroundColor = '#A01300'
              setTimeout(() => {
                document.getElementById(bidID).style.transition = '.5s'
                document.getElementById(bidID).placeholder = '£0'
                document.getElementById(bidID).style.backgroundColor = 'white'
              }, 1000);

            } else {

              updateBid(data)
              window.location.reload()
            }

            //TEMP COMMENTED RESTORE LATER THIS IS JUST TESTING
            //deleteItem(listenItem(id).item)
          }, { once: true })
        }
      }
    }
  })




})


