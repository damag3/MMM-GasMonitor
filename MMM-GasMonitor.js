Module.register("MMM-GasMonitor", {
    defaults: {
        url: "http://192.168.1.70:8080/data",
        updateInterval: 1000,
        sparklinePoints: 40
    },

    start() {
        this.dataPayload = null;
        this.sparkline = [];
        this.getData();
        setInterval(() => this.getData(), this.config.updateInterval);
    },

    getData() {
        this.sendSocketNotification("GET_DATA", this.config.url);
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "DATA") {
            this.dataPayload = payload;

            this.sparkline.push(payload.mq2);
            if (this.sparkline.length > this.config.sparklinePoints) {
                this.sparkline.shift();
            }

            this.updateDom();
        }
    },

    getDom() {
        const wrapper = document.createElement("div");
        wrapper.className = "gm-container";

        if (!this.dataPayload) {
            wrapper.innerHTML = "<div class='gm-loading'>A carregar sensores…</div>";
            return wrapper;
        }

        const d = this.dataPayload;

        const globalIcon = d.alarm ? "⚠️" : "🟢";
        const mq2Icon = d.mq2_alarm ? "🔥" : "🟢";
        const tgsIcon = d.tgs_alarm ? "🔥" : "🟢";

        const globalClass = d.alarm ? "gm-alarm" : "gm-ok";
        const mq2Class = d.mq2_alarm ? "gm-alarm" : "gm-ok";
        const tgsClass = d.tgs_alarm ? "gm-alarm" : "gm-ok";

        const max = Math.max(...this.sparkline, 1023);
        const points = this.sparkline
            .map((v, i) => `${(i / this.sparkline.length) * 100},${100 - (v / max) * 100}`)
            .join(" ");

        wrapper.innerHTML = `
            <div class="gm-row ${globalClass}">
                <div class="gm-icon">${globalIcon}</div>
                <div class="gm-label">Estado Geral</div>
                <div class="gm-value">${d.alarm ? "ALERTA" : "OK"}</div>
            </div>

            <div class="gm-row ${mq2Class}">
                <div class="gm-icon">${mq2Icon}</div>
                <div class="gm-label">MQ‑2 (Butano/Fumo)</div>
                <div class="gm-value">${d.mq2}</div>
            </div>

            <div class="gm-bar"><div class="gm-bar-fill" style="width:${(d.mq2 / 1023) * 100}%"></div></div>

            <div class="gm-row ${tgsClass}">
                <div class="gm-icon">${tgsIcon}</div>
                <div class="gm-label">TGS2610 (Metano)</div>
                <div class="gm-value">${d.tgs}</div>
            </div>
    <div class="gm-bar"><div class="gm-bar-fill" style="width:${(d.tgs / 1023) * 100}%"></div></div>
`;

        return wrapper;
    },

    getStyles() {
        return ["MMM-GasMonitor.css"];
    },

});

