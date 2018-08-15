var addDiv = document.getElementById('addDiv');
window.addEventListener('load', searchAdd);


function searchAdd() {
    var addName = JSON.parse(localStorage.getItem("addToSearch"));
    var searchType = localStorage.getItem("searchType");
    console.log(addName);
    var item = addName;
    fetch(`${url}/search`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ item })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.map((add) => {
                if (searchType == null || searchType == "all") {
                    addDiv.innerHTML += `<a href='JavaScript:void(0)'>
                             <li>
                            <img onclick="addPage('${add._id}')" src=${add.image} title="" alt="" />
                            <section class="list-left">
                                <h5 class="title">${add.title}</h5>
                                <span class="adprice">Rs. ${add.price}</span>
                                <p class="catpath">${add.discription}</p>
                            </section>
                            <section class="list-right">
                                <span class="date">${add.time}</span>
                                <span class="cityname">Model: ${add.model}</span>
                            </section>
                            <div class="clearfix"></div>
                          </li>
                         </a>`
                }
                else {
                    if (searchType == add.category) {
                        addDiv.innerHTML += `<a href='JavaScript:void(0)'>
                        <li>
                            <img onclick="addPage('${add._id}')" src=${add.image} title="" alt="" />
                            <section class="list-left">
                                <h5 class="title">${add.title}</h5>
                                <span class="adprice">Rs. ${add.price}</span>
                                <p class="catpath">${add.discription}</p>
                            </section>
                            <section class="list-right">
                                <span class="date">${add.time}</span>
                                <span class="cityname">Model: ${add.model}</span>
                            </section>
                            <div class="clearfix"></div>
                             </li>
                        </a>`

                    }
                }
            });





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

function searchAdds() {
    var addToSearch = document.getElementById('searchBox').value;
    console.log(addToSearch);
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.reload();


}