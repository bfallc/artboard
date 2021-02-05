// fetch api used to avoid CORS problems in a local (non-server) deployment. Edit: wrong! Still doesn't work.
fetch('art.json').then(response => {
  //get file contents
  return response.json();
}).then(data => {
  // Work with JSON data here

  //define target div by id 
  var div = document.getElementById('container');
  
  //log number of entries
  console.log("number of entries: " + data.length);
  //log json arrays to console
  console.log(data);
  
  //generate data divs within grid container
  for(var i = 0; i < data.length; i++) {
    div.innerHTML = div.innerHTML +
      `<div class='item ${data[i].medium} ${data[i].topic} ${data[i].decade} ${data[i].movement}'>
          <a href='${data[i].image} target='_blank'>
          <img class=image src='images/${data[i].image}'></a>
          <div class="item__text">
            <p class='title'>${data[i].firstname} ${data[i].lastname} - ${data[i].title} (${data[i].year})</p>
            <p class='description'>${data[i].description}</p>
            <p class='externallink'><a href=${data[i].link} target='_blank'>[external link]</a></p>
          </div>
        </div>`;
  }

}).catch(err => {
  // Do something for an error here
  console.log("there was an error");
}); //end