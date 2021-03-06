// Load the JSON
let entryCounter = 0;

fetch('../../production2/art.json').then(response => {
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
      formattedEntry =`[<div class='entry'><div class="counter">${entryCounter}</div><span class="bracket">{</span>`;
    } else {
      formattedEntry =`<div class='entry'><div class="counter">${entryCounter}</div><span class="bracket">{</span>`;
    }

    // "loop" through each property in the current object
    for (const property in entry) {
      //console.log(property, entry[property]);
      let currContent = entry[property];
      if(property == "description") {
        if(currContent.indexOf(`\"`) != -1) {
          currContent = currContent.replace(/"/g, `\\"`);
        }
      }
      formattedEntry+=
        `<p class="line">
            <span class='${property} property'>"${property}":</span> <span class='content'>"${currContent}"</span>
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
      formattedEntry+=`<span class="bracket">},</span></div>`;
    } else {
      formattedEntry+=`<span class="bracket">}</span></div>]`;
    }
    $('.container').append(formattedEntry);
    entryCounter++;
  }

  // $('.entry').append(`<div class="copy">copy</div>`)
  $('.entry').append(`<div class="delete">&#10005</div>`)

  $('.delete').click(function(){
    $(this).parent().animate({
      opacity: 0,
      fontSize: "0px"
    }, 500, function(){
      $(this).remove();
      $('.bracket').last().text('}');
    })
  })

let fileName =  'art.json'; // You can use the .txt extension if you want

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
    $('.counter').hide();
    downloadJSON(fileName, 'container', 'text/json');
    $('.counter').show();
  })

  $('.add_json').click(function(){
    $('#entry-form').css('display', 'flex');
  })

  $('.entry-form__close').click(function(){
    $('#entry-form').hide();
  });

  $('.entry-submit').click(function(){
    addNewEntry();
    $('#entry-form').hide();
    $('html, body').animate({
      scrollTop: $(document).height()
    }, 500);
  })

  function addNewEntry() {
    
    // add comma to end of previous entry
    $('.bracket').last().text('},');


    // TODO: swap out any double quotes in the entry field with
    // &quot.

    
    let id = ""+(Math.floor(Date.now()/1000));
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let title = $('#title').val();
    let year = $('#year').val();
    let description = $('#description').val();
    
    // Automatically adds escape character to any instances of double quotes in the description.
    if(description.indexOf(`\"`) != -1) {
      description = description.replace(/"/g, `\\"`);
    }

    let link = $('#link').val();
    let image1 = $('#image1').val();
    let image2 = $('#image2').val();
    let image3 = $('#image3').val();
    let video = $('#video').val();
    let medium = $('#medium').val();
    let topic = $('#topic').val();
    let decade = $('#decade').val();
    let movement = $('#movement').val();
    let addedby = $('#addedby').val();
    let keywords = $('#keywords').val();
    
    console.log(entryCounter);
    let entry = `
      <div class="entry">
      <div class="counter">${entryCounter}</div>
      <span class='bracket'>{</span>
        <p class="line">
          <span class='id property'>"id":</span> <span class='content'>"${id}",</span>
        </p>
        <p class="line">
          <span class='firstname property'>"firstname":</span> <span class='content'>"${firstname}",</span>
        </p>
        <p class="line">
          <span class='lastname property'>"lastname":</span> <span class='content'>"${lastname}",</span>
        </p>
        <p class="line">  
          <span class='title property'>"title":</span> <span class='content'>"${title}",</span>
        </p>
        <p class="line">  
          <span class='year property'>"year":</span> <span class='content'>"${year}",</span>
        </p>
        <p class="line">  
          <span class='description property'>"description":</span> <span class='content'>"${description}",</span>
        </p>
        <p class="line">  
          <span class='link property'>"link":</span> <span class='content'>"${link}",</span>
        </p>
        <p class="line">  
          <span class='image2 property'>"image1":</span> <span class='content'>"${image1}",</span>
        </p>
        <p class="line">  
          <span class='image3 property'>"image2":</span> <span class='content'>"${image2}",</span>
        </p>
        <p class="line">  
          <span class='image3 property'>"image3":</span> <span class='content'>"${image3}",</span>
        </p>
        <p class="line">  
          <span class='video property'>"video":</span> <span class='content'>"${video}",</span>
        </p>
        <p class="line">  
          <span class='medium property'>"medium":</span> <span class='content'>"${medium}",</span>
        </p>
        <p class="line">  
          <span class='topic property'>"topic":</span> <span class='content'>"${topic}",</span>
        </p>
        <p class="line">  
          <span class='decade property'>"decade":</span> <span class='content'>"${decade}",</span>
        </p>
        <p class="line">  
          <span class='movement property'>"movement":</span> <span class='content'>"${movement}",</span>
        </p>
        <p class="line">  
          <span class='addedby property'>"addedby":</span> <span class='content'>"${addedby}",</span>
        </p>
        <p class="line">  
          <span class='keywords property'>"keywords":</span> <span class='content'>"${keywords}"</span>
        </p>
        <span class='bracket'>}</span>
      </div>
    `

    $('#container .entry:last-child').after(entry);

    $('#firstname').val("");
    $('#lastname').val("");
    $('#title').val("");
    $('#year').val("");
    $('#description').val("");
    $('#link').val("");
    $('#image1').val("");
    $('#image2').val("");
    $('#image3').val("");
    $('#video').val("");
    $('#medium').val("");
    $('#topic').val("");
    $('#decade').val("");
    $('#movement').val("");
    $('#addedby').val("");
    $('#keywords').val("");

    entryCounter++;
  }

  // click on content, hide the content, add text box in its place.
  let currThing = 0;
  $('.content').click(function(){
    if(currThing != 0) {
      currThing.show();
    }
    currThing = $(this);
    $('#editFormInput').remove();
    
    let currentContent = $(this).text();
    let inputForm = `<input type="text" value=${currentContent} id="editFormInput">`
    $(this).parent().append(inputForm);

    $('#editFormInput').on('keypress', function (e) {
      if(e.which === 13){

        console.log('enter happened')
        console.log("this.parent: ", $(this).parent())

        currentContent = $(this).val();

        $(this).parent().children('.content').text(`"${currentContent}"`).show();
        $(this).remove();
        //  //Disable textbox to prevent multiple submit
        //  $(this).attr("disabled", "disabled");

        //  //Do Stuff, submit, etc..

        //  //Enable the textbox again if needed.
        //  $(this).removeAttr("disabled");
      }
    });

    $(this).hide();
  })

  //// tried to create a function to copy an individual json entry. Didn't quite work, wasn't that useful anyway, but here it is...

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









