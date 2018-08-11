var database = firebase.database();
var addDiv = document.getElementById('addDiv');
window.addEventListener('load', myAdds);
var userID = JSON.parse(localStorage.getItem("userID"));
var data;
// var database = firebase.database

function myAdds() {

    database.ref('adds').orderByChild('userID').equalTo(userID).on("child_added", function (addData) {
        var add = addData.val();
        addDiv.innerHTML += `<a href='JavaScript:void(0)'>
             <li>
            <img onclick="addPage('${add.addID}')" src=${add.image} title="" alt="" />
            <section class="list-left">
                <h5 class="title">${add.title}</h5>
                <span class="adprice">Rs. ${add.price}</span>
                <p class="catpath">${add.description}</p>
            </section>
            <section class="list-right">
                <span class="date">${add.time}</span>
                <span class="cityname">Model: ${add.model}</span>
                <button onclick="editAd('${add.addID}')" >Edit</button>
                <button onclick="dltadd('${add.addID}',this)">Delete</button>
            </section>
            <div class="clearfix"></div>
          </li>
         </a>`
    });


}

function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    window.open("addPage.html", "_blank");
}

function dltadd(addId, add) {
    console.log(add);
    firebase.database().ref('adds').child(addId).remove();
    document.querySelector('#addDiv').removeChild(add.parentElement.parentElement.parentElement);
}

function editAd(addId) {
    document.getElementById("addContainer").style.display = "block";
    fetch(`https://sylani-fa1f7.firebaseio.com/adds/${addId}.json`)
        .then(x => x.json())
        .then(x => {
            data = x;
            console.log(x)
            document.getElementById("title").value = x.title;
            // document.getElementById("selectbox").value = x.category;
            document.getElementById("year").value = x.model;
            document.getElementById("desc").value = x.description;
            document.getElementById("price").value = x.price;
        });

}

function saveChanges() {
    console.log(data.addID);
    firebase.database().ref(`adds/${data.addID}`).set({
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        model: document.getElementById("year").value,
        // category: document.getElementById("selectbox").value,
        userID: data.userID,
        addID: data.addID,
        image: data.image,
        mobile: data.mobile,
        userName: data.userName,
        price: document.getElementById("price").value,
        time: data.time
    });
    fetch(`https://sylani-fa1f7.firebaseio.com/adds/${data.addId}.json`)
        .then(x => {
            location.reload();
        })


}


function off() {
    console.log("hi")
    document.getElementById("addContainer").style.display = "none";

}

function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch);
    
        location.href = 'addHere.html';

  

}
