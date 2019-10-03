'use strict';

var cardsArray = [{
  'name': 'the',
  'img': 'https://i.pinimg.com/originals/1d/84/db/1d84dbf43e4ef75cfad61ef593cc98ef.png'
}, {
  'name': 'stranger',
  'img': 'https://res.cloudinary.com/teepublic/image/private/s--8wqKRZQj--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1482755311/production/designs/991823_1.jpg'
}, {
  'name': 'marianne',
  'img': 'https://www.presse-citron.net/wordpress_prod/wp-content/uploads/2019/09/marianne-e1569849857743.jpg'
}, {
  'name': 'walking',
  'img': 'https://i.ebayimg.com/images/g/I1gAAOSwoVNZ5W~p/s-l400.jpg'
}, {
  'name': 'river',
  'img': 'https://ih1.redbubble.net/image.324819788.2550/flat,550x550,075,f.jpg'
}, {
  'name': 'hunter',
  'img': 'https://ih1.redbubble.net/image.178454542.3377/mp,840x830,matte,f8f8f8,t-pad,750x1000,f8f8f8.u2.jpg'
}, {
  'name': 'breack',
  'img': 'https://seeklogo.com/images/P/prison-break-logo-80D09AE462-seeklogo.com.png'
}, {
  'name': 'orange',
  'img': 'https://pbs.twimg.com/profile_images/1143897292610498560/vriTO15Z_400x400.png'
}, {
  'name': 'flash',
  'img': 'https://images-na.ssl-images-amazon.com/images/I/61mH0NFTEHL._SL1021_.jpg'
}, {
  'name': 'island',
  'img': 'https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/medias-tele/the-island-seuls-au-monde-quelle-difference-avec-koh-lanta-942630/18897466-1-fre-FR/The-Island-seuls-au-monde-quelle-difference-avec-Koh-Lanta.jpg'
}, {
  'name': 'fairy',
  'img': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Fairy_tail_logo.jpg'
}, {
  'name': 'arrow',
  'img': 'http://img.over-blog-kiwi.com/1/35/85/80/20141212/ob_683504_tumblr-static-5ewubtuhregwgc88g4ow0wk4.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
