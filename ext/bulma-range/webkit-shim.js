// THANKS WEBKIT
function refreshFillPerc(el) {
var val = $(el).val();
var min = $(el).attr('min');
var max = $(el).attr('max');
val -= min;
max -= min;
if(!max) max = 100;
var prc = (val/max)*100 + 0.5;
$(el).css('--bgFillPerc', prc + '%');
$(el).css('--bgFillPerc', prc + '%');
}
$(document).ready(function() {
  

  $('.range_wrapper input[type=range]').on('input', function () {
      refreshFillPerc(this);
  });
  $('.range_wrapper input[type=range]').each(function(i) {  refreshFillPerc(this); })
  
});