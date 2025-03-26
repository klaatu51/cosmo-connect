import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '60s', target: 50 },
        { duration: '10s', target: 0 }
    ]
};

export default function () {
     // Create a Planet for Satellites
    let planetRes = http.post('http://localhost:3000/api/planets', JSON.stringify({
        name: `Planet_${Math.random()}`,
        type: "Rocky"
    }), { headers: { 'Content-Type': 'application/json' } });

    check(planetRes, { 'Planet created': (r) => r.status === 200 });
    let planetId = JSON.parse(planetRes.body)._id;

    // Create a Satellite
    let createRes = http.post('http://localhost:3000/api/satellites', JSON.stringify({
        name: `Moon_${Math.random()}`,
        planetId: planetId
    }), { headers: { 'Content-Type': 'application/json' } });

    check(createRes, { 'Satellite created': (r) => r.status === 200 });

    let satelliteId = JSON.parse(createRes.body)._id;

    // Fetch All Satellites
    let listRes = http.get('http://localhost:3000/api/satellites');
    check(listRes, { 'Satellites list retrieved': (r) => r.status === 200 });

    // Fetch Satellites for a Planet
    let findByPlanetRes = http.get(`http://localhost:3000/api/satellites/planet/${planetId}`);
    check(findByPlanetRes, { 'Satellites by planet retrieved': (r) => r.status === 200 });

    // Delete Satellite
    let deleteRes = http.del(`http://localhost:3000/api/satellites/${satelliteId}`);
    check(deleteRes, { 'Satellite deleted': (r) => r.status === 200 });

    sleep(1);
}
