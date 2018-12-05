var botui = new BotUI('rock-paper-scissors');

//global game variables
var gameState = {
  'wins': 0,
  'losses': 0,
  'games': 0,
  'result': 0
},
    resultMessages = ["It's a draw.", "You won!", "You lost..."],
    playMessages = [icon('hand-rock-o') + ' Rock', icon('hand-paper-o') + ' Paper', icon('hand-scissors-o') + ' Scissors'],
    maxGames = 5

// work-around as markdown is not always correctly parsed
function icon(iconName) {
  return '<i class="botui-icon botui-message-content-icon fa fa-' + iconName + '"></i>'
}

// entrypoint for the conversation
function hello () {
  botui.message.bot({
    delay: 500,
    content: "Would you like to play a game?"
  }).then(function () {
    return botui.action.button({
      delay: 1000,
      action: [{
        icon: 'check',
        text: 'Bring it on',
        value: 'yes'
      }, {
        icon: 'times',
        text: 'No thanks',
        value: 'no'
      }]
    })
  }).then(function (res) {
    if (res.value === 'yes') {
      shifumi()
    } else {
      botui.message.add({
        delay: 500,
        type: 'html',
        content: icon('frown-o') + ' Another time perhaps'
      })
    }
  })
};

// main game loop
function shifumi () {
  botui.action.button({
    delay: 1000,
    addMessage: false,
    action: [{
      icon: 'hand-rock-o',
      text: 'Rock',
      value: '0'
    }, {
      icon: 'hand-paper-o',
      text: 'Paper',
      value: '1'
    }, {
      icon: 'hand-scissors-o',
      text: 'Scissors',
      value: '2'
    }]
  }).then(function (res) {
    var playerMove = parseInt(res.value)
    var botMove = Math.floor(Math.random()*3)
    //result = 0 -> draw, 1 -> win, 2 -> loss
    var result = (playerMove - botMove + 3) % 3
    gameState.result = result
    gameState.games += 1
    if (result === 1) {
      gameState.wins += 1
    } else if (result === 2) {
      gameState.losses += 1
    }
    botui.message.add({
      delay: 1000,
      loading: true,
      human: true,
      type: 'html',
      content: playMessages[playerMove]
    });
    return botui.message.bot({
      delay: 1000,
      loading: true,
      type: 'html',
      content: playMessages[botMove]
    })
  }).then(function () {
    // fetch info from the global state
    var result = gameState.result
    var score = '<br/>Score: ' + icon('android') + ' ' + gameState.losses + ' - ' + gameState.wins + ' ' + icon('user')
    return botui.message.bot({
      delay: 500,
      type: 'html',
      content: resultMessages[result] + score
    })
  }).then((gameState.games < maxGames) ? shifumi : goodbye)
}

function goodbye () {
  botui.message.bot({
    delay: 500,
    content: "You've played enough already. Get back to work!"
  })
}

hello()
//shifumi()
