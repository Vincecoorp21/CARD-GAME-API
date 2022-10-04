//Example fetch using pokemonapi.co

let deckId = '';

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch(err => {
    console.log(`error ${err}`);
  });

document.querySelector('button').addEventListener('click', drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
      //console.log(data);
      document.getElementById('player1').src = data.cards[0].image;
      document.getElementById('player2').src = data.cards[1].image;

      let player1Value = converToNum(data.cards[0].value);
      let player2Value = converToNum(data.cards[1].value);

      if (player1Value > player2Value) {
        document.querySelector('h3').innerText = 'Player 1 WINS';
      } else if (player1Value < player2Value) {
        document.querySelector('h3').innerText = 'Player 2 WINS';
      } else {
        document.querySelector('h3').innerText = 'Time for WAR!';
      }
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

function converToNum(val) {
  if (val === 'ACE') {
    return 14;
  } else if (val === 'KING') {
    return 13;
  } else if (val === 'QUEEN') {
    return 12;
  } else if (val === 'JACK') {
    return 11;
  } else {
    return val;
  }
}
