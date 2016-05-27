var map;
require([
    "esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/dijit/HomeButton",
    "esri/urlUtils", "esri/domUtils",
    "dojo/cookie",
    "dojo/parser",
    "dojo/dom-style",
    "dojo/dom",
    "dojo/dom-geometry",
    "dojo/domReady!"
], function (Map, Tiled, HomeButton, UrlUtils, domUtils, cookie, parser, domStyle, dom, domGeometry) {
    parser.parse();
    domStyle.set(dom.byId("map"), {border: "1px SOLID #000000", width: (domGeometry.getContentBox("navTable").w - 20) + "px", height: (domUtils.documentBox.h - domGeometry.getContentBox("navTable").h - 40) + "px"}
        );
    map = new Map("map");
    var home = new HomeButton({map: map}, "homeButton");
    home.startup();
    var layer = null,
        layerUrl = "/tiles/7WaXTZEsI88qiQGw/arcgis/rest/services/GT_BaseMap/MapServer",
        urlObject = UrlUtils.urlToObject(window.location.href),
        token = cookie("arcgis-tile-servers-prd0") || (urlObject && urlObject.query && urlObject.query.token),
        tokenFromServer = null;
    if (token) {
        layerUrl += ("?token=" + token);
    } else if (tokenFromServer) {
        layerUrl += ("?token=" + tokenFromServer);
    }
    layer = new Tiled(layerUrl, {
        tileServers : ["https://tiles1.arcgis.com/tiles/7WaXTZEsI88qiQGw/arcgis/rest/services/GT_BaseMap/MapServer", "https://tiles2.arcgis.com/tiles/7WaXTZEsI88qiQGw/arcgis/rest/services/GT_BaseMap/MapServer", "https://tiles3.arcgis.com/tiles/7WaXTZEsI88qiQGw/arcgis/rest/services/GT_BaseMap/MapServer", "https://tiles4.arcgis.com/tiles/7WaXTZEsI88qiQGw/arcgis/rest/services/GT_BaseMap/MapServer"]
    });
    map.addLayer(layer);
});
