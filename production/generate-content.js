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
  // console.log(data);
  
  //generate data divs within grid container
  for(var i = 0; i < data.length; i++) {
    div.innerHTML = div.innerHTML +
      `<div class='item ${data[i].medium} ${data[i].topic} ${data[i].decade} ${data[i].movement}'>
          <a href='images/${data[i].image}' target='_blank'>
          <img class=image src='images/${data[i].image}'></a>
          <div class="item__text">
            <p class='titlebar'><span class='firstname'>${data[i].firstname}</span> <span class='lastname'>${data[i].lastname}</span> - <span class='title'>${data[i].title}</span> (<span class='year'>${data[i].year}</span>)</p>
            <p class='description'>${data[i].description}</p>
            <p class='externallink'><a href=${data[i].link} target='_blank'>[external link]</a></p>
            <p class='keywords'>${data[i].keywords}</p>
          </div>
        </div>`;

        
  }
  //possible last div for form stuff
  div.innerHTML = div.innerHTML + `<div class='item' id='end'><form action="/action_page.php">
  <input type="text" id="ffirstname" name="fname" value="first name"><br>
  <input type="text" id="flastname" name="lname" value="last name"><br>
  <input type="text" id="ftitle" name="title" value="title"><br>
  <input type="text" id="fyear" name="year" value="year"><br>
  <input type="text" id="fdescription" name="description" value="description"><br>
  <input type="text" id="fmedium" name="mediums" value="mediums"><br>
  <input type="text" id="ftopics" name="topics" value="topics"><br>
  <input type="text" id="fkeywords" name="keywords" value="keywords"><br>
  <input type="text" id="fmovement" name="movement" value="movement"><br>
  <input type="file" id="myFile" name="filename"><br><br>
  <input type="submit" value="Submit">
</form> </div>`;

  console.log("done generating content");

}).catch(err => {
  // Do something for an error here
  console.log("there was an error");
}); //end