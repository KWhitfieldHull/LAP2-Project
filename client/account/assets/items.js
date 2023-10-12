const deleteItem = document.getElementById('deleteItem')
const addNewItemButton = document.getElementById('addNewItemButton')
const itemNameAdd = document.getElementById('itemNameAdd')
const itemCategoryAdd = document.getElementById('itemCategoryAdd')
const itemCategoryEdit = document.getElementById('itemCategoryEdit')
const itemDescriptionAdd = document.getElementById('itemDescriptionAdd')
const itemAddressAdd = document.getElementById('itemAddressAdd')

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
      const option = document.createElement('option')
      option.innerHTML = `${category['category']}`
      itemCategoryEdit.appendChild(option)
      itemCategoryAdd.appendChild(option.cloneNode(true))
    })
  } catch (err) {
    console.error(err)
  }
};
getAllCategories()

const getCategoryByName = async (category) => {
  try {
    const options = {
      headers: {
        Authorisation: localStorage.getItem("token")
      }
    }
    const response = await fetch(`http://localhost:3000/categories/name/${category}`, options);
    const obj = await response.json();
    const categories = await obj.data;
    return categories['id'];
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
  }
};
getAllItems()

// add item
const addItem = async (item) => {
  const content = document.createElement('div')
  let id = item['id']
  content.id = `item-${id}`
  content.innerHTML = `
            <div class="card mb-3 border-0 col-lg-8 col-12 p-4 border-bottom item-${item['id']}">
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
                            <div>
                            <a class="btn btn-manage editItemButton" id="itemEditButton-${item['id']}" href="#" data-bs-toggle="modal" data-bs-target="#editItem">Edit</a>
                            <a class="btn btn-manage deleteButton" href="#" id="deleteItem-${item['id']}">Delete</a>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
`
  return content;
}






document.getElementById("addItemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const imageFile = document.querySelector("#itemImageAdd").files[0];
  const name = document.querySelector('#itemNameAdd');
  const description = document.querySelector('#itemDescriptionAdd');
  const category = document.querySelector('#itemCategoryAdd');
  // const address = document.querySelector('#itemAddressAdd');


  if (imageFile) {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const srcData = fileReader.result;
      const imageElement = document.createElement('img');
      imageElement.src = srcData;
      // document.body.appendChild(imageElement);
      const img = new Image();
      img.src = srcData;
      //image resize
      function resizeImageAndCallback(callback) {
        img.onload = function () {
          const maxWidth = 150;
          const maxHeight = 150;
          const quality = 0.3;
          let newWidth = img.width;
          let newHeight = img.height;
          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }
          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
          callback(resizedBase64);
        };
      }
      resizeImageAndCallback(async function (resizedBase64) {
        const form = {
          image_url: resizedBase64,
          name: name.value,
          description: description.value,
          category: await getCategoryByName(category.value),
          user_id: 1
        };
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorisation: localStorage.getItem("token")
          },
          body: JSON.stringify(form),
        }
        const result = await fetch("http://localhost:3000/items/newitem", options);
        if (result.status == 201) {
          alert("Entry Entered successfully")
          window.location.reload()
        }
      });
    };
    fileReader.readAsDataURL(imageFile);
  } else {
    console.error('No image selected.');
  }
});

//update
document.addEventListener('click', event => {
  if (event.target.matches(".editItemButton")) {
    document.getElementById("editItemForm").addEventListener("submit", async (e) => {
      e.preventDefault()
      const imageFile = document.querySelector("#itemImageEdit").files[0];
      const name = document.querySelector('#itemNameEdit');
      const description = document.querySelector('#itemDescriptionEdit');
      const category = document.querySelector('#itemCategoryEdit');
      const id = parseInt((event.target.id).split('-')[1]);
      // const address = document.querySelector('#itemAddressAdd');


      if (imageFile) {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const srcData = fileReader.result;
          const imageElement = document.createElement('img');
          imageElement.src = srcData;
          // document.body.appendChild(imageElement);
          const img = new Image();
          img.src = srcData;
          //image resize
          function resizeImageAndCallback(callback) {
            img.onload = function () {
              const maxWidth = 150;
              const maxHeight = 150;
              const quality = 0.3;
              let newWidth = img.width;
              let newHeight = img.height;
              if (img.width > maxWidth) {
                newWidth = maxWidth;
                newHeight = (img.height * maxWidth) / img.width;
              }
              if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = (img.width * maxHeight) / img.height;
              }
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = newWidth;
              canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
              callback(resizedBase64);
            };
          }
          resizeImageAndCallback(async function (resizedBase64) {
            const form = {
              image_url: resizedBase64,
              name: name.value,
              description: description.value,
              category: await getCategoryByName(category.value),
              user_id: 1
            };
            console.log(form)
            const options = {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
                Authorisation: localStorage.getItem("token")
              },
              body: JSON.stringify(form)
            }
            const result = await fetch(`http://localhost:3000/items/${id}`, options);

            alert("Entry updated successfully")
            window.location.reload()

          });
        };
        fileReader.readAsDataURL(imageFile);
      } else {
        console.error('No image selected.');
      }
    })
  }
})

//delete item
document.addEventListener('click', (event) => {
  if (event.target.matches(".deleteButton")) {
    const id = (event.target.id).split('-')[1];
    fetch(`http://localhost:3000/items/${id}`, { method: "DELETE", headers: { Authorisation: localStorage.getItem("token") } })
      .then(response => {
        document.getElementById(`item-${id}`).classList.add('fade')
        setTimeout(() => {
          document.querySelector(`.item-${id}`).remove()
        }, "300");
        response.json()
      });

  }
})


