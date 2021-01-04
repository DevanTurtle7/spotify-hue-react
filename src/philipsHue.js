export { connectToBridge }

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function generateUsername() {
    /*
    Generates a Philips hue username
    */
    return 'spotify-hue'
}

function pingBridge(ip) {
    /*
    Pings the bridge to try to connect

    Parameters:
        ip: The philips hue bridge ip
    */
    var username = generateUsername(); // Get the username
    var url = 'https://' + ip + '/api'

    const result = new Promise(function (resolve, reject) { // Create a promise
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ 'devicetype': username })
        }).then(async function (data) {
            data = await data.json()
            if (data[0].error != null) {
                // Did not connect to bridge
                if (data[0].error.description === 'link button not pressed') {
                    // The user needs to press the link button
                    resolve('link button') // Resolve the promise
                } else {
                    // Error
                    resolve(null) // Resolve the promise
                }
            } else {
                // Connected to bridge
                var username = data[0].success.username // Get the username from response
                resolve(username) // Resolve the promise
            }
        }).catch(function (error) {
            console.log('Something went wrong')
            console.log(error)
            reject(error)
        })
    })

    return result // Return the data
}

async function connectToBridge(ip) {
    /*
    Connects to philips hue bridge

    Parameters:
        ip: The philips hue bridge ip
    */
    var connectedToBridge = false;
    var bridgeUsername

    const result = new Promise(async function (resolve, reject) { // Create a promise
        while (!connectedToBridge) { // Loop until connected to the bridge
            var response = await pingBridge(ip) // Ping the bridge

            if (response != null) {
                if (response === 'link button') {
                    // Alert the user to press the link button
                    console.log('Press the link button')
                } else {
                    // Connected to the bridge
                    bridgeUsername = response
                    connectedToBridge = true;
                }
            }

            await sleep(5000) // Wait
        }
        console.log(response)

        resolve(bridgeUsername) // Resolve the promise
    })

    return result // Return the response
}