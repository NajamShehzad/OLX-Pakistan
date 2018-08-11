var icon = document.getElementById("loginIcon");
var logincon = JSON.parse(localStorage.getItem("userLogin"));
var userID = JSON.parse(localStorage.getItem("userID"));



if (logincon) {
    var database = firebase.database().ref(`users/${userID}`);

    database.on("value", function (x) {
        let data = x.val();
        icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
        ${data.fullname}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `;
        localStorage.setItem("userName", JSON.stringify(data.fullname));

    })



}
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