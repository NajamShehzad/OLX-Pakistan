// if ('serviceWorker' in navigator) {
//     window.addEventListener("load", x => {
//         navigator.serviceWorker.register("sw.js")
//             .then(res => console.log("Registerd"))
//             .catch(err => console.log(err));
//     })
// }
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




// if (logincon) {
//     var data2 = database.ref(`users/${userID}`);

//     data2.on("value", function (x) {
//         let data = x.val();
//         // console.log(data);
//         icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
//         ${data.fullname}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `
//     });
//     document.getElementById("livechat-compact").style.display = "block";
//     document.getElementById("livechat-compact-container").style.display = "block"

//     firebase_messaging.requestPermission()
//         .then(() => handeleTokenRefresh())
//         .catch((err) => console.log('user didnt give permission', err));

//     function handeleTokenRefresh() {

//         return firebase_messaging.getToken()
//             .then(token => {
//                 console.log(token);
//                 database.ref(`tokens/${userID}`).set({
//                     token: token,
//                 });
//             });

//     }




// }

function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    console.log(addToSearch);
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.href = '/search';
}

// let data1 = database.ref(`adds`).orderByChild('category').equalTo('mobile').limitToFirst(4);
// data1.on("child_added", function (data1) {
//     var data = data1.val();
//     // console.log(data);
//     div.innerHTML += `<div class="col-sm-3 text-center">
//         <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
//         <p >${data.title}</p>
//     </div>`
// });
// let data2_2 = database.ref(`adds`).orderByChild('category').equalTo('vehicles').limitToFirst(4);
// data2_2.on("child_added", function (data1) {
//     var data = data1.val();
//     // console.log(data);
//     divCar.innerHTML += `<div class="col-sm-3 text-center">
//         <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
//         <p >${data.title}</p>
//     </div>`
// });

// let data3 = database.ref(`adds`).orderByChild('category').equalTo('property').limitToFirst(4);
// data3.on("child_added", function (data1) {
//     var data = data1.val();
//     console.log(data);
//     property.innerHTML += `<div class="col-sm-3 text-center">
//         <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
//         <p >${data.title}</p>
//     </div>`
// });
// let data4 = database.ref(`adds`).orderByChild('category').equalTo('appliances').limitToFirst(4);
// data4.on("child_added", function (data1) {
//     var data = data1.val();
//     // console.log(data);
//     appliances.innerHTML += `<div class="col-sm-3 text-center">
//         <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
//         <p >${data.title}</p>
//     </div>`
// });







// let data1 = database.ref(`adds`);
// data1.on("child_added", function (data1) {
//     var data = data1.val();
//     console.log(data);
//     if (data.category == "mobile") {
//         div.innerHTML += `<div class="col-sm-3 text-center">
//     <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
//     <p >${data.title}</p>
// </div>`}
//     else if (data.category == "vehicles") {
//         divCar.innerHTML += `<div class="col-sm-3 text-center">
// <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
// <p >${data.title}</p>
// </div>`}
//     else if (data.category == "property") {
//         property.innerHTML += `<div class="col-sm-3 text-center">
// <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
// <p >${data.title}</p>
// </div>`}

//     else if (data.category == "appliances") {
//         appliances.innerHTML += `<div class="col-sm-3 text-center">
// <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" height="300">
// <p >${data.title}</p>
// </div>`}
// });

// function callme() {
//     database.ref('adds').startAt('new').orderByChild("title").on('value', function (snapshot) {
//         //snapshot would have list of NODES that satisfies the condition
//         console.log(snapshot.val())
//         console.log('-----------');

//         //go through each item found and print out the emails
//         snapshot.forEach(function (childSnapshot) {

//             var key = childSnapshot.key;
//             var childData = childSnapshot.val();

//             //this will be the actual email value found
//             console.log(childData.title, key);
//         });

//     });
// }

// function logout() {
//     firebase.auth().signOut().then(function () {
//         localStorage.setItem("userID", JSON.stringify(null));
//         localStorage.setItem("userLogin", JSON.stringify(null));
//         localStorage.setItem("notification", JSON.stringify(null));
//         firebase.database().ref('tokens').child(userID).remove();
//         setTimeout(function (x) {
//             location.reload();

//         }, 2000);
//         // Sign-out successful.
//     }).catch(function (error) {
//         // An error happened.
//     });
// }

function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = "/addPage"
}
