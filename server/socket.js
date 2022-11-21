import moment from 'moment';
import ping from 'ping';

// TODO: removed default locations
let locations = [{ address: '10.0.0.1', history: [] }, { address: '10.10.10.1', history: [] }];

export const addSocket = (io) => {
  const pingLocation = async(location) => {
    while (locations.some(e => e.address === location.address)) {
      const address = location.address;

      try {
        const pingResult = await ping.promise.probe(address);
        const pingTime = pingResult.time;

        const history = location.history;
        const value = [
          moment().unix() * 1000,
          pingResult.alive ? pingTime : null
        ];

        history.push(value);

        io.emit('ping', {
          address,
          value
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        io.emit('ping', {
          address,
          value: null
        });
      }
    }
  };

  const pingLocations = async() => {
    locations.forEach(location => {
      location.history.push(moment().unix() * 1000);
      pingLocation(location);
    });
  };

  pingLocations();

  io.on('connection', (socket) => {
    socket.emit('locations', locations);

    socket.on('addLocation', (location) => {
      if (!locations.some((l) => l.address === location)) {
        let addedLocation = {
          address: location,
          history: []
        };

        locations.push(addedLocation);

        io.emit('locations', locations);
        pingLocation(addedLocation);
      } else {
        socket.emit('error', 'location.exists');
      }
    });

    socket.on('removeLocation', (address) => {
      locations = locations.filter((l) => l.address !== address);

      io.emit('locations', locations);
    });
  });
};
