
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }                                                                                                                

    return await response.json();
  }

document.addEventListener("contextmenu", async function(e) {
    if(e.button === 2){
        var text = window.getSelection().toString()
        var ret = await searchWikipedia(text)

        if(ret.query.search.length > 0){
            // console.log(ret.query.search)
            // alert(ret.query.search[0].snippet)
            const parent = document.createElement("div")
            parent.style.position = "relative"

            const modal = document.createElement("dialog");
            modal.setAttribute(
            "style",`
            top: 0;
            right: 0;
            height:300px;
            width:600px;
            border: none;
            border-radius:20px;
            background-color:white;
            position: absolute; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
            color: black;
            `
            );
            modal.innerHTML = `
            <div style="padding-top: 20px"><h2><b>Wordictle Definition</b></h2><h3>"${text}"</h3>${ret.query.search[0].snippet}</div>
            <br />
            <i>Sourced by Wikipedia & S.J.K.</i>
            <div style="position:absolute; top:0px; left:5px;">
            <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
            </div>`;
            parent.appendChild(modal)
            document.body.appendChild(modal);
            const dialog = document.querySelector("dialog");
dialog.showModal();

dialog.querySelector("button").addEventListener("click", () => {
dialog.close();
modal.remove()
});
        }
    }
}, false)
