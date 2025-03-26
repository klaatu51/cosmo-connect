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
				return this.adapter.find();
			}
		},

		get: {
			rest: {
				method: "GET",
				path: "/:id"
			},
			async handler(ctx) {
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
				
				return this.adapter.insert(ctx.params);
			}
		},

		remove: {
			rest: {
				method: "DELETE",
				path: "/:id"
			},
			async handler(ctx) {
				return this.adapter.removeById(ctx.params.id);
			}
		},

		findByPlanet: {
            rest: {
				method: "GET",
				path: "/planet/:planetId",
			},
            handler(ctx) {
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
