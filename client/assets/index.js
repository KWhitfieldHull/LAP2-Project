const showItemsButton = document.getElementById('showItemsButton')
const resetItemsButton = document.getElementById('resetItemsButton')



resetItemsButton.addEventListener('click', () => {
  const categoriesCheckboxed = document.querySelectorAll('.checkboxCategories');
  categoriesCheckboxed.forEach(checkbox => checkbox.checked = false)
})
