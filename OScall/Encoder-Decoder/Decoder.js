function decodeUplink(input) {
      var data = {};
      if (input.fPort == 1) {
      data.voltage = (input.bytes[0]/10);
      data.reason = 0;
      }
      else {
      data.reason = input.fPort;
      data.voltage = (input.bytes[0]/10);
      let Mac_add = [];
      for (let i= 1; i < input.bytes.length; i++) {
        Mac_add[i] = input.bytes[i];
      }
      let mac_rssi_combi = Mac_add.map((byte) => {
        return String.fromCharCode(byte);
      }).join("");
      mac_rssi_combi = mac_rssi_combi.split("|");
      mac_rssi_combi.pop();
      data.mac = [];
      data.rssi = [];
      let j = 0;
      for (let i= 0; i < mac_rssi_combi.length; i++) {
        data.mac[j] = mac_rssi_combi[i];
        data.rssi[j] =  parseInt(mac_rssi_combi[i + 1]);
        i++
        j++
      }
      }
      return {
      data: data,
      warnings: [],
      errors: []
      };
    }