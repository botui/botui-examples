var botui = new BotUI('thermostat-bot'),
    temperature = 30;

function init() {
  botui.message
    .bot({
      delay: 700,
      content: 'What would you like to do?'
    })
    .then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Check temperature',
          value: 'check'
        }, {
          text: 'Change temperature',
          value: 'change'
        }]
      })
  }).then(function (res) {
    if(res.value == 'change') {
      changeTemp();
    } else {
      botui.message.bot({
        delay: 1200,
        content: 'Current temperature is: ' + temperature + ' degree'
      }).then(init);
    }
  });
}

var changeTemp = function () {
  botui.message
    .bot({
      delay: 500,
      content: 'Change the temperature to ...'
    })
    .then(function () {
      return botui.action.text({
        delay: 1000,
        action: {
          size: 10,
          icon: 'thermometer-empty',
          value: temperature, // show the current temperature as default
          sub_type: 'number',
          placeholder: '26'
        }
      })
    }).then(function (res) {
      temperature = res.value; // save new value
      return botui.message
        .bot({
          delay: 1500,
          loading: true, // pretend like we are doing something
          content: 'temperature set to ' + res.value
        });
    }).then(init); // loop to initial state
}


init();
