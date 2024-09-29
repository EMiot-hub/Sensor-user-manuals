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

    if (ble_prefix_1_index === -1 && input.data.ble_prefix_1.length === 6) {
        ble_prefix_1_index = 4;
        ble_prefix_1_value = input.data.ble_prefix_1;
    }else if  (ble_prefix_1_index === -1) {
        ble_prefix_1_index = 255;
    }

    if (ble_prefix_2_index === -1 && input.data.ble_prefix_2.length === 6) {
        ble_prefix_2_index = 4;
        ble_prefix_2_value = input.data.ble_prefix_2;
    }else if  (ble_prefix_2_index === -1) {
        ble_prefix_2_index = 255;
    }

    if (ble_prefix_3_index === -1 && input.data.ble_prefix_3.length === 6) {
        ble_prefix_3_index = 4;
        ble_prefix_3_value = input.data.ble_prefix_3;
    }else if  (ble_prefix_3_index === -1) {
        ble_prefix_3_index = 255;
    }

    var bytes = [
        heatbeat_interval.indexOf(input.data.heatbeat_interval) >= 0 ? heatbeat_interval.indexOf(input.data.heatbeat_interval) : 255,
        confirmed_heatbeat.indexOf(input.data.confirmed_heatbeat) >= 0 ? confirmed_heatbeat.indexOf(input.data.confirmed_heatbeat) : 255,
        ble_scanner.indexOf(input.data.ble_scanner) >= 0 ? ble_scanner.indexOf(input.data.ble_scanner) : 255,
        ble_prefix_1_index,
        ble_prefix_2_index,
        ble_prefix_3_index,
        factory_reset.indexOf(input.data.factory_reset) >= 0 ? factory_reset.indexOf(input.data.factory_reset) : 255,
        scan_time.indexOf(input.data.scan_time) >= 0 ? scan_time.indexOf(input.data.scan_time) : 255
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

    // Convert byte array to hex string
    var hexString = bytes.map(function(byte) {
        return ("0" + byte.toString(16)).slice(-2);  // Ensures two-digit hex values
    }).join("");

    return {
        hexString: hexString.toUpperCase(),
        fPort: 10
    };
}


// Input data
var Input_config = {
    data: {
        heatbeat_interval: 120,
        confirmed_heatbeat: true,
        ble_scanner: "on",
        ble_prefix_1: "111111",
        ble_prefix_2: "222222",
        ble_prefix_3: "",
        scan_time: 1,
        factory_reset: ""
      }
};

// Run the encoding function
var result = encodeDownlink(Input_config);
console.log(result);
