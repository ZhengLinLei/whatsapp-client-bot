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


### AdminBot.js

> [!IMPORTANT]  
> You must have to open a chat window before calling function
> The bot will be listening only in focused chat window

**Options**
```js
let BOT = new cBot('/');

// Add tasks in ./tasks folder
// ...

BOT.run();
```

Avaliable Tasks:

| Tasks         |    Description                            |  Syntax                                                               |
|---------------|-------------------------------------------|-----------------------------------------------------------------------|
| bomb.js       | Loop message x times                      | {start:string} bomb {times:num} {message:string}                      |
| echo.js       | Repeat message on time                    | {start:string} echo {message:string}                                  |
| listen.js     | Listen user message to do action          | {start:string} listen {user:string} {message:string} {action:string}  |
| timer.js      | Set a timer to send a message             | {start:string} timer {seconds:num} {message:string}                   |


And of course, you can add your own tasks.

**Examples**
```js
// Bomb and echo
let BOT = new cBot('/'); // Start with "/"

BOT.addTask('bomb', (input, output) => {
    if (input.length >= 3) {
        let t = input.slice(2).join(' ')+"\r\n";
        let i = parseInt(input[1]);

        if ('repeat' in String) {
            t = t.repeat(i);
        } else {
            t = Array(i+1).join(t);
        }
        
        // Send
        output(t);
    }
});

BOT.addTask('echo', (input, output) => {
    if (input.length >= 2) {
        input = input.slice(1).join(' ');

        // Send
        output(input);
    }
});

BOT.run();


// Write "/bomb 5 Hello" in chat window
// Write "/echo Hello" in chat window
```

```js
// All commands
let BOT = new cBot('/');

// Add tasks in ./tasks folder
BOT.addTask('echo', (input, output) => {
    if (input.length >= 2) {
        input = input.slice(1).join(' ');

        // Send
        output(input);
    }
});

BOT.addTask('bomb', (input, output) => {
    if (input.length >= 3) {
        let t = input.slice(2).join(' ')+"\r\n";
        let i = parseInt(input[1]);

        if ('repeat' in String) {
            t = t.repeat(i);
        } else {
            t = Array(i+1).join(t);
        }
        
        // Send
        output(t);
    }
});

BOT.addTask('listen', (input, output) => {
    if (input.length >= 3) {

        // /listen {user} "{message}" {output}
        let user = input[1];
        // msg in quotes
        let rest = input.slice(2).join(' ');
        let msgU = rest.match(/"([^"]+)"/)[1];
        let outputMsg = rest.split('"')[2].trim();

        const wBot = (tt = 10) => {

            function getProperties() {
                let pp = document.querySelector('div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs');
                let ll = pp.childNodes.length;
                let lt = pp.childNodes[ll-1].innerText;
                return [pp, ll, lt];
            }
            
            // Get DOM values
            let p, le, last;
            [p, le, last] = getProperties();
        
            let service = setInterval(()=>{
                let msg;
                [p, le, msg] = getProperties();
                
                // Evaluate if msg != lastSaved(message) AND The message is from others
                if (last != msg && p.childNodes[le-1].querySelector(".message-in")) {
                    
                    // Get message | Remove timestamp (-6 length)
                    let rutine = (
        
                            p.childNodes[le-1].querySelector('._11JPr.selectable-text.copyable-text').innerText  // ---> If Exist
                            ??
                            msg.split('\n').slice(-3)[0]                                                         // ---> Alternative
        
                    )
                    
                    // Check if equals to user
                    if (msg.match(user)) {
                        // Check if starts with content
                        if (rutine.match(msgU)) {
                            // Stop service
                            clearInterval(service);
                            // Send message
                            output(outputMsg);
                        }
                    }
        
                    // Update message
                    last = msg;
                }
            }, tt);
        }

        // Call
        wBot();
    }
});

BOT.addTask('timer', (input, output) => {
    if (input.length >= 3) {
        let t = input.slice(2).join(' ');
        let i = parseInt(input[1]);

        setTimeout(() => {
            // Send
            output(t);
        }, i * 1000);
    }
});


BOT.run();

// Write "/bomb 5 Hello" in chat window
// Write "/echo Hello" in chat window
// Write "/listen (.*) "(.*)" Listening anyone message" in chat window
// Write "/listen (.*) "(.*)" /bomb 10 Silent, please" in chat window
// Write "/timer 5 Hello" in chat window
```