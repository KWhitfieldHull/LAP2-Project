  ////// Countdown function /////////

  //get time for each item using item id
async function getBidExpires(id){
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
        console.log(bid_expires)
        return bid_expires
    }catch(error){
        console.error(error)
    }
}

let obj2 
async function x(){
    obj2 = await getBidExpires(1);
 }
x();

 const countDownFunction = setInterval( async function() {

    // Get today's date and time
    let now = new Date().getTime();
    countDownDate = new Date(obj2).getTime();
  
    // Find the distance between now and the count down date
    let distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = `Expired`;
    }
  }, 1000);