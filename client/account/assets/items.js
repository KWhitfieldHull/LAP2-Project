const deleteItem = document.getElementById('deleteItem')
const addNewItemButton = document.getElementById('addNewItemButton')
const itemNameAdd = document.getElementById('itemNameAdd')
const itemCategoryAdd = document.getElementById('itemCategoryAdd')
const itemDescriptionAdd = document.getElementById('itemDescriptionAdd')
const itemAddressAdd = document.getElementById('itemAddressAdd')

deleteItem.addEventListener('click', (el) => {
  const item = document.getElementById('item')
  entityDisappears(item)
})

const entityDisappears = (el) => {
  el.classList.add('fade')
  setTimeout(() => {

    el.remove()
  }, 500);
}


addNewItemButton.addEventListener('click', async e => {
  try {
    console.log('hi')
    e.preventDefault()
    const itemName = itemNameAdd.value
    const itemCategory = itemCategoryAdd.value
    const itemDescription = itemDescriptionAdd.value
    const itemAddress = itemAddressAdd.value
    console.log(itemName, itemCategory, itemDescription)
    const options = {
      method: "POST",
      body: JSON.stringify({
        name: itemName,
        category: 1,
        user_id: 1,
        description: itemDescription
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
    const response = await fetch("http://localhost:3000/items/newitem", options);
    const result = await response.json();
    if (!itemName || !itemCategory || !itemDescription) {
      alert('Fill all fields')
    } else {
      console.log(result)
      // window.location.reload();
    }
  } catch (err) {
    console.error(err)
  }
})
