// import http from 'k6/http'
// import { check } from 'k6'
// import { sleep } from 'k6'
// import exec from 'k6/execution'

// export const options = {
//     vus: 10,
//     duration: '6s',
//     thresholds: {
//         http_req_duration: ['p(95)<500'],
//         http_req_failed: ['rate<0.01'],
//         checks: ['rate>=0.98']
//     }
// }
// export default function () {
// const res = http.get('https://quickpizza.grafana.com/')
// console.log(exec.scenario.iterationInTest)
// check (res, {
//     'status is 200': (r) => r.status === 200,
//      'page is startpage': (r) => r.body.includes('QuickPizza')
// })
// sleep(2)
// }



// import http from 'k6/http'
// import { sleep } from 'k6'
// import { Counter, Trend } from 'k6/metrics'

// export const options = {
//     vus: 5,
//     duration: '6s',
//     thresholds: {
//         http_req_duration: ['p(95)<500'],
//         my_trend: ['p(95)<400']
//     }
// }

// let myCounter = new Counter('my_cunter')
// let loginPageResponsTrend = new Trend('my_trend')

// export default function () {

// let res = http.get('https://quickpizza.grafana.com/')
// myCounter.add(1)
// sleep(1)

// res = http.get('https://quickpizza.grafana.com/login')
// loginPageResponsTrend.add(res.timings.duration)
// sleep(1)

// }


import http from 'k6/http';
import { sleep, group, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250']
    }
}

export default function () {

    group('Main page', function () {

      let res = http.get(`${BASE_URL}`);
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
        http.get(`${BASE_URL}/_app/immutable/assets/4.CUFAU9yT.css`)
        http.get(`${BASE_URL}/_app/immutable/entry/start.BIADwWBQ.js`)
        })
    });

        group('Login page', function () {
        http.get('https://quickpizza.grafana.com/login')
      
    });

    sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds.
}


//k6 run -e BASE_URL=https://quickpizza.grafana.com first-script.js