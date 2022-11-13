// TODO: removed default locations
let locations = [
  {
    address: '10.0.0.1',
    history: []
  },
  {
    address: '10.10.10.1',
    history: []
  }
];

export const addSocket = (io) => {
  io.on('connection', (socket) => {
    socket.emit('locations', locations);

    socket.on('addLocation', (location) => {
      if (!locations.some((l) => l.address === location.address)) {
        locations.push({
          address: location,
          history: []
        });

        io.emit('locations', locations);
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
