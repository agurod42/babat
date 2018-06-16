function isBitcoinAddress(text) {
    // TODO: Improve the validation method (Maybe regex is not the most 
    // convenient) so all kind of BTC address are considered
    return new RegExp('^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$').test(text);
}

function fetchBitcoinAddressBalance(address, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(xhr.status);
            }
        }
    }

    xhr.open('GET', 'https://blockchain.info/es/q/addressbalance/' + address);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
    var scriptElement = document.createElement('script');
    scriptElement.src = safari.extension.baseURI + 'tooltip.min.js';
    document.body.appendChild(scriptElement);
    var scriptElement = document.createElement('script');
    scriptElement.src = safari.extension.baseURI + 'injected.js';
    document.body.appendChild(scriptElement);
});

document.addEventListener('mouseup', function () {
    var selection = window.getSelection();
    var textSelection = selection.toString();
    if (textSelection.length && isBitcoinAddress(textSelection)) {
        fetchBitcoinAddressBalance(textSelection, function (err, balance) {
            if (!err) {
                window.postMessage(balance, window.location.origin);
            }
        });
    }
});