(function(win, doc){
    'use strict';

    var $formGenerate = doc.querySelector('[data-js="formGenerator"]'),
        $emojiReceiver = doc.querySelector('[data-js="emoji-receiver"]');

    var app = (function(){
        return {
            init: function(){
                this.initEvents();
            },
            initEvents: function initEvents() {
                $formGenerate.addEventListener('submit', this.handleSubmit, false);
            },

            handleSubmit: function handleSubmit(event){
                event.preventDefault();
                //console.log('evento de formulario')
                app.emojiConection();
            },

            emojiConection: function emojiConection(){
                var ajax = new XMLHttpRequest;
                ajax.open('get', 'emojis.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.getEmoji, false);
            },

            getEmoji: function getEmoji(){
                if (!app.isReady.call(this))
                    return;
                var data = JSON.parse(this.responseText);
                
                var emojiCount = Object.keys(data).length;
                console.log(emojiCount);
                console.log(app.getRandomEmoji(emojiCount));
                
                $emojiReceiver.textContent = data[app.getRandomEmoji(emojiCount)];

            },

            getRandomEmoji: function getRandomEmoji(max){
                var maxNumber = max + 1;
                return Math.floor(Math.random() * (maxNumber - 1)) + 1;
            },

            isReady: function isReady(){
                return this.readyState === 4 && this.status === 200;
            }
        }
    })();

    app.init();

})(window, document);