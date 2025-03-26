"use strict";

const DbService = require("moleculer-db");

module.exports = {
	name: "satellites",

	mixins: [DbService],
	adapter: new DbService.MemoryAdapter(),
	collection: "satellites",

	settings: {
		fields: ["id", "name", "planetId"]
	},

	actions: {
		list: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler(ctx) {
				this.logger.info("📋 Listing all satellites");
				return this.adapter.find();
			}
		},

		get: {
			rest: {
				method: "GET",
				path: "/:id"
			},
			async handler(ctx) {
				this.logger.info("🔍 Fetched satellite with ID:", ctx.params.id);
				return this.adapter.findById(ctx.params.id);
			}
		},

		create: {
			rest: {
				method: "POST",
				path: "/"
			},
			params: {
				name: "string",
				planetId: "string"
			},
			async handler(ctx) {
				const planet = await ctx.call("planets.get", { id: ctx.params.planetId });
				if (!planet) throw new Error("Planet not found");
				
				this.logger.info("🛰️ Satellite created", ctx.params);
				return this.adapter.insert(ctx.params);
			}
		},

		remove: {
			rest: {
				method: "DELETE",
				path: "/:id"
			},
			async handler(ctx) {
				this.logger.info("🗑️ Satellite deleted with ID:", ctx.params.id);
				return this.adapter.removeById(ctx.params.id);
			}
		},

		findByPlanet: {
            rest: {
				method: "GET",
				path: "/planet/:planetId",
			},
            handler(ctx) {
				this.logger.info("📡 Satellites retrieved for planet with ID:", ctx.params.planetId);
                return this.adapter.find({ query: { planetId: ctx.params.planetId } });
            }
        }

	},

	events: {

	},

	methods: {

	},

	created() {

	},

	async started() {

	},

	async stopped() {

	}
};
