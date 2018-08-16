// var favData = JSON.parse(localStorage.getItem("addData"));
var userID = JSON.parse(localStorage.getItem("userID"));
// alert(userID);

var favDiv = document.getElementById("fav");

function getAll() {
    userData.map(fav => {
        fetch(`${url}/favorite/${fav}`)
            .then(x => x.json())
            .then(data => {
                // console.log(data);
                favDiv.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data._id}')">
                                        <li>
                                              <img id="myPic" src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" title="" alt="" />
                                            <section class="list-left">
                                             <h5 class="title">${data.title}</h5>
                                                <span class="adprice">Rs ${data.price}</span>
                                                  <p class="catpath">${data.discription}</p>
                                            </section>
                                            <div class="clearfix"></div>
                                        </li>
                                    </a>`
            });
    })
    // if (token) {

    // }
    // fetch(`${url}/favData`, {
    //     headers: {
    //         'x-auth': token
    //     }
    // })
    //     .then(x => x.json())
    //     .then(x => {

    //         var favData = x;
    //         console.log(favData)
    //         for (let i in favData) {
    //             fetch(`https://sylani-fa1f7.firebaseio.com/adds/${favData[i].addId}.json`)
    //                 .then(x => x.json())
    //                 .then((data) => {
    //                     favDiv.innerHTML += `<a href="JavaScript:void(0)" onclick="addPage('${data.addID}')">
    //             <li>
    //                 <img id="myPic" src="${data.image}" style="cursor: pointer;" onclick="addPage('${data.addID}')" title="" alt="" />
    //                 <section class="list-left">
    //                     <h5 class="title">${data.title}</h5>
    //                     <span class="adprice">Rs ${data.price}</span>
    //                     <p class="catpath">${data.description}</p>
    //                 </section>
    //                 <div class="clearfix"></div>
    //             </li>
    //         </a>`
    //                 })
    //                 .catch(x => console.log(x));

    //         }

    //     }
    //     );
}




function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    location.href = "/addPage"
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