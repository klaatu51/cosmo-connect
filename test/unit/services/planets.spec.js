"use strict";

const { ServiceBroker } = require("moleculer");
const TestService = require("../../../services/planets.service");
const { describe } = require("nats/lib/nats-base-client/parser");

describe("Test 'planets' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'planets.create' action", () => {
		it("should create a planet", async () => {
			const planet = await broker.call("planets.create", { name: "Earth", type: "Terrestrial" });
			expect(planet).toHaveProperty("id");
			expect(planet.name).toBe("Earth");
			expect(planet.type).toBe("Terrestrial");
		});
	});

	describe("Test 'planets.list' action", () => {
		it("should return list of all planets", async () => {
			const planets = await broker.call("planets.list");
			expect(planets.length).toBeGreaterThan(0);
		});
	});

	describe("Test 'planets.get' action", () => {
		it("should return planet by ID", async () => {
			const newPlanet = await broker.call("planets.create", { name: "Mars", type: "Terrestial" });
			const fetchedPlanet = await broker.call("planets.get", { id: newPlanet.id });
			expect(fetchedPlanet.id).toBe(newPlanet.id);
			expect(fetchedPlanet.name).toBe("Mars");
		});
	});

	describe("Test 'planets.remove' action", () => {
		it("should delete a planet", async () => {
			const newPlanet = await broker.call("planets.create", { name: "Venus", type: "Terrstrial" });
			await broker.call("plnets.remove", { id: newPlanet.id }).catch(err => err);
			const deletePlanet = await broker.call("planets.get", { id: "newPlanet.id" }).catch(err => err);
			expect(deletePlanet).toBeInstanceOf(Error);
		});
	});
});

