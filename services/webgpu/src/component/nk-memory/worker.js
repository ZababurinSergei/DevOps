self.onconnect = (e) => {
    const port = e.ports[0];
    console.log('PORTS: ', e.ports);
    console.log('############################################################################ 2 ########### >>>')
    port.onmessage = (e) => {
        console.log('Shared Worker onmessage', port);
    };

    port.start();
};


console.log('################################################################################## t ##### >>>')