// let database = firebase.database();




// var div1 = document.getElementById("addcol");
// var icon = document.getElementById("loginIcon");
// var logincon = JSON.parse(localStorage.getItem("userLogin"));
// var userID = JSON.parse(localStorage.getItem("userID"));

window.addEventListener('load', setPage);

function setPage() {
    var categoryName = localStorage.getItem('category');
    console.log(categoryName);
    document.getElementById(categoryName).setAttribute('style', 'background:rgb(76, 124, 200, 1); color:#fff;');
    fetch(`${url}/category`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ categoryName })
        })
        .then(function (res) {
            return res.json()
        }).then(data => {
            console.log(data);
            var div = document.getElementById("categoryAll");
            console.log(div);
            data.map((data)=>{

                div.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data._id}')">
                            <li>
                            <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data._id}')" title="" alt="" />
                         <section class="list-left">
                    <h5 class="title">${data.title}</h5>
                    <span class="adprice">Rs:${data.price}</span>
                    <p class="catpath">${data.discription}</p>
                         </section>
                            <div class="clearfix"></div>
                             </li>
                            </a>`

            })










        })
        .catch(function (err) { console.log('err', err) })
    return false;



}


function setCategory(category, categoryName) {
    var div = document.querySelectorAll('.boxCategory')
    console.log(name);

    for (let i = 0; i < div.length; i++) {
        div[i].setAttribute('style', 'background:#fff; ccolor: rgb(12, 179, 245);');
    }
    // div.map((element) => {
    //     element.setAttribute('style', 'background:#fff; ccolor: rgb(12, 179, 245);');  
    // })

    category.setAttribute('style', 'background:rgb(76, 124, 200, 1); color:#fff;');

    fetch(`${url}/category`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ categoryName })
        })
        .then(function (res) {
            return res.json()
        }).then(data => {
            console.log(data);
            var div = document.getElementById("categoryAll");
            console.log(div);
            div.innerHTML = "";
            data.map((data)=>{

                div.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data._id}')">
                            <li>
                            <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data._id}')" title="" alt="" />
                         <section class="list-left">
                    <h5 class="title">${data.title}</h5>
                    <span class="adprice">Rs:${data.price}</span>
                    <p class="catpath">${data.discription}</p>
                         </section>
                            <div class="clearfix"></div>
                             </li>
                            </a>`

            })





        })
        .catch(function (err) { console.log('err', err) })
    return false;
}











// }
// let data1 = database.ref(`adds`).limitToFirst(3);
// let data1 = database.ref(`adds`).orderByChild('category').equalTo('mobile');
// data1.on("child_added", function (data1) {
//     var data = data1.val();
//     console.log(data);
//     if (data.category == "mobile") {
//         div.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data.addID}')">
//         <li>
//             <img src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" title="" alt="" />
//             <section class="list-left">
//                 <h5 class="title">${data.title}</h5>
//                 <span class="adprice">Rs:${data.price}</span>
//                 <p class="catpath">${data.description}</p>
//             </section>
//             <div class="clearfix"></div>
//         </li>
//     </a>`}
// });

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
    location.href = '/addPage';
}

// if (logincon) {
//     document.getElementById("livechat-compact").style.display = "block";
//     document.getElementById("livechat-compact-container").style.display = "block"
// }
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
    location.href ='/search';
}