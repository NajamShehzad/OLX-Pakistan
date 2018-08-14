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
    fetch(`http://localhost:8000/addPage/${addId}`)
        .then(x => x.json())
        .then(add => {
            console.log(add);
            
            addUserID = add.sellerID
            document.title = add.title;
            localData = add;
            title.innerHTML = add.title;
            image.innerHTML = `<li data-thumb="images/ss1.jpg">
            <img width=512 height=512 src="${add.image}" /></li>`;
            description.innerHTML = add.description;
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




function addToFav() {
    // if (logincon) {
    //     let favoriteList = database.ref(`favorite/${userID}/${addId}`);
    //     favoriteList.once('value', (val) => {
    //         if (val.exists()) {
    //             favoriteList.remove()
    //                 .then(() => {
    //                     favIcon.setAttribute('class', 'glyphicon glyphicon-heart-empty');
    //                 })
    //         }
    //         else {
    //             favoriteList.set({
    //                 addId: addId
    //             })
    //                 .then(() => {
    //                     favIcon.setAttribute('class', 'glyphicon glyphicon-heart');
    //                 })
    //         }
    //     })
    // }
    // else {
    //     alert("Please Login To Continue");
    // }



    // if (logincon) {
    //     database.ref(`favorite/${userID}/${localData.addID}`).set(localData)
    //     .then(x => console.log(x));
    //     console.log("Done");
    // }
    // else {
    //     alert("Please Login To Continue");
    // }






    // var dataToStore = JSON.parse(localStorage.getItem("addData"));

    // if (dataToStore == null) {
    //     alert("nothing is here")
    //     var array = [];
    //     array.push(localData);
    //     localStorage.setItem("addData", JSON.stringify(array));
    //     return false;
    // }
    // else {
    //     var array = JSON.parse(localStorage.getItem("addData"));
    //     // alert("its my turn");
    //     var condition = check(localData, array);
    //     if (condition) {
    //         alert("Hello Jee");
    //         array.push(localData);
    //         console.log(array);
    //         localStorage.setItem("addData", JSON.stringify(array));

    //     }
    //     else {
    //         alert("Already in Your Favorite")
    //     }
    // }



}


// function check(element, array) {

//     for (var i = 0; i < array.length; i++) {
//         console.log(element.addID);
//         if (element.addID == array[i].addID) {
//             return false
//             break;
//         }
//     }
//     console.log("working?")
//     return true;
// }




function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = 'addPage.html';
}