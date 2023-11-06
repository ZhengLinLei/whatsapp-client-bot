class cBot {

    #_job = {};
    #_tt = 0;
    #_start_with = null;
    #_enabledGlobal = false;

    constructor(start = null, tt = 10) {
        this.#_tt = tt;
        this.#_start_with = start;
    }
    
    
    #getProperties() {
        let pp = document.querySelector('div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs');
        let ll = pp.childNodes.length;
        let lt = pp.childNodes[ll-1].innerText;
        return [pp, ll, lt];
    }
    
    // Write message and click event
    async sendScript(scriptText, send=true){
        const lines = scriptText.split("\r\n").map(line => line.trim()).filter(line => line);
        let main = document.querySelector("#main");
        let textarea = main.querySelector(`div[contenteditable="true"]`)
    
        if(!textarea) throw new Error("You don't have any window opened!")
    
        for(const line of lines){
            console.log(line)
    
            textarea.focus();
            document.execCommand('insertText', false, line);
            textarea.dispatchEvent(new Event('change', {bubbles: true}));
            
            if (send)
                setTimeout(() => {
                    (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
                }, 100);
        
            if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
        }
    
        return lines.length;
    }

    // Execute task
    execute (command) {
        // Check if starts with content
        if (this.#_start_with && !command.startsWith(this.#_start_with))
            return;

        command = command.slice(this.#_start_with.length).split(' ');
        
        // Pass to task
        if(command[0] in this.#_job) {
            this.#_job[command[0]](command, this.sendScript);
        } else {
            if ("error" in this.#_job)
                this.#_job.error(command, this.sendScript);
        }
    }

    // Run Bot
    run () {
        // Get DOM values
        let p, le, last;
        [p, le, last] = this.#getProperties();

        setInterval(()=>{
            let msg;
            [p, le, msg] = this.#getProperties();

            // Evaluate if msg != lastSaved(message) AND The message is from others
            if (last != msg && (p.childNodes[le-1].querySelector(".message-out") || this.#_enabledGlobal)) {
                
                // Get message | Remove timestamp (-6 length)
                let command = (

                        p.childNodes[le-1].querySelector('._11JPr.selectable-text.copyable-text').innerText  // ---> If Exist
                        ??
                        msg.split('\n').slice(-3)[0]                                                         // ---> Alternative

                );
                
                // Execute
                this.execute(command);

                // Update message
                last = msg;
            }
        }, this.#_tt);
    }


    // Add task
    addTask(name, callback) {
        if (name in this.#_job) {
            console.error(`Task ${name} already exist in jobs`);
        } else {
            this.#_job[name] = callback;
        }
    }

    // Remove task
    removeTask(name) {
        if (name in this.#_job) {
            delete this.#_job[name];
        } else {
            console.error(`Task ${name} not exist in jobs`);
        }
    }

    // Enable global commands
    // Allow other users to execute commands
    enableGlobal() {
        this.#_enabledGlobal = true;
    }
    // Disable global commands
    disableGlobal() {
        this.#_enabledGlobal = false;
    }
}




// --------------------------------


// DO NOT COPY THE CODE BELOW
// CREATE ONE WITH YOUR OWN RULES OR WHATEVER YOU WANT TO ANSWER

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

BOT.addTask('error', (input, output) => {
    // Send
    output(`Command ${input[0]} not found`);
});

BOT.addTask('prompt', () => {
    let c = prompt("Silent command to execute");
    if (c) 
        BOT.execute(c);
});


BOT.run();