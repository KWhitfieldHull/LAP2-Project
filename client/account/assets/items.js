const deleteItem = document.getElementById('deleteItem')

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
