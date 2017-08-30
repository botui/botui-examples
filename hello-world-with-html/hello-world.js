var botui = new BotUI('hello-world');

botui.message.add({
  content: 'Hello World from bot!<br/>line break.<a href="https://moin.im">link</a>'
});

botui.message.add({
  human: true,
  content: 'Hello World from human!'
});
