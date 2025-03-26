import http from 'k6/http';
import { check, sleep } from 'k6';

let scenarios = {
    externallyControlled: {
        executor: 'externally-controlled',
        vus: 10,
        maxVUs: 50,
        duration: '10m',
    },
    rampingVus: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '20s', target: 10 },
            { duration: '60s', target: 50 },
            { duration: '10s', target: 0 },
        ],
        gracefulRampDown: '0s',
    },
};

const { SCENARIO } = __ENV;

export let options = {
    scenarios: SCENARIO ? { [SCENARIO]: scenarios[SCENARIO] } : scenarios,
    discardResponseBodies: true,
    thresholds: {
      http_req_duration: ['p(95)<250', 'p(99)<350'],
    },
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

    let planetId = JSON.parse(createRes.body)._id;

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
