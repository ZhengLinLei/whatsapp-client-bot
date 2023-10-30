# Client side Whatsapp Bot Directory

> Upload your own bot with pull request!
>
> Share your code to prank friends.

## Installation

1. Open console
2. Paste the code
3. And wait for fun!


## Bots

There are plenty of bots. If you want to share one, please make us know it doing pull requests.

### ClientBotLang.js

> [!IMPORTANT]  
> You must have to open a chat window before calling function
> The bot will be listening only in focused chat window

**Options**
```js
let option = {
    startWith: "/",         // Can specify "null"
    default: {
        active: true,
        message: "Sorry, I cannot understand what did you type"
    },
    language: {
        "hi$": "Hi, how are you?",
        "hi*": "Hi, hi, hi, hi, hiiii",
        "bye$": "Bye, see you", 
        "wBot$": "Servicing you \nHow can I help you?\n My Source Code is in: https://github.com/ZhengLinLei/whatsapp-client-bot",
        "hi(.*)": "Hi, what?",
        "fuck you$": "Don't say that",
        "[a-bA-Z]* is awesome": "I agree!",
        "[nya|miau]": "Nyaaaa!"
    }
}

wBot(option);
```

You will see the result after someone type any of the following language rules.