"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		ip: "0.0.0.0",

		routes: [
			{
				path: "/api",

				whitelist: [
					"**"
				],

				mergeParams: true,

				authentication: false,

				authorization: false,

				autoAliases: true,

				aliases: {
					// Planets Service
					"GET /planets": "planets.list",
					"GET /planets/:id": "planets.get",
					"POST /planets": "planets.create",
					"DELETE /planets/:id": "planets.remove",

					//Satellites Service
                    "GET /satellites": "satellites.list",
                    "GET /satellites/:id": "satellites.get",
                    "POST /satellites": "satellites.create",
                    "DELETE /satellites/:id": "satellites.remove",
                    "GET /satellites/planet/:planetId": "satellites.findByPlanet"
				},

				callOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all",

				logging: true
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,


		assets: {
			folder: "public",

			options: {}
		}
	},
};
