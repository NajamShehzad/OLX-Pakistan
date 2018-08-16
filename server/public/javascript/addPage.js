var addId = JSON.parse(localStorage.getItem("addId"));



if (addId != null) {

    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var time = document.getElementById("time");
    var image = document.getElementById("image");
    var model = document.getElementById("model");
    var category = document.getElementById("category");
    var category2 = document.getElementById("category2");
    var price = document.getElementById("price");
    var mobile = document.getElementById("mobile");
    var userName = document.getElementById("userName");
    var logincon = JSON.parse(localStorage.getItem("userLogin"));
    var favIcon = document.getElementById('favIcon');

    var database = firebase.database();
    var  productID;
    fetch(`${url}/addPage/${addId}`)
        .then(x => x.json())
        .then(add => {
            console.log(add);
            productID = add._id
            addUserID = add.sellerID
            document.title = add.title;
            localData = add;
            title.innerHTML = add.title;
            image.innerHTML = `<li data-thumb="images/ss1.jpg">
            <img width=512 height=512 src="${add.image}" /></li>`;
            description.innerHTML = add.discription;
            time.innerHTML = add.time;
            price.innerHTML = add.price;
            model.innerHTML = add.model;
            category.innerHTML = add.category.toUpperCase();
            category2.innerHTML = add.category.toUpperCase();
            mobile.innerHTML = add.mobileNum;
            userName.innerHTML = add.userName;
            addUserName = add.userName;

            // let favoriteList = database.ref(`favorite/${userID}/${addId}`);
            // favoriteList.once('value', (val) => {
            //     console.log(val.val())
            //     if (val.exists()) {

            //         favIcon.setAttribute('class', 'glyphicon glyphicon-heart');

            //     }

            // })



        })

}
var isFav;
function checkFav() {
    // console.log('imhere');
    isFav = check(addId, userData.favorite);
    if (isFav) {
        favIcon.setAttribute('class', 'glyphicon glyphicon-heart');
    }


}


function addToFav() {


    if (token) {
        if (isFav) {
            fetch(`${url}/fav/${addId}`, {
                headers: {
                    'x-auth': token
                },
                method: 'DELETE'
            }).then(x => { isFav = !isFav; return x.json() }).then(x => {
                favIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                console.log(x.res)
            })

        }
        else {
            fetch(`${url}/fav/${addId}`, {
                headers: {
                    'x-auth': token
                }
            }).then(x => { isFav = !isFav; return x.json() }).then(x => {
                favIcon.setAttribute('class', 'glyphicon glyphicon-heart');
                console.log(x.res)
            })
        }
    }
    else {
        alert('Please Sign In to Continue')
    }
    

}


function check(id, array) {
    console.log(array);
    // console.log(id);

    for (var i = 0; i < array.length; i++) {
        console.log(id);
        if (id == array[i]) {
            return true
            break;
        }
    }
    console.log("working?")
    return false;
}




function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = 'addPage.html';
}