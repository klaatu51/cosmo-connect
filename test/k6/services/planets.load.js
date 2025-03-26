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
    // Test Creating a Planet
    let createRes = http.post('http://localhost:3000/api/planets', JSON.stringify({
        name: `TestPlanet_${Math.random()}`,
        type: "Gas Giant"
    }), { headers: { 'Content-Type': 'application/json' } });

    check(createRes, {
        'Planet created successfully': (r) => r.status === 200
    });

    let planetId = JSON.parse(createRes.body).id;

    // Test Fetching All Planets
    let listRes = http.get('http://localhost:3000/api/planets');
    check(listRes, {
        'Planet list retrieved successfully': (r) => r.status === 200
    });

    // Test Fetching a Specific Planet
    let getRes = http.get(`http://localhost:3000/api/planets/${planetId}`);
    check(getRes, {
        'Planet details retrieved successfully': (r) => r.status === 200
    });

    // Test Deleting a Planet
    let deleteRes = http.del(`http://localhost:3000/api/planets/${planetId}`);
    check(deleteRes, {
        'Planet deleted successfully': (r) => r.status === 200
    });

    sleep(1);
}
