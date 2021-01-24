(() => {
  const app = {
    // initialize
    initialize() {
      console.log('1. Application started!')
      this.cacheElement();
      this.buildUI();
      this.registerListeners();
      this.tick = document.querySelector('.countdown');
      setInterval(() => this.ticking(), 1000);
    },

    // cache
    cacheElement() {
      console.log('2. Cache all existing DOM elements!');
      this.$socials = document.querySelector('.soclink');
      this.$lineUp = document.querySelector('.line-up');
      this.$nav = document.querySelector('.nav');
    },

    // add listeners
    registerListeners() {
      console.log('4. Eventlistener attached');
      this.$concert = document.querySelectorAll('.line-up__container');
      this.$concert.forEach(concert => {
        concert.addEventListener('click', (ev) => {
          let id = ev.target.dataset.id || ev.target.parentNode.dataset.id || ev.target.parentNode.parentNode.id;
          console.log(id)
          this.generateHTMLForDetails(id);
        });
      });
    },

    // Build user interface
    buildUI() {
      console.log('3. Build the user interface!');
      this.$socials.innerHTML = this.generateHTMLForSocial();
      this.$lineUp.innerHTML = this.generateHTMLForLineUp();
      this.$nav.innerHTML = this.generateHTMLForNav();
    },

    // Generate Socials
    generateHTMLForSocial() {
      let tempStr = '<ul>';
        tempStr +=
        social.map((soc) => {
          return `<li class="playlist">
                    <a href="${soc.link}" target="_blank" rel="noopener noreferrer">${soc.type}</a>
                  </li>`
        }).join('');
        tempStr += '</ul>';
      return tempStr;
    },

    // Generate Line up
    generateHTMLForLineUp() {
      let tempStr = '';
        tempStr += 
        lineUp.map((lin) => {
          return `<li data-id="${lin.id}" class="line-up__list">
                    <a href="">
                      <p class="line-up__day">${this.findWeekday(lin.from)}</p>
                      <p>${lin.place.name}</p>
                      <div class="line-up__img">
                        <img src="${lin.artist.picture.small}">
                      </div>
                      <h2>${lin.artist.name}</h2>
                    </a>
                  </li>`
        }).join('');
      return tempStr;
    },

    // Concertdag
    findWeekday: function (millis) {
      return new Date(millis).toLocaleString('nl-BE', {weekday : 'long'});
    },

    // Generate navigation
    generateHTMLForNav() {
      let tempStr = '<ul class="navigation">';
        tempStr +=
        mainNav.map((nav) => {

          function externalOrInternal () {
            if (mainNav.type == 'internal') {
              mainNav.type = '_self';
            } else {
              mainNav.type = '_blank';
            }
          }

          return `<li class="nav__list__item">
                    <a href="${nav.link}" target="${externalOrInternal ()}" rel="noopener noreferrer">${nav.name}</a>
                  </li>`
        }).join('');
        tempStr += '</ul>';
      return tempStr;
    },

    // Generate countdown
    ticking: function () {
      this.tick.innerHTML = this.generateDigitalClock(2);
    },

    generateDigitalClock: function () {
      const date = new Date(1625148000000).getTime();
      const now = new Date().getTime();
      var difference = date - now;
      var days = Math.floor(this.toAmountOfDigits(difference / (1000 * 60 * 60 * 24)));
      var hours = Math.floor(this.toAmountOfDigits((difference % (1000 * 60 * 60 * 24))) / (1000 * 60 * 60));
      var minutes = Math.floor(this.toAmountOfDigits((difference % (1000 * 60 * 60))) / (1000 * 60));
      var seconds = Math.floor(this.toAmountOfDigits((difference % (1000 * 60))) / 1000);
      return `<p class="countdown">
      ${days} dagen 
      ${hours}h
      ${minutes}min
      ${seconds}s
      </p>`
    },

    toAmountOfDigits: function (number, amount) {
      let str = String(number);
      while (str.length < amount) {
        str = `0${str}`;
      }
      return str;
    },

    // Generate detail page
    generateHTMLForDetails() {
      let tempStr = '';
        tempStr += 
        lineUp.map((lin) => {
          return `<div class="details" data-id="${lin.id}"><img src="${lin.artist.picture.large}"><h2>${lin.artist.name}</h2></div>`
        }).join('');
      return tempStr;
    }
  };

  app.initialize();

})();