document.getElementById("recyleForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector('#itemName');
    const answer = document.querySelector('#recyclable p');
    const loadingImg = document.querySelector('#recyclable2 img');
    loadingImg.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGhuNGMyY2Jtbnc2OGhvdXljZXY4ZWppN2w4MDM3cjM5d2U1NGJjMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif";
    answer.textContent = "Please wait a few seconds...";
    
    const form = {
        item: name.value
    };


    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }
   
    const result = await fetch("http://localhost:3000/recycle", options);

    const posts = await result.json();
  
    
   
    if (result.status == 200) {
        answer.textContent = posts.data;
        loadingImg.src = "";
    }

});