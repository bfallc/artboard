//SCRIPT.JS BELOW////////
console.log("this is script.js [isotope]");

// clears search box on page load
$('.quicksearch').val('');

// store filter per group
let filters = {};

// quick search regex
let qsRegex;
let $container = $('#container');

//SORT - part 1
//initialization (can't be added above 'cause that's for imagesLoaded only)
$container = $('#container').isotope({
  itemSelector: '.item',
  getSortData: {
    firstname: function( itemElem ) {
      //find the text within the class
      let name = $( itemElem ).find('.firstname').text();
      //make lowercase to sort better
      return name.toLowerCase();
    },

    lastname: function( itemElem ) {
      let lastname = $( itemElem ).find('.lastname').text();
      //if there is no lastname (artist group), use the firstname instead
      if(lastname == ""){
        lastname = $( itemElem ).find('.firstname').text();
      }
      return lastname.toLowerCase();
    },

    title: function( itemElem ) {
      let title = $( itemElem ).find('.title').text();
      return title.toLowerCase();
    },

    year: function( itemElem ) {
      let year = $( itemElem ).find('.year').text();
      //if no year, make it 0000
      if(year == ""){
        year = "0000";
      }
      //use just the first 4 char in case of multi years
      firstYear = year.substring(0,4);
      return firstYear;
    },
  }
});

// SORT - part2
//button clicking
let sortOrder = true;

$('.sort-by-button-group').on( 'click', 'button', function() {
  let sortValue = $(this).attr('data-sort-by');

  if(sortValue == "random"){
    $container.isotope('shuffle');
  } else {
    $container.isotope({ 
      sortBy: sortValue,
      sortAscending: sortOrder
    });
    //flip-flop between ascending and descending modes on each click
    sortOrder = !sortOrder;
  }

});

generateContent();


let $filterDisplay = $('#filter-display');

// do stuff when checkbox change
$('#options').on( 'change', function( event ) {
  console.log("clicked");
  $('.quicksearch').val('');

  let checkbox = event.target;
  let $checkbox = $( checkbox );
  let group = $checkbox.parents('.option-set').attr('data-group');
  // create array for filter group, if not there yet
  let filterGroup = filters[ group ];
  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }
  // add/remove filter
  if ( checkbox.checked ) {
    // add filter
    filterGroup.push( checkbox.value );
  } else {
    // remove filter
    let index = filterGroup.indexOf( checkbox.value );
    filterGroup.splice( index, 1 );
  }
  
  let comboFilter = getComboFilter();
  $container.isotope({ filter: comboFilter });
});


function getComboFilter() {
  let combo = [];
  for ( let prop in filters ) {
    let group = filters[ prop ];
    if ( !group.length ) {
      // no filters in group, carry on
      continue;
    }
    // add first group
    if ( !combo.length ) {
      combo = group.slice(0);
      continue;
    }
    // add additional groups
    let nextCombo = [];
    // split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
    for ( let i=0; i < combo.length; i++ ) {
      for ( let j=0; j < group.length; j++ ) {
        let item = combo[i] + group[j];
        nextCombo.push( item );
      }
    }
    combo = nextCombo;
  }
  let comboFilter = combo.join(', ');
  return comboFilter;
}

/////////////// SEARCH
// use value of search field to filter
let $quicksearch = $('.quicksearch').keyup( debounce( function() {
  
  $('input:checked').prop("checked", false);

  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $container.isotope({
    itemSelector: '.item',
    filter: function() {
      let $this = $(this);
      let searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      return searchResult;
    },
  });
}) );

// debounce so filtering doesn't happen every millisecond while searching
function debounce( fn, threshold ) {
  let timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    let args = arguments;
    let _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}

