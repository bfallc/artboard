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
      console.log(property, entry[property]);
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
    $('.entry').append(`<div class="delete">&#10005</div>`)
  }

  $('.delete').click(function(){
    $(this).parent().animate({
      opacity: 0,
      fontSize: "0px"
    }, 500, function(){
      console.log($(this).parent());
      $(this).hide();
    })
    console.log('clicked');
  })
})


show();

//

$('.copy').on('click', copyToClipboard);

function copyToClipboard() {
  let temp = $(".container");
  $("body").append(temp);
  temp.val($(this).text()).select();
  document.execCommand("copy");
  temp.remove();
}


