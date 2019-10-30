// THANKS WEBKIT
function refreshFillPerc(el) {
  var val = el.value;
  var min = el.getAttribute('min');
  var max = el.getAttribute('max');
  val -= min;
  max -= min;
  if(!max) max = 100;
  var prc = (val/max)*100 + 0.5;
  el.style.setProperty('--bgFillPerc', prc + '%');
  el.style.setProperty('--bgFillPerc', prc + '%');
}


document.querySelectorAll(".range_wrapper input[type=range]").forEach(function(el) {
  this.addEventListener('input', function (evt) {
    refreshFillPerc(el);
  });
  refreshFillPerc(el);
});
