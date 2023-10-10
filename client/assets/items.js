//////////////CREATE ELEMENT

function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const name = document.createElement("h1");
    name.textContent = `Name: ${data["name"]}`;
    post.appendChild(name);

    const image = document.createElement('img');
    image.src = data["image_url"];
    post.appendChild(image);
    
    const category = document.createElement("h3");
    category.textContent = `Category: ${data["category"]}`;
    post.appendChild(category);

    const description = document.createElement("p");
    description.textContent = `Description: ${data["description"]}`;
    post.appendChild(description);
  

    return post;
}






/////////LOAD POST


async function loadDiary () {
    try {
      const response = await fetch("http://localhost:3000/items");
      const posts = await response.json();
      
      if (response.status == 200) {
        
        const container = document.getElementById("posts");
  
        posts.forEach(p => {
          const elem = createPostElement(p);
          container.appendChild(elem);
        });
      } else {
        //window.location.assign("./index.html");
      }
    } catch (error) {
      console.log(error);
    }
}

loadDiary();








document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("itemsForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        
        const imageFile = document.querySelector("#itemFile").files[0];
        const name = document.querySelector('#itemName');
        const description = document.querySelector('#itemDesc');
        const category = document.querySelector('#itemCategory');

     
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const srcData = fileReader.result; //base64 image data
                //console.log('base64:', srcData);


                const imageElement = document.createElement('img');
                imageElement.src = srcData;
                document.body.appendChild(imageElement);



                const img = new Image();
                img.src = srcData;

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
                console.log('Resized and compressed base64:', resizedBase64);
                const form = {
                    image_url: resizedBase64,
                    name: name.value,
                    description: description.value,
                    category: category.value,
                    user_id: 1
                };

                
                
                
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                }
               
                const result = await fetch("http://localhost:3000/items/newitem", options);
               
                if (result.status == 201) {
                    alert("Entry Entered successfully")
                    window.location.reload();
                    diaryForm.reset()
                }
                });

                
            };

            
            fileReader.readAsDataURL(imageFile);
            
        } else {
            console.error('No image selected.');
        }
    });
});
  










  