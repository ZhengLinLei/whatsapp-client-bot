class cBot {

    #_job = {};
    #_tt = 0;
    #_start_with = null;

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
    async sendScript(scriptText){
        const lines = scriptText.split("\r\n").map(line => line.trim()).filter(line => line);
        let main = document.querySelector("#main");
        let textarea = main.querySelector(`div[contenteditable="true"]`)
    
        if(!textarea) throw new Error("You don't have any window opened!")
    
        for(const line of lines){
            console.log(line)
    
            textarea.focus();
            document.execCommand('insertText', false, line);
            textarea.dispatchEvent(new Event('change', {bubbles: true}));
    
            setTimeout(() => {
                (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
            }, 100);
        
            if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
        }
    
        return lines.length;
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
            if (last != msg && p.childNodes[le-1].querySelector(".message-out")) {
                
                // Get message | Remove timestamp (-6 length)
                let command = (

                        p.childNodes[le-1].querySelector('._11JPr.selectable-text.copyable-text').innerText  // ---> If Exist
                        ??
                        msg.split('\n').slice(-3)[0]                                                         // ---> Alternative

                );
                
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


BOT.run();