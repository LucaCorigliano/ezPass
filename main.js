


var wikipediaDomain = "wikipedia.org"
var wikipediaSearchURL = "/w/api.php?action=query&origin=*&format=json&list=search&srlimit=1&srinfo=totalhits&srprop=&srenablerewrites=1&srsort=relevance&srsearch=";
var wikipediaGetPageURL = "/w/api.php?action=query&origin=*&format=json&prop=extracts&redirects=1&converttitles=1&explaintext=1&pageids=";

var wikipedia_languages = {
	"en" : "English",
	"simple" : "Simplified English",
	"de" : "German",
	"de" : "Deutsch",
	"fr" : "French",
	"fr" : "Français",
	"es" : "Spanish",
	"es" : "Español",
	"ru" : "Russian",
	"ru" : "русский",
	"nl" : "Dutch",
	"nl" : "Hollandske",
	"it" : "Italian",
	"pt" : "Portuguese",
}
var word_colors = ["#03c03c", "#579abe", "#976ed7", "#c23b23", "#f39a27", "#03c03c"];
var symbol_color = "#4E6B8A";
var number_color = "#F6AE2D";
var dummyPages = ["Wikipedia", "Computer", "Smartphone", "Internet", "Social Media"];
var symbols = "#@!_-.$?*";
// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
function stripHTML(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
function randomRange(min, max) {
	return Math.floor( Math.random() * (max-min)+ min );
}
function pickRandom(array) {
	return array[randomRange(0, array.length -1)];
}
new Vue({
	el: '#app',
	data: {
		language: 'en',
		page: '',
		processed_page_name : '',
		min_word_count: 2,
		word_count : 3,
		max_word_count: 5,
		available_words: [],
		loading : true,
		loading_icon : false,
		copy_icon : false,
		current_error : "",
		triggerGeneration: false,
		capitalize: true,
		add_symbols: false,
		add_numbers: false,
		picked_symbols : "",
		picked_number : 0,
		source: 'Loading...',
		
	},
	computed : {
		error : function() { return this.current_error != ""; },
		current_password : function() {
			if(this.current_error != "")
				return this.current_error;
			// Crappy workaround, still need to iron this out
			if(this.picked_words.length == 0) {
				if(this.current_error != "")
					return this.current_error
				return "";
			}
			var buffer = "";
			
			for(var i = 0; i < this.word_count; i++) {
				buffer += "<span class='password_content' style='color: " + word_colors[i] + "';>" + (this.capitalize ? this.picked_words[i].capitalize() : this.picked_words[i]) + "</span>"; 
			}
			
			
			if(this.add_numbers) {
				buffer += "<span class='password_content' style='color: " + number_color + "';>" + this.picked_number + "</span>"; 
			}
			if(this.add_symbols) {
				buffer += "<span class='password_content' style='color: " + symbol_color + "';>" + this.picked_symbols + "</span>"; 
			}
			return buffer;			
			
		},
		picked_words: function() {
			// Force a refresh when needed
			var nothing = null;
			if(this.triggerGeneration)
				nothing = 1;
			//
			
			this.triggerLoadingAnimation();
			

			
			if(this.available_words.length == 0)
				return []; // No page chosen
			if(this.available_words.length < this.max_word_count) {
				this.current_error = "Not enough words to generate a password.";
				return [];
			}
			var pickedWords = [];
			var candidate = "";
			
			for(var i = 0; i < this.max_word_count; i++) {
				var attempts = 100;
				do {
					if(--attempts <= 0)
					{
						this.current_error = "An error occurred. Try again.";
						return this.current_error;
					}
					candidate = pickRandom(this.available_words);
					console.log(candidate);
				} while (pickedWords.includes(candidate));
				pickedWords.push(candidate);
			}
			this.current_error = "";
			this.loading = false;	
			this.picked_number = randomRange(0, 999);
			this.picked_symbols = "";
			for(var i = 0; i < randomRange(1, 2); i++) {
				this.picked_symbols += pickRandom(symbols.split(''));
			}
			return pickedWords;


			
		},		
		
	},
	watch: {
		language: function() {
			this.debounced_getWikipediaPage();
		},
		page: function() {
			this.debounced_getWikipediaPage();
			this.updateInputSize();
		},
		loading : function(oldV, newV) {
			if(!oldV && newV)
				this.triggerLoadingAnimation();
		},

		
	},
	created: function() {
		this.debounced_getWikipediaPage = _.debounce(this.searchWikipedia, 300);
		this.debounced_copy = _.debounce(this.copy, 300);
		this.page = pickRandom(dummyPages);
	},

	methods: {
		getTickText : function(i) {
			return i;
		},
		triggerCopyAnimation : function() {
			this.copy_icon = true;
			var vm = this;
			setTimeout(function() {
				vm.copy_icon = false;
			}, 1000);
		},
		triggerLoadingAnimation : function() {
			this.loading_icon = true;
			var vm = this;
			setTimeout(function() {
				vm.loading_icon = false;
			}, 300);
		},
		copy : function(e) {
			this.triggerCopyAnimation();
			if(this.current_error != "" || this.picked_words.length == 0)
				return ;
			var buffer = "";
			
			for(var i = 0; i < this.word_count; i++) {
				buffer +=  (this.capitalize ? this.picked_words[i].capitalize() : this.picked_words[i]) ;
			}
			
			
			if(this.add_numbers) {
				buffer += this.picked_number;
			}
			if(this.add_symbols) {
				buffer += this.picked_symbols; 
			}
			copyToClipboard(buffer);
		},
		updateInputSize : function() {
			el = jQuery("input#wikipedia_search");
			
			var width =  el.val().length * 0.61;
			
			el.css("width", width + "em");
		},
		generatePassword : function() {
			this.triggerGeneration = !this.triggerGeneration;
		},
		submitPage : function(e) {
			this.generatePassword();
			e.preventDefault(true);
		},
		
		onError : function(error) {
			this.current_error = error;
		},
		processPage : function(rawData) {
		  console.log(rawData);
		  if(!rawData.data.hasOwnProperty('query')) {
			  this.onError("Try another topic.");
			  return;
		  }
		  for(key in rawData.data.query.pages) {
			if(key == -1)
			{
			   this.onError("Try another topic.");
			   return;
			}
			this.processed_page_name = rawData.data.query.pages[key].title;
			this.source = "<a href='https://" + this.language + "." + wikipediaDomain + "/wiki/" + encodeURI(this.processed_page_name) + "' target='_blank'>" + this.processed_page_name + "</a>";
			var data = rawData.data.query.pages[key].extract
				.trim()
				.split('\r').join(' ') // Remove lines
				.split('\n').join(' ') // Remove lines
				.split('\t').join(' ') // Remove tabs
				.replace(/[^a-zA-Z]/g,' ')
				.split(' ');
			for(var i = data.length; i-- > 0;) 
				if(data[i].length < 4)
					data.splice(i, 1);
				else
					data[i] = data[i].replace(/\s/g,'').toLowerCase()
			this.current_error = "";
			this.available_words = data;
		  };
		},
		processSearch : function(rawData) {
			if(!rawData.data.hasOwnProperty('query') || rawData.data.query.searchinfo.totalhits <= 0) {
			  this.onError("Try another topic.");
			  return;				
			}
			var pageID = rawData.data.query.search[0].pageid;
			var vm = this;
			axios.get("https://" + this.language + "." + wikipediaDomain +  wikipediaGetPageURL + pageID)
			.then(function(response){
				
				vm.processPage(response)
				
			})
			.catch(function(error)  {vm.onError(error);});			
		},
		searchWikipedia: function (){
			this.loading = true;
			this.current_error = "";
	
			if(!this.page.trim()) {
				this.current_error = "Please pick a topic.";
				return;
			}
			
			this.processed_page_name = "Loading...";
			this.available_words = [];
			var vm = this;
			axios.get("https://" + this.language + "." + wikipediaDomain +  wikipediaSearchURL + encodeURI(this.page.trim()))
			.then(function(response){
				
				vm.processSearch(response)
				
			})
			.catch(function(error)  {vm.onError(error);});
		}//
	}
});

