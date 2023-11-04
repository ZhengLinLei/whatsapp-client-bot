BOT.addTask('prompt', () => {
    let c = prompt("Silent command to execute");
    if (c) 
        BOT.execute(c);
});