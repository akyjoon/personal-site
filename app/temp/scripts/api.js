/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _audiojungle = __webpack_require__(1);

	var _audiojungle2 = _interopRequireDefault(_audiojungle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var portfolio = new _audiojungle2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Portfolio = function () {
	  function Portfolio() {
	    _classCallCheck(this, Portfolio);

	    //declare variables:
	    this.musicNav = document.querySelector('.music__nav');
	    this.bestSellingTracks = document.querySelector('.music__best-sellers__tracks');
	    this.categories;

	    //execute methods:
	    this.fetcher();
	    this.play();
	  }

	  //declare methods:

	  _createClass(Portfolio, [{
	    key: 'fetcher',
	    value: function fetcher() {
	      var _this2 = this;

	      fetch('https://api.envato.com/v1/market/new-files-from-user:Joonique_Sound,audiojungle.json', {
	        mode: 'cors',
	        headers: {
	          'Authorization': 'Bearer ' + 'qovVRRD4GpRKxcF2YDzHYUsHJwdGKpYh'
	        }
	      }).then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        //make new array of data and sort for best sellers (top 5)
	        var bestSellers = data["new-files-from-user"].slice(0).sort(sortSales).slice(0, 5);

	        function sortSales(a, b) {
	          var salesA = a.sales;
	          var salesB = b.sales;
	          return salesB - salesA;
	        }
	        bestSellers.map(function (track) {
	          var refLink = '?ref=Joonique_Sound';
	          // console.log(track)
	          //get top 5 best sellers and inject HTML on each:
	          _this2.bestSellingTracks.innerHTML += '\n            <div class="music__best-sellers__tracks__individual">\n              <h4 class="music__best-sellers__tracks__individual__title">' + track.item + '</h4>\n              <audio class="audio">\n                <source src="' + track.live_preview_url + '">\n              </audio>\n              <button class="music__best-sellers__tracks__individual__player">\n                <i class="far fa-play-circle music__best-sellers__tracks__individual__player__icon"></i>\n              </button>  \n  \n              <a target="_blank" href="' + track.url + refLink + '" class="music__best-sellers__tracks__individual__cart">\n                <i class="fas fa-shopping-cart music__best-sellers__tracks__individual__cart__icon"></i>\n              </a>\n          </div>';
	        });

	        //sort by category
	        var categories = [];
	        var trackCategory = data["new-files-from-user"].map(function (track) {
	          return track.category;
	        });
	        trackCategory.some(function (track, index) {
	          if (trackCategory.indexOf(track) == index && track.includes("music-packs") === false) {
	            var finalCategory = track.split("/").slice(-1).toString();
	            categories.push(finalCategory);
	          }
	        });
	        _this2.categories = categories;
	        // console.log(this.categories);
	        // console.log(data["new-files-from-user"])
	      })
	      //catch error
	      .catch(function (err) {
	        return console.log(err);
	      });
	    }
	    //play on click:

	  }, {
	    key: 'play',
	    value: function play() {
	      var _this = this;
	      this.bestSellingTracks.addEventListener("click",
	      //Best sellers are added dynamically and can't be accessed with normal addEventListener. Use e.target to reach the button:
	      function (e) {
	        var button = e.target;
	        // console.log(e.target)
	        var playIcon = e.target.firstElementChild;

	        if (button.className.includes('music__best-sellers__tracks__individual__player')) {
	          //target audio element which is a sibling of the button:
	          var aud = e.target.previousElementSibling;
	          if (aud.paused) {
	            aud.play();
	            playIcon.classList.add('fa-pause-circle');
	            playIcon.classList.remove('fa-play-circle');
	          } else {
	            aud.pause();
	            playIcon.classList.remove('fa-pause-circle');
	            playIcon.classList.add('fa-play-circle');
	          }
	        } else {
	          console.log('err');
	        }
	      });
	    }
	  }]);

	  return Portfolio;
	}();

	exports.default = Portfolio;

/***/ })
/******/ ]);