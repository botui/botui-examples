var botui = new BotUI('delivery-bot'),
    address = 'House 1, First Ave.';

botui.message
  .bot('Where would you like the package to be delivered?')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, // so we could the address in message instead if 'Existing Address'
      action: [{
        text: 'Existing Address',
        value: 'exist'
      }, {
        text: 'Add New Address',
        value: 'new'
      }]
    })
}).then(function (res) {
  if(res.value == 'exist') {
    botui.message.human({
      delay: 500,
      content: address
    });
    end();
  } else {
    botui.message.human({
      delay: 500,
      content: res.text
    });
    askAddress();
  }
});

var askAddress = function () {
  botui.message
    .bot({
      delay: 500,
      content: 'Please write your address below:'
    })
    .then(function () {
      return botui.action.text({
        delay: 1000,
        action: {
          size: 30,
          icon: 'map-marker',
          value: address, // show the saved address if any
          placeholder: 'Address'
        }
      })
    }).then(function (res) {
      botui.message
        .bot({
          delay: 500,
          content: 'New address: ' + res.value
        });

      address = res.value; // save address

      return botui.action.button({
        delay: 1000,
        action: [{
          icon: 'check',
          text: 'Confirm',
          value: 'confirm'
        }, {
          icon: 'pencil',
          text: 'Edit',
          value: 'edit'
        }]
      })
    }).then(function (res) {
      if(res.value == 'confirm') {
        end();
      } else {
        askAddress();
      }
    });
}

var end = function () {
  botui.message
    .bot({
      delay: 1000,
      content: 'Thank you. Your package will shipped soon.'
    });
}
