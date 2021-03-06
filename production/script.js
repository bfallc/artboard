//SCRIPT.JS BELOW////////
console.log("this is script.js [isotope]");

// clears search box on page load
$('.quicksearch').val('');

// store filter per group
var filters = {};

// quick search regex
var qsRegex;

var $container = $('#container');

//ATTEMPT TO RELOAD ISOTOPE AFTER JSON CONTENT IS LOADED 
// jQuery(document).ready(checkContainer);

// function checkContainer () {
//   if($('#end').is(':visible')){ //if the container is visible on the page
//     $container.isotope({
//       itemSelector: '.item',
//       //fit rows layout mode for testing instead of masonry
//       layoutMode: 'fitRows',
//     });
//     console.log("end loaded");
//   } else {
//     setTimeout(checkContainer, 100); //wait 50 ms, then try again
//   }
// }
//works but didn't solve issue...



//SORT - part 1
//initialization (can't be added above 'cause that's for imagesLoaded only)
$container = $('#container').isotope({
  itemSelector: '.item',
  getSortData: {
    firstname: function( itemElem ) {
      //find the text within the class
      var name = $( itemElem ).find('.firstname').text();
      //make lowercase to sort better
      return name.toLowerCase();
    },

    lastname: function( itemElem ) {
      var lastname = $( itemElem ).find('.lastname').text();
      //if there is no lastname (artist group), use the firstname instead
      if(lastname == ""){
        lastname = $( itemElem ).find('.firstname').text();
      }
      return lastname.toLowerCase();
    },

    title: function( itemElem ) {
      var title = $( itemElem ).find('.title').text();
      return title.toLowerCase();
    },

    year: function( itemElem ) {
      var year = $( itemElem ).find('.year').text();
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
var sortOrder = true;

$('.sort-by-button-group').on( 'click', 'button', function() {
  var sortValue = $(this).attr('data-sort-by');

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

// createContent();

generateContent();


var $filterDisplay = $('#filter-display');

// $container.isotope();




// do stuff when checkbox change
$('#options').on( 'change', function( event ) {
  console.log("clicked");
  $('.quicksearch').val('');

  var checkbox = event.target;
  var $checkbox = $( checkbox );
  var group = $checkbox.parents('.option-set').attr('data-group');
  // create array for filter group, if not there yet
  var filterGroup = filters[ group ];
  console.log(filterGroup);
  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }
  // add/remove filter
  if ( checkbox.checked ) {
    // add filter
    filterGroup.push( checkbox.value );
  } else {
    // remove filter
    var index = filterGroup.indexOf( checkbox.value );
    filterGroup.splice( index, 1 );
  }
  
  var comboFilter = getComboFilter();
  $container.isotope({ filter: comboFilter });
  // $filterDisplay.text( comboFilter );
});



function getComboFilter() {

  
  var combo = [];
  for ( var prop in filters ) {
    var group = filters[ prop ];
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
    var nextCombo = [];
    // split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
    for ( var i=0; i < combo.length; i++ ) {
      for ( var j=0; j < group.length; j++ ) {
        var item = combo[i] + group[j];
        nextCombo.push( item );
      }
    }
    combo = nextCombo;
  }
  var comboFilter = combo.join(', ');
  return comboFilter;
}

// var $container = $('#container').isotope({
//   itemSelector: '.item',
//   filter: function() {
//     var $this = $(this);
//     var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
//     return searchResult;
//   },
// });

//search
// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  
  $('input:checked').prop("checked", false);
  
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $container.isotope({
    itemSelector: '.item',
    filter: function() {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      return searchResult;
    },
  });
}) );

//search
// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}

// helper made to make items
// function createContent() {
//   var brand, productType, color, size;
//   var items = '';
//   // dynamically create content
//   for (var i=0, len1 = data.brands.length; i < len1; i++) {
//     brand = data.brands[i];
//     for (var j=0, len2 = data.productTypes.length; j < len2; j++) {
//       productType = data.productTypes[j];
//         for (var l=0, len3 = data.colors.length; l < len3; l++) {
//         color = data.colors[l];
//         for (var k=0, len4 = data.sizes.length; k < len4; k++) {
//           size = data.sizes[k];
//           var itemHtml = '<div class="item ' + brand + ' ' +
//             productType + ' ' + color + ' ' + size + '">' +
//             '<p>' + brand + '</p>' +
//             '<p>' + productType + '</p>' +
//             '<p>' + size + '</p>' +
//             '</div>';
//             items += itemHtml;
//         }
//       }
//     }
//   }

//   $container.append( items );
// }

function generateContent() {

    // fetch api used to avoid CORS problems in a local (non-server) deployment. Edit: wrong! Still doesn't work.
  fetch('art.json').then(response => {
    //get file contents
    return response.json();
  }).then(data => {
    // Work with JSON data here

    //define target div by id 
    // var div = document.getElementById('container');
    
    //log number of entries
    console.log("number of entries: " + data.length);
    //log json arrays to console
    console.log(data);

    generateMediumCheckboxes();
    generateTopicCheckboxes();
    generateDecadeCheckboxes();
    
    //generate data divs within grid container
    for(var i = 0; i < data.length; i++) {

      var $newItem = $(
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
  var decadeGroup = `<div id="decade" class="option-set" data-group="decade"></div>`

  $('#options').append(decadeGroup);
  
  // find all unique checkboxes
  var checkboxNames = [];
  for(var i = 0; i < data.length; i++) {
    var currDecade = data[i].decade;
    if(checkboxNames.indexOf(currDecade) == -1) {
      checkboxNames.push(currDecade);
    }
  }
  checkboxNames.sort();
  // generate html
  for(var i = 0; i < checkboxNames.length; i++) {
    let checkbox = `<label><input type="checkbox" value=".${checkboxNames[i]}" />${checkboxNames[i]}</label>`
    $("div[data-group='decade']").append(checkbox);
  }
}


function generateTopicCheckboxes() {
  var topicGroup = `<div id="topic" class="option-set" data-group="topic"></div>`
  $('#options').append(topicGroup);

  // var checkboxWords = [];
  var checkboxNames = [];
  for(var i = 0; i < data.length; i++) {
    var word = data[i].topic.split(" ");
    // find all unique checkboxes

    for(var j = 0; j < word.length; j++) {
      if(checkboxNames.indexOf(word[j]) == -1) {
        checkboxNames.push(word[j]);
      }
    }
  }

  checkboxNames.sort();
  // generate html
  for(var i = 0; i < checkboxNames.length; i++) {
    let checkbox = `<label><input type="checkbox" value=".${checkboxNames[i]}" />${checkboxNames[i]} </label>`
    $("div[data-group='topic']").append(checkbox);
  }
}

function generateMediumCheckboxes() {
  var mediumGroup = `<div id="medium" class="option-set" data-group="medium"></div>`
  $('#options').append(mediumGroup);

  // var checkboxWords = [];
  var checkboxNames = [];
  for(var i = 0; i < data.length; i++) {
    var word = data[i].medium.split(" ");
    // find all unique checkboxes

    for(var j = 0; j < word.length; j++) {
      if(checkboxNames.indexOf(word[j]) == -1) {
        checkboxNames.push(word[j]);
      }
    }
  }

  checkboxNames.sort();
  // generate html
  for(var i = 0; i < checkboxNames.length; i++) {
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



