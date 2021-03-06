/*jshint browser:true, undef: true, unused: true, jquery: true */
console.log("hello");
$('.quicksearch').val('');
// store filter per group
var filters = {};

// quick search regex
//search
var qsRegex;

// only used to dynamically generate items
// var data = {
//   brands: [ 'brand1', 'brand2', 'brand3', 'brand4' ],
//   productTypes: [ 'alpha', 'beta', 'gamma', 'delta' ],
//   colors: [ 'red', 'blue', 'green', 'yellow' ],
//   sizes: [ 'size8', 'size9', 'size10', 'size11' ],
// };

var $container = $('#container');
// console.log($container);

// createContent();

var $filterDisplay = $('#filter-display');

$container.isotope();

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