var loadingMsgIndex,
    botui = new BotUI('stars-bot'),
    API = 'https://api.github.com/repos/';

function sendXHR(repo, cb) {
  var xhr = new XMLHttpRequest();
  var self = this;
  xhr.open('GET', API + repo);
  xhr.onload = function () {
    var res = JSON.parse(xhr.responseText)
    cb(res.stargazers_count);
  }
  xhr.send();
}

function init() {
  botui.message
  .bot({
    delay: 1000,
    content: 'Enter the repo name to see how many stars it have:'
  })
  .then(function () {
    return botui.action.text({
      delay: 1000,
      action: {
        value: 'moinism/botui',
        placeholder: 'moinism/botui'
      }
    })
  }).then(function (res) {
    loadingMsgIndex = botui.message.bot({
      delay: 200,
      loading: true
    }).then(function (index) {
      loadingMsgIndex = index;
      sendXHR(res.value, showStars)
    });
  });
}

function showStars(stars) {
  botui.message
  .update(loadingMsgIndex, {
    content: 'it has !(star) ' + (stars || "0") + ' stars.'
  })
  .then(init); // ask again for repo. Keep in loop.
}

init();
