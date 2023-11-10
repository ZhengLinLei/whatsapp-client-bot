BOT.addTask('sticker', async (input) => {
    if (input.length > 1) {
        let j = input.length > 2 ? input[2] : 1;
        let x = (parseInt(input[1]) ?? 1);

        document.querySelector('.lhggkp7q.mvj9yovn.f804f6gw.fyy3ld6e.svlsagor.dntxsmpk.ixn6u0rb.s2vc4xk1.o0wkt7aw.t1844p82.esbo3we0.qizq0yyl.b9fczbqn.oybnjv0e').click();
        let st = null, stAll = null;
        // Open
        do {
            do {
                await new Promise(resolve => setTimeout(resolve, 250));
                st = document.querySelector('.lhggkp7q.mvj9yovn.f804f6gw.fyy3ld6e.svlsagor.dntxsmpk.ixn6u0rb.s2vc4xk1.o0wkt7aw.t1844p82.esbo3we0.qizq0yyl.bs7a17vp.oybnjv0e');
                if(st != null) break;
            } while(true);
            if (st.getAttribute("aria-label") == "Abrir el panel de stickers") st.click();
            await new Promise(resolve => setTimeout(resolve, 250));
            stAll = document.querySelectorAll('._3CaGJ.j_uyu');
            try {
                let s = stAll[x].querySelector('img');
                if (s) break;
            } catch (error) {
                continue;
            }
        } while(true);

        for (let i = 0; i < j; i++) {
            stAll[x].querySelector('img').click();
        }
        // Close
        document.querySelector(".lhggkp7q.mvj9yovn.f804f6gw.fyy3ld6e.svlsagor.dntxsmpk.ixn6u0rb.s2vc4xk1.o0wkt7aw.t1844p82.esbo3we0.qizq0yyl.bs7a17vp.eg0stril").click();
    }

}, 'sticker {index:int} {times:int|null}');