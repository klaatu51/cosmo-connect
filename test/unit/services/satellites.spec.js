"use strict";

const { ServiceBroker } = require("moleculer");
const TestService = require("../../../services/satellites.service");
const { describe } = require("nats/lib/nats-base-client/parser");

describe("Test 'satellites' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'satellites.create' action", () => {
		it("should create a satellite for a planet", async () => {
            const planet = await broker.call("planets.create", { name: "Earth", type: "Terrestrial" })
			const satellite = await broker.call("satellites.create",  { name: "Moon", planetId: planet.id });
            expect(satellite).toHaveProperty("id");
            expect(satellite.name).toBe("Moon");
            expect(satellite.planetId).toBe(planet.id);    
		});
	});

    describe("Test 'planets.list' action", () => {
        it("should list all satellites", async () => {
            const satellites = await broker.call("satellites.list");
            expect(satellites.length).toBeGreaterThan(0);    
        });
    });

    describe("Test 'satellites.get' action", () => {
        it("should get a satellite by ID", async () => {
            const newSatellite = await broker.call("satellites.create", { name: "Phobos", planetId: planet.id });
            const fetchedSatellite = await broker.call("satellites.get", { id: newSatellite.id });
            expect(fetchedSatellite.id).toBe(newSatellite.id);
            expect(fetchedSatellite.name).toBe("Phobos");
        });
    });

    describe("Test 'satellites.findByPlanet' action", () => {
        it("should find satellites by planet ID", async () => {
            const satellites = await broker.call("satellites.findByPlanet", { planetId: planet.id });
            expect(Array.isArray(satellites)).toBe(true);
            expect(satellites.some(s => s.planetId === planet.id)).toBe(true);    
        });
    });

    describe("Test 'satellites.remove' action", () => {
        it("should delete a satellite", async () => {
            const newSatellite = await broker.call("satellites.create", { name: "Deimos", planetId: planet.id });
            await broker.call("satellites.remove", { id: newSatellite.id });
            const deletedSatellite = await broker.call("satellites.get", { id: newSatellite.id }).catch(err => err);
            expect(deletedSatellite).toBeInstanceOf(Error);
        });
    });
});

