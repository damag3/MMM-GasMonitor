const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
    start() {
        console.log("MMM-GasMonitor helper started");
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "GET_DATA") {
            request({ url: payload, method: "GET" }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    this.sendSocketNotification("DATA", JSON.parse(body));
                }
            });
        }
    }
});

