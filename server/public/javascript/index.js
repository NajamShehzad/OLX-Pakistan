if ('serviceWorker' in navigator) {
    window.addEventListener("load", x => {
        navigator.serviceWorker.register("sw.js")
            .then(res => console.log("Registerd"))
            .catch(err => console.log(err));
    })
}
const firebase_messaging = firebase.messaging();
let database = firebase.database();
var div = document.getElementById("mobile");
var divCar = document.getElementById("car");
var property = document.getElementById("property");
var appliances = document.getElementById("appliances")
var notificationToken = JSON.parse(localStorage.getItem('notification'));
var icon = document.getElementById("loginIcon");



fetch(`${url}/data`)
    .then(function (res) {
        return res.json()
    }).then(data => {
        var car1 = 0;
        var mobile1 = 0;
        var appliances1 = 0;
        var property1 = 0;
        console.log(data);
        for (i = 0; i < data.length; i++) {
            if (data[i].category == "mobile") {
                if (mobile1 > 3) {
                    continue;
                }
                div.innerHTML += `<div class="col-sm-3 text-center">
                <img src="${data[i].image}" style="cursor: pointer;" onclick="addPage('${data[i]._id}')" height="300">
                <p >${data[i].title}</p>
            </div>`;
                mobile1++;
            }
            else if (data[i].category == "vehicles") {
                if (car1 > 3) {
                    continue;
                }
                divCar.innerHTML += `<div class="col-sm-3 text-center">
            <img src="${data[i].image}" style="cursor: pointer;" onclick="addPage('${data[i]._id}')" height="300">
            <p >${data[i].title}</p>
            </div>`
                car++;

            }
            else if (data[i].category == "property") {
                if (property1 > 3) {
                    continue;
                }
                property.innerHTML += `<div class="col-sm-3 text-center">
            <img src="${data[i].image}" style="cursor: pointer;" onclick="addPage('${data[i]._id}')" height="300">
            <p >${data[i].title}</p>
            </div>`
                property1++;
            }

            else if (data[i].category == "appliances") {
                if (appliances1 > 3) {
                    continue;
                }
                appliances.innerHTML += `<div class="col-sm-3 text-center">
            <img src="${data[i].image}" style="cursor: pointer;" onclick="addPage('${data[i]._id}')" height="300">
            <p >${data[i].title}</p>
            </div>`
                appliances1++;
            }
        }
    })
    .catch(function (err) { console.log('err', err) })




function categorypage(category) {
    localStorage.setItem('category', category);
    location.href = "/category"
}


function firebaseMessage() {
    firebase_messaging.requestPermission()
        .then(() => handeleTokenRefresh())
        .catch((err) => console.log('user didnt give permission', err));

    function handeleTokenRefresh() {

        return firebase_messaging.getToken()
            .then(token => {
                console.log(token);
                database.ref(`tokens/${userData._id}`).set({
                    token: token,
                });
            });

    }
}




if(token){
    document.getElementById("livechat-compact").style.display = "block";
    document.getElementById("livechat-compact-container").style.display = "block"
}



function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    console.log(addToSearch);
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.href = '/search';
}



function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = "/addPage"
}
