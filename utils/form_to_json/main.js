// Load the JSON

fetch('../../production/art.json').then(response => {
  //get file contents
  return response.json();
}).then(data => {

  // loop through the array of objects (each object is information about an art work)
  for(let i = 0; i < data.length; i++) {
    
    // store the current object
    let entry = data[i];

    // we need to know the number of properties in the object in order to avoid adding a comma at the end of the last object. numProperties stores the number of keys (properties) in the object.
    let numProperties = (Object.keys(entry).length);
    let propCounter = 0;

    // construct a formatted string that displays the contents of the object
    let formattedEntry;

    // only add an opening bracket at the beginning
    if(i == 0) {
      formattedEntry =`[<div class='entry'><span class="bracket">{</span>`;
    } else {
      formattedEntry =`<div class='entry'><span class="bracket">{</span>`;
    }

    // "loop" through each property in the current object
    for (const property in entry) {
      //console.log(property, entry[property]);
      formattedEntry+=
        `<p class="line">
            <span class='${property} property'>"${property}":</span> <span class='content'>"${entry[property]}"</span>
        `
        // only add a comma if not the last property
        if(propCounter < numProperties-1) {
          formattedEntry+=',</p>';
        } else {
          formattedEntry+='</p>';
        }
        propCounter++;
    }
    if(i < data.length-1) {
      formattedEntry+=`<span class="bracket">}</span>,</div>`;
    } else {
      formattedEntry+=`<span class="bracket">}</span></div>]`;
    }
    $('.container').append(formattedEntry);
  }

  // $('.entry').append(`<div class="copy">copy</div>`)
  $('.entry').append(`<div class="delete">&#10005</div>`)

  $('.delete').click(function(){
    $(this).parent().animate({
      opacity: 0,
      fontSize: "0px"
    }, 500, function(){
      $(this).hide();
    })
  })

let fileName =  'art_updated.json'; // You can use the .txt extension if you want

// https://stackoverflow.com/questions/22084698/how-to-export-source-content-within-div-to-text-html-file
function downloadJSON(filename, elId, mimeType) {
    let elHtml = document.getElementById(elId).innerText;
    let link = document.createElement('a');
    mimeType = mimeType || 'text/json';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}


  $('.download').click(function(){
    downloadJSON(fileName, 'container', 'text/json');
  })

  $('.entry-form__close').click(function(){
    $('#entry-form').hide();
  });

  $('.entry-submit').click(function(){
    addNewEntry();
  })

  function addNewEntry() {
    
    // TODO: swap out any double quotes in the entry field with
    // &quot.

    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let title = $('#title').val();
    let year = $('#year').val();
    let description = $('#description').val();
    let link = $('#link').val();
    let thumb = $('#thumb').val();
    let medium = $('#medium').val();
    let topic = $('#topic').val();
    let decade = $('#decade').val();
    let movement = $('#movement').val();
    let keywords = $('#keywords').val();

    let entry = `
      <div class="entry">{
        <p class="line">
          <span class='firstname property'>"firstname":</span> <span class='content'>"${firstname}"</span>
        </p>
        <p class="line">
          <span class='lastname property'>"lastname":</span> <span class='content'>"${lastname}"</span>
        </p>
        <p class="line">  
          <span class='title property'>"title":</span> <span class='content'>"${title}"</span>
        </p>
        <p class="line">  
          <span class='year property'>"year":</span> <span class='content'>"${year}"</span>
        </p>
        <p class="line">  
          <span class='description property'>"description":</span> <span class='content'>"${description}"</span>
        </p>
        <p class="line">  
          <span class='link property'>"link":</span> <span class='content'>"${link}"</span>
        </p>
        <p class="line">  
          <span class='thumb property'>"thumb":</span> <span class='content'>"${thumb}"</span>
        </p>
        <p class="line">  
          <span class='medium property'>"medium":</span> <span class='content'>"${medium}"</span>
        </p>
        <p class="line">  
          <span class='topic property'>"topic":</span> <span class='content'>"${topic}"</span>
        </p>
        <p class="line">  
          <span class='decade property'>"decade":</span> <span class='content'>"${decade}"</span>
        </p>
        <p class="line">  
          <span class='movement property'>"movement":</span> <span class='content'>"${movement}"</span>
        </p>
        <p class="line">  
          <span class='keywords property'>"keywords":</span> <span class='content'>"${keywords}"</span>
        </p>
        <p class="line">
        } 
      </div>
    `

    $('#container .entry:last-child').after(entry);
    
  }

  // $('.copy').on('click', function(){
  
  //   let temp = $("<input>");
  //   $("body").append(temp);
  //   temp.val($(this).parent().text());
  //   let text = temp.val();

  //   let clickedText = $(this).parent().text();
  //   let lastEntry = $('.entries .entry:last-child').text()
  //   if(clickedText == lastEntry) {
  //     text = text.slice(0, text.length-5);
  //   } else {
  //     text = text.slice(0, text.length-6);
  //   }

  //   text = text.trim();
    
  //   temp.val(text).select();
    
  //   document.execCommand("copy");
  //   temp.remove();
  // });
})









