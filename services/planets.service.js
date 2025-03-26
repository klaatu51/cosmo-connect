"use strict";

const DbService = require("moleculer-db");

module.exports = {
	name: "planets",

	mixins: [DbService],
	adapter: new DbService.MemoryAdapter(),
	collection: "planets",

	settings: {
		fields: ["id", "name", "type"]
	},

	actions: {
		list: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler() {
				this.logger.info("📋 Listing all planets");
				return this.adapter.find();
			}
		},

		get: {
			rest: {
				method: "GET",
				path: "/:id"
			},
			async handler(ctx) {
				this.logger.info("🔍 Fetched planet with ID:", ctx.params.id);
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
				type: "string"
			},
			async handler(ctx) {
				this.logger.info("🪐 Planet created", ctx.params);
				return this.adapter.insert(ctx.params); 
			}
		},

		remove: {
			rest: {
				method: "DELETE",
				path: "/:id"
			},
			async handler(ctx) {
				this.logger.info("🗑️ Planet deleted with ID:", ctx.params.id);
				return this.adapter.removeById(ctx.params.id);
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
