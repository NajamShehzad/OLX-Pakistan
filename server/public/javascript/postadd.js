var imagedata;
var picPreview = document.querySelector('#picture');
var storage = firebase.storage();
var imageURL;



function postadd() {

    var category = document.getElementById("selectbox").value;
    var model = document.getElementById("year").value;
    var title = document.getElementById("title").value;
    var discription = document.getElementById("desc").value;
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var mobileNum = document.getElementById('mobile').value;
    var price = document.getElementById("price").value;
    var imag = imagedata;
    var token = localStorage.getItem('token');


    var addBody = {
        category,
        model,
        title,
        discription,
        sellerID: userInfo._id,
        mobileNum,
        userName:userInfo.name,
        price,
        image: "url",
        time: new Date().toLocaleString()
    }

    console.log(addBody);
    console.log(token);
        fetch("http://localhost:8000/postAd",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth':token
            },
            method: "POST",
            body: JSON.stringify(addBody)
        })
        .then(function (res) {
            console.log('hellow friends');
            return res.json()
        }).then(Add => {
            console.log(Add);
        })
        .catch(function (err) { console.log('err', err) })
    return false;






    // if (userID == null) {
    //     alert("Please Login To Post The Add");
    //     return;
    // }
    // if (title == "" || year == "" || desc == "" || price == "") {
    //     alert("Some Thing Is Missing");
    //     return;
    // }

    // var number = Math.floor(100000 + Math.random() * 900000) + "add";
    // var inputFile = document.querySelector('#upload').files[0];
    // var fileref = storage.ref("image/" + number);
    // fileref.put(inputFile)
    //     .then(snapshot => {
    //         return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
    //     })

    //     .then(downloadURL => {
    //         console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
    //         imageURL = downloadURL;
    //         //return downloadURL;
    //         var database = firebase.database();

    //         console.log(category, year, title, desc, userID);
    //         console.log(number);
    //         console.log(imageURL);
    //         let data = database.ref(`adds/${number}`);
    //         data.set({
    //             title: title,
    //             description: desc,
    //             model: year,
    //             category: category,
    //             userID: userID,
    //             addID: number,
    //             image: imageURL,
    //             mobile: mobile,
    //             userName: userName,
    //             price: price,
    //             time: new Date().toDateString()
    //         });
    //         database.ref("chat/notification").push().set({

    //             title: title,
    //             description: desc,
    //             model: year,
    //             category: category,
    //             price: price,
    //             image: imageURL,
    //             time: new Date().toDateString()

    //         });
    //     }).then(x => {
    //         let form = document.querySelector("#form123");
    //         // picPreview.src = "";

    //         form.reset();
    //         location.href ="myads.html"
    //         return false;

    //     })

    //     .catch(error => {
    //         // Use to signal error if something goes wrong.
    //         console.log(`Failed to upload file and get link - ${error}`);
    //     });




}