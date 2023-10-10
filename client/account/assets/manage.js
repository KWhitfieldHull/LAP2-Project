const addItemToMyList = document.getElementById('addItemToMyList');
const addUserItemToMyList = document.getElementById('addUserItemToMyList');
const deleteItem = document.getElementById('deleteItem')
const deleteUserItem = document.getElementById('deleteUserItem')

addItemToMyList.addEventListener('click', () => {
  const item = document.getElementById('item')
  alert('Item added to your list!')
  entityDisappears(item)
})
addUserItemToMyList.addEventListener('click', () => {
  const item = document.getElementById('userItem')
  alert('Item added to your list!')
  entityDisappears(item)
})

deleteItem.addEventListener('click', (el) => {
  const item = document.getElementById('item')
  entityDisappears(item)
})
deleteUserItem.addEventListener('click', (el) => {
  const item = document.getElementById('userItem')
  entityDisappears(item)
})

const entityDisappears = (el) => {
  el.classList.add('fade')
  setTimeout(() => {

    el.remove()
  }, 500);
}
