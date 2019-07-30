var config = {
  mapConfig: {
    view: {
      center: [39.966493, 116.332979],
      projection: "EPSG:4326",
      zoom: 5
    },
    baseLayer: {
      url:
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" //arcgis
      // url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  //osm
      // url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }
  },
  services: {
    // baseUrl: "http://localhost:8800", // test
    baseUrl: "http://192.168.201.57:8830/",
    wind: {
      windData: "/wind/list"
    }
  }
};
