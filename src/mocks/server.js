import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser'

let id = 1;
export const worker = setupWorker(
  http.get('/api/data', (req, res, ctx) => {
    const newData = Array.from({ length: 1 }, () => ({
      id: id++,
      timestamp: new Date().toISOString(),
      deviceId: `device-${Math.floor(Math.random() * 10 + 1)}`,
      frequency: (Math.random() * (1000 - 400) + 400), // Random frequency between 400 and 1000 Hz
      signalStrength: (Math.random() * 100), // Random signal strength between 0 and 100%
      location: ['New York, USA', 'Tokyo, Japan', 'London, UK'][Math.floor(Math.random() * 3)],
    }));

    return HttpResponse.json(newData, {
      status: 200,
      statusText: 'OK',
    });
  })
);