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
				type: "string"
			},
			async handler(ctx) {
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
