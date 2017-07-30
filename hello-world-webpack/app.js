import BotUI from 'botui'
import Vue from 'vue'

// window.Vue = Vue; // use either this
var botui = new BotUI('hello-world', {
  vue: Vue // or this
});

botui.message.add({
  content: 'Hello World from bot!'
});

botui.message.add({
  human: true,
  content: 'Hello World from human!'
});
