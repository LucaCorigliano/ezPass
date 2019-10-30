window.ezPass.utils = {
  capitalize : function(t) {
      return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  },
  randomRange : function(min, max) {
  	return Math.floor( Math.random() * (max-min)+ min );
  },
  pickRandom : function(array) {
  	return array[this.randomRange(0, array.length -1)];
  }
};
