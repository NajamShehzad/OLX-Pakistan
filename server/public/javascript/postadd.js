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

    if (!userInfo) {
        alert("Please Login To Post The Add");
        return;
    }
    else if (!token) {
        alert("Please Login To Post The Add");
        return;
    }

    var addBody = {
        category,
        model,
        title,
        discription,
        sellerID: userInfo._id,
        mobileNum,
        userName: userInfo.name,
        price,
        image: "url",
        time: new Date().toLocaleString()
    }


    console.log(addBody);
    console.log(token);
    // fetch("http://localhost:8000/postAd",
    //     {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'x-auth': token
    //         },
    //         method: "POST",
    //         body: JSON.stringify(addBody)
    //     })
    //     .then(function (res) {
    //         console.log('hellow friends');
    //         return res.json()
    //     }).then(Add => {
    //         console.log(Add);
    //     })
    //     .catch(function (err) { console.log('err', err) })
    // return false;







    // if (title == "" || year == "" || desc == "" || price == "") {
    //     alert("Some Thing Is Missing");
    //     return;
    // }

    // var number = Math.floor(100000 + Math.random() * 900000) + "add";
    var inputFile = document.querySelector('#upload').files[0];
    var fileref = storage.ref("image/" + inputFile.name);
    fileref.put(inputFile)
        .then(snapshot => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })

        .then(downloadURL => {
            var addBody = {
                category,
                model,
                title,
                discription,
                sellerID: userInfo._id,
                mobileNum,
                userName: userInfo.name,
                price,
                image: downloadURL,
                time: new Date().toLocaleString()
            }

            fetch("http://localhost:8000/postAd",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-auth': token
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
                .catch(function (err) {
                    console.log('err', err);
                    throw(err);

                })

        }).then(x => {
            let form = document.querySelector("#form123");
            form.reset();
            return false;

        })

        .catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
        });
}