"use strict";

require("@moleculer/lab");

module.exports = {
	nodeID: (process.env.NODEID ? process.env.NODEID + "-" : ""),
	metrics: {
		enabled: true,
		reporter: "Laboratory"
	},
	logger: [{
		type: "Console",
		options: {
			level: "info",
			colors: true,
			moduleColors: false,
			formatter: "full",
			objectPrinter: null,
			autoPadding: false
		}
	}, "Laboratory"],   
	tracing: {
		enabled: true,
		exporter: {
			type: "Laboratory",
			options: {
				logger: null,
				colors: true,
				width: 100,
				gaugeWidth: 40
			}
		}
	}
};
