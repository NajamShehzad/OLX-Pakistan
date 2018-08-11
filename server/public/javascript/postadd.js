var imagedata;
var picPreview = document.querySelector('#picture');
var storage = firebase.storage();
var imageURL;

function divpic() {
    //     var number = Math.floor(100000 + Math.random() * 900000) + "add";
    //     var inputFile = document.querySelector('#upload').files[0];
    //     var fileref = storage.ref("image/" + number);
    //     fileref.put(inputFile)
    //    .then(snapshot => {
    //        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
    //    })

    //    .then(downloadURL => {
    //       console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
    //       imageURL = downloadURL;
    //       return downloadURL;
    //    })

    //    .catch(error => {
    //       // Use to signal error if something goes wrong.
    //       console.log(`Failed to upload file and get link - ${error}`);
    //    });
}



function postadd() {

    var category = document.getElementById("selectbox").value;
    var year = document.getElementById("year").value;
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var userID = JSON.parse(localStorage.getItem("userID"));
    var mobile = JSON.parse(localStorage.getItem("mobile"));
    var userName = JSON.parse(localStorage.getItem("userName"));
    var price = document.getElementById("price").value;
    var imag = imagedata;
    if (userID == null) {
        alert("Please Login To Post The Add");
        return;
    }
    if (title == "" || year == "" || desc == "" || price == "") {
        alert("Some Thing Is Missing");
        return;
    }

    var number = Math.floor(100000 + Math.random() * 900000) + "add";
    var inputFile = document.querySelector('#upload').files[0];
    var fileref = storage.ref("image/" + number);
    fileref.put(inputFile)
        .then(snapshot => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })

        .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            imageURL = downloadURL;
            //return downloadURL;
            var database = firebase.database();

            console.log(category, year, title, desc, userID);
            console.log(number);
            console.log(imageURL);
            let data = database.ref(`adds/${number}`);
            data.set({
                title: title,
                description: desc,
                model: year,
                category: category,
                userID: userID,
                addID: number,
                image: imageURL,
                mobile: mobile,
                userName: userName,
                price: price,
                time: new Date().toDateString()
            });
            database.ref("chat/notification").push().set({

                title: title,
                description: desc,
                model: year,
                category: category,
                price: price,
                image: imageURL,
                time: new Date().toDateString()

            });
        }).then(x => {
            let form = document.querySelector("#form123");
            // picPreview.src = "";
            
            form.reset();
            location.href ="myads.html"
            return false;
            
        })

        .catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
        });

    //  var number = Math.floor(100000 + Math.random() * 900000) + "add";
    // let data1 = database.ref(`adds/849722add`);
    // data1.on("value",function(x){
    //     var dataimage = x.val()
    //     var picPreview = document.getElementById("picture1");
    //    // console.log(dataimage.image);
    //     picPreview.src = dataimage.image;

    // })
    //  console.log(email, password);


}