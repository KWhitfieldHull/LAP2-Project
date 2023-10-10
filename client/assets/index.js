const showItemsButton = document.getElementById('showItemsButton')
const resetItemsButton = document.getElementById('resetItemsButton')
const itemsList = document.getElementById('itemsList')


resetItemsButton.addEventListener('click', () => {
  const categoriesCheckboxed = document.querySelectorAll('.checkboxCategories');
  categoriesCheckboxed.forEach(checkbox => checkbox.checked = false)
})

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
for (let i = 0; i < itemsList.childNodes.length; i++) {
  if (itemsList.childNodes[i].id) {
    let id = Number(itemsList.childNodes[i].id.slice(-1))
    const item = listenItem(id).button
    item.addEventListener('click', () => {
      alert('Item added!!!!')
      deleteItem(listenItem(id).item)
    })
  }
}
