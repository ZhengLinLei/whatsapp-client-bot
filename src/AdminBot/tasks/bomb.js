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