function generateContent() {

    // fetch api used to avoid CORS problems in a local (non-server) deployment. Edit: wrong! Still doesn't work.
  fetch('art.json').then(response => {
    //get file contents
    return response.json();
  }).then(data => {
    // Work with JSON data here

    //define target div by id 
    // let div = document.getElementById('container');
    
    //log number of entries
    console.log("number of entries: " + data.length);
    //log json arrays to console
    console.log(data);

    generateMediumCheckboxes();
    generateTopicCheckboxes();
    generateDecadeCheckboxes();
    
    //generate data divs within grid container
    for(let i = 0; i < data.length; i++) {

      let $newItem = $(
        `<div class='item ${data[i].medium} ${data[i].topic} ${data[i].decade} ${data[i].movement}'>
          <a href='project_page.html?id=${data[i].id}' target='_blank'><img class=image src='images/${data[i].image1}'></a>
          <div class="item__text">
            <p class='titlebar'><span class='firstname'>${data[i].firstname}</span> <span class='lastname'>${data[i].lastname}</span> - <span class='title'>${data[i].title}</span> (<span class='year'>${data[i].year}</span>)</p>
            <p class='description'>${data[i].description}</p>
            <p class='externallink'><a href=${data[i].link} target='_blank'>[external link]</a></p>
            <p class='keywords'>${data[i].keywords}</p>
          </div>
        </div>`);

      // $container.append( $newItem ).isotope( 'appended', $newItem );    
      $container.isotope( 'insert', $newItem );    
    }

//////////////// FUNCTIONS

function generateDecadeCheckboxes() {
  let decadeGroup = `<div id="decade" class="option-set" data-group="decade"></div>`

  $('#options').append(decadeGroup);
  
  // find all unique checkboxes
  let checkboxNames = [];
  for(let i = 0; i < data.length; i++) {
    let currDecade = data[i].decade;
    if(checkboxNames.indexOf(currDecade) == -1) {
      checkboxNames.push(currDecade);
    }
  }
  checkboxNames.sort();
  // generate html
  for(let i = 0; i < checkboxNames.length; i++) {
    let checkbox = `<label><input type="checkbox" value=".${checkboxNames[i]}" />${checkboxNames[i]}</label>`
    $("div[data-group='decade']").append(checkbox);
  }
}

function generateTopicCheckboxes() {
  let topicGroup = `<div id="topic" class="option-set" data-group="topic"></div>`
  $('#options').append(topicGroup);

  // let checkboxWords = [];
  let checkboxNames = [];
  for(let i = 0; i < data.length; i++) {
    let word = data[i].topic.split(" ");
    // find all unique checkboxes

    for(let j = 0; j < word.length; j++) {
      if(checkboxNames.indexOf(word[j]) == -1) {
        checkboxNames.push(word[j]);
      }
    }
  }

  checkboxNames.sort();
  // generate html
  for(let i = 0; i < checkboxNames.length; i++) {
    let checkbox = `<label><input type="checkbox" value=".${checkboxNames[i]}" />${checkboxNames[i]} </label>`
    $("div[data-group='topic']").append(checkbox);
  }
}

function generateMediumCheckboxes() {
  let mediumGroup = `<div id="medium" class="option-set" data-group="medium"></div>`
  $('#options').append(mediumGroup);

  // let checkboxWords = [];
  let checkboxNames = [];
  for(let i = 0; i < data.length; i++) {
    let word = data[i].medium.split(" ");
    // find all unique checkboxes

    for(let j = 0; j < word.length; j++) {
      if(checkboxNames.indexOf(word[j]) == -1) {
        checkboxNames.push(word[j]);
      }
    }
  }

  checkboxNames.sort();
  // generate html
  for(let i = 0; i < checkboxNames.length; i++) {
    let checkbox = `<label><input type="checkbox" value=".${checkboxNames[i]}" />${checkboxNames[i]} </label>`
    $("div[data-group='medium']").append(checkbox);
  }
}
    
  //call isotope init after all images are loaded (isotope trouble spot)
  $container = $('#container').imagesLoaded( function() {
    $container.isotope({
      itemSelector: '.item',
      //fit rows layout mode for testing instead of masonry
      // layoutMode: 'fitRows', 
      masonry: {
        //make sure boxes are always sorted left to right even if rows don't align height perfectlye
        horizontalOrder: true
      }
    });
  });

    console.log("done generating content");

  }).catch(err => {
    // Do something for an error here
    console.log("there was an error");
  }); //end
}



