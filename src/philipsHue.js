export {pingBridge}

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

    const result = new Promise(function(resolve, reject) { // Create a promise
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({'devicetype': username})
        }).then(function(data) {
            console.log('success')
            console.log(data)
            resolve(data.json())
        }).catch(function(error) {
            console.log('error')
            console.log(error)
            reject(error)
        })
    })

    return result // Return the data
}

window.addEventListener('error', function(e) {
    console.log('sjflkdjs')
    console.log(e)
})