// external js: isotope.pkgd.js

// store filter for each group
var buttonFilters = {};
var buttonFilter;
// quick search regex
var qsRegex;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.item',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  },
});

$('.filters').on( 'click', '.button', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  buttonFilters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  buttonFilter = concatValues( buttonFilters );
  // Isotope arrange
  $grid.isotope();
  // $grid.isotope({ filter: filters.join(',') });
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}) );

// change is-checked class on buttons

//for loop
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
   
    // //--find the currently checked button, and uncheck it
      // $target.toggleClass('is-checked');

    //--find the currently checked button, and uncheck it
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    //--make this button 'checked'
    $( this ).addClass('is-checked');
  
  });
});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

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

//---


// // store filter for each group
// var filters = [];

// // change is-checked class on buttons
// $('.filters').on( 'click', 'button', function( event ) {
//   var $target = $( event.currentTarget );
//   $target.toggleClass('is-checked');
//   var isChecked = $target.hasClass('is-checked');
//   var filter = $target.attr('data-filter');
//   if ( isChecked ) {
//     addFilter( filter );
//   } else {
//     removeFilter( filter );
//   }
//   // filter isotope
//   // group filters together, inclusive
//   $grid.isotope({ filter: filters.join(',') });
// });
  
// function addFilter( filter ) {
//   if ( filters.indexOf( filter ) == -1 ) {
//     filters.push( filter );
//   }
// }

// function removeFilter( filter ) {
//   var index = filters.indexOf( filter);
//   if ( index != -1 ) {
//     filters.splice( index, 1 );
//   }
// }
