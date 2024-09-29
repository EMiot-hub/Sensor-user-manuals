var heatbeat_interval = [30, 60, 120, 240, 360, 480, 600, 720];
var confirmed_heatbeat = [false, true];
var ble_scanner = ["off", "on"];
var ble_prefix = ["ac233f","oc0001","oc0002","oc0003"];
var factory_reset = ["yes"];
var scan_time = [1, 2];

function encodeDownlink(input) {
    var ble_prefix_1_index = ble_prefix.indexOf(input.data.ble_prefix_1);
    var ble_prefix_2_index = ble_prefix.indexOf(input.data.ble_prefix_2);
    var ble_prefix_3_index = ble_prefix.indexOf(input.data.ble_prefix_3);

    var ble_prefix_1_value = null;
    var ble_prefix_2_value = null;
    var ble_prefix_3_value = null;

    if (ble_prefix_1_index === -1) {
        ble_prefix_1_index = 4;
        ble_prefix_1_value = input.data.ble_prefix_1;
    }

    if (ble_prefix_2_index === -1) {
        ble_prefix_2_index = 4;
        ble_prefix_2_value = input.data.ble_prefix_2;
    }

    if (ble_prefix_3_index === -1) {
        ble_prefix_3_index = 4;
        ble_prefix_3_value = input.data.ble_prefix_3;
    }

    var bytes = [
        heatbeat_interval.indexOf(input.data.heatbeat_interval),
        confirmed_heatbeat.indexOf(input.data.confirmed_heatbeat),
        ble_scanner.indexOf(input.data.ble_scanner),
        ble_prefix_1_index,
        ble_prefix_2_index,
        ble_prefix_3_index,
        factory_reset.indexOf(input.data.factory_reset),
        scan_time.indexOf(input.data.scan_time)
    ];

    if (ble_prefix_1_value) {
        for (var j = 0; j < ble_prefix_1_value.length; j += 2) {
            bytes.push(parseInt(ble_prefix_1_value.substr(j, 2), 16));
        }
    }

    if (ble_prefix_2_value) {
        for (var k = 0; k < ble_prefix_2_value.length; k += 2) {
            bytes.push(parseInt(ble_prefix_2_value.substr(k, 2), 16));
        }
    }

    if (ble_prefix_3_value) {
        for (var l = 0; l < ble_prefix_3_value.length; l += 2) {
            bytes.push(parseInt(ble_prefix_3_value.substr(l, 2), 16));
        }
    }

    return {
        bytes: bytes,
        fPort: 10,
    };
}


function decodeDownlink(input) {
    var decoded = {
        data: {
            heatbeat_interval: heatbeat_interval[input.bytes[0]],
            confirmed_heatbeat: confirmed_heatbeat[input.bytes[1]],
            ble_scanner: ble_scanner[input.bytes[2]],
            ble_prefix_1: ble_prefix[input.bytes[7]],
            ble_prefix_2: ble_prefix[input.bytes[8]],
            ble_prefix_3: ble_prefix[input.bytes[9]],
            factory_reset: factory_reset[input.bytes[10]],
            scan_time: scan_time[input.bytes[11]]
        }
    };

    var prefixStartIndex = 12;

    if (decoded.data.ble_prefix_1 === "custom" && input.bytes.length > prefixStartIndex) {
        var customPrefix1 = "";
        for (var j = prefixStartIndex; j < prefixStartIndex + 6; j++) {
            customPrefix1 += ("0" + input.bytes[j].toString(16)).slice(-2);
        }
        decoded.data.ble_prefix_1 = customPrefix1;
        prefixStartIndex += 6;
    }

    if (decoded.data.ble_prefix_2 === "custom" && input.bytes.length > prefixStartIndex) {
        var customPrefix2 = "";
        for (var k = prefixStartIndex; k < prefixStartIndex + 6; k++) {
            customPrefix2 += ("0" + input.bytes[k].toString(16)).slice(-2);
        }
        decoded.data.ble_prefix_2 = customPrefix2;
        prefixStartIndex += 6;
    }

    if (decoded.data.ble_prefix_3 === "custom" && input.bytes.length > prefixStartIndex) {
        var customPrefix3 = "";
        for (var l = prefixStartIndex; l < prefixStartIndex + 6; l++) {
            customPrefix3 += ("0" + input.bytes[l].toString(16)).slice(-2);
        }
        decoded.data.ble_prefix_3 = customPrefix3;
    }

    return decoded;
}

