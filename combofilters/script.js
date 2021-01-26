// external js: isotope.pkgd.js

// quick search regex
var qsRegex;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.item'

});

// store filter for each group
var filters = [];

// change is-checked class on buttons
$('.filters').on( 'click', 'button', function( event ) {
  var $target = $( event.currentTarget );
  $target.toggleClass('is-checked');
  var isChecked = $target.hasClass('is-checked');
  var filter = $target.attr('data-filter');
  if ( isChecked ) {
    addFilter( filter );
  } else {
    removeFilter( filter );
  }
  // filter isotope
  // group filters together, inclusive
  $grid.isotope({ filter: filters.join(',') });
});
  
function addFilter( filter ) {
  if ( filters.indexOf( filter ) == -1 ) {
    filters.push( filter );
  }
}

function removeFilter( filter ) {
  var index = filters.indexOf( filter);
  if ( index != -1 ) {
    filters.splice( index, 1 );
  }
}

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope({  //search
    filter: function() {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      return searchResult;
    },});
}) );

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

