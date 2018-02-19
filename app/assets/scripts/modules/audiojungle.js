class Portfolio {
  constructor() {
    //declare variables:
    this.musicNav = document.querySelector('.music__nav');
    this.bestSellingTracks = document.querySelector('.music__best-sellers__tracks');
    this.categories;

    //execute methods:
    this.fetcher();
    this.play();

  }

  //declare methods:

  fetcher() {
    fetch('https://api.envato.com/v1/market/new-files-from-user:Joonique_Sound,audiojungle.json', {
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer ' + 'qovVRRD4GpRKxcF2YDzHYUsHJwdGKpYh'
        }
      })
      .then(res => res.json())
      .then(data => {
        //make new array of data and sort for best sellers (top 5)
        let bestSellers = data["new-files-from-user"].slice(0).sort(sortSales).slice(0, 5);

        function sortSales(a, b) {
          const salesA = a.sales;
          const salesB = b.sales;
          return salesB - salesA;
        }
        bestSellers.map(track => {
          let refLink ='?ref=Joonique_Sound'
          // console.log(track)
          //get top 5 best sellers and inject HTML on each:
            this.bestSellingTracks.innerHTML += `
            <div class="music__best-sellers__tracks__individual">
              <h4 class="music__best-sellers__tracks__individual__title">${track.item}</h4>
              <audio class="audio">
                <source src="${track.live_preview_url}">
              </audio>
              <button class="music__best-sellers__tracks__individual__player">
                <i class="far fa-play-circle music__best-sellers__tracks__individual__player__icon"></i>
              </button>  
  
              <a target="_blank" href="${track.url}${refLink}" class="music__best-sellers__tracks__individual__cart">
                <i class="fas fa-shopping-cart music__best-sellers__tracks__individual__cart__icon"></i>
              </a>
          </div>`;
        });


        //sort by category
        let categories = [];
        let trackCategory = data["new-files-from-user"].map(track => {
          return track.category
        });
        trackCategory.some((track, index) => {
          if (trackCategory.indexOf(track) == index && track.includes("music-packs") === false) {
            let finalCategory = track.split("/").slice(-1).toString();
            categories.push(finalCategory);
          }
        })
        this.categories = categories;
        // console.log(this.categories);
        // console.log(data["new-files-from-user"])
      })
      //catch error
      .catch(err => console.log(err))
  }
  //play on click:
  play() {
    let _this = this;
    this.bestSellingTracks.addEventListener("click",
    //Best sellers are added dynamically and can't be accessed with normal addEventListener. Use e.target to reach the button:
    function(e) {
      let button = e.target;
      // console.log(e.target)
      let playIcon = e.target.firstElementChild;

      if (button.className.includes('music__best-sellers__tracks__individual__player')) {
        //target audio element which is a sibling of the button:
        let aud = e.target.previousElementSibling;
        if (aud.paused) {
          aud.play();
          playIcon.classList.add('fa-pause-circle')
          playIcon.classList.remove('fa-play-circle')
        } else {
          aud.pause();
          playIcon.classList.remove('fa-pause-circle')
          playIcon.classList.add('fa-play-circle')
        }
      } else {
        console.log('err')
      }
    }
  )
  }
}

export default Portfolio;