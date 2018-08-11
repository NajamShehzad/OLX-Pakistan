let database = firebase.database();
var div = document.getElementById("cars");


// var div1 = document.getElementById("addcol");
var icon = document.getElementById("loginIcon");
var logincon = JSON.parse(localStorage.getItem("userLogin"));
var userID = JSON.parse(localStorage.getItem("userID"));




if (logincon) {
    var data2 = database.ref(`users/${userID}`);

    data2.on("value", function (x) {
        let data = x.val();
        console.log(data);
        icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
        ${data.fullname}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `
    })



}

let data1 = database.ref(`adds`).orderByChild('category').equalTo('vehicles');
data1.on("child_added", function (data1) {
    var data = data1.val();
    console.log(data);
    if (data.category == "vehicles") {
        div.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data.addID}')">
        <li>
            <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" title="" alt="" />
            <section class="list-left">
                <h5 class="title">${data.title}</h5>
                <span class="adprice">Rs:${data.price}</span>
                <p class="catpath">${data.description}</p>
            </section>
            <div class="clearfix"></div>
        </li>
    </a>`}
});

function logout() {
    firebase.auth().signOut().then(function () {
        localStorage.setItem("userID", JSON.stringify(null));
        localStorage.setItem("userLogin", JSON.stringify(null));
        localStorage.setItem("notification", JSON.stringify(null));
        firebase.database().ref('tokens').child(userID).remove();
        location.reload();
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = 'addPage.html';
}
function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.href = 'addHere.html';



}
if (logincon) {
    document.getElementById("livechat-compact").style.display = "block";
    document.getElementById("livechat-compact-container").style.display = "block"
}
function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.href = 'addHere.html';

    

}