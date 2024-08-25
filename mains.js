window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 3,
            maxZoom: 21,
            minZoom: 3,
            rotation: 0,
            projection: 'EPSG:4326'
        }),
        // layers: [
        //     new ol.layer.Tile({
        //         source: new ol.source.OSM(),
        //         visible: true
        //     })
        // ],
        target: "map",
    })

    const osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMLayer'
    })
    map.addLayer(osmLayer);

    const bingMapLayer = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: 'Anzbo5_U1A0SuxVZpc8rqUBSRLsHmJ1ZgCGzhYnxXKpkpm9k3SuyK7OgitBhBPUs',
            imagerySet: 'AerialWithLabelsOnDemand'
        }),
        visible: false,
        title: 'BingMapLayer'
    })
    map.addLayer(bingMapLayer);

    const arcGISRestLayer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
            attributions: 'US Bureau of the Census: http://www.census.gov',
            url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
        }),
        visible: false,
        title: 'ArcGISRestLayer'
    })
    map.addLayer(arcGISRestLayer);

    const tileWMSLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?',
            attributions: 'NOAA Quantitative Precipitation Estimates (Time Enabled)',
            params: {
                LAYERS: 1,
                FORMAT: 'image/png',
                TRANSPARENT: true
            }
        }),
        visible: false,
        title: 'TileWMSLayer'
    })
    map.addLayer(tileWMSLayer)

    const stamenLayer = new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'watercolor'
        }),
        visible: false,
        title: 'StamenLayer'
    })
    map.addLayer(stamenLayer);

    const stamenXYZLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
        }),
        visible: false,
        title: 'StamenXYZLayer'
    })
    map.addLayer(stamenXYZLayer);

    const cartoLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png'
        }),
        visible: false,
        title: 'CartoDBLayer'
    })
    map.addLayer(cartoLayer);

    const tileDebugLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        visible: false,
        title: 'TileDebugLayer'
    })
    map.addLayer(tileDebugLayer);

    cartoLayer.getSource().setAttributions("<a href='https://carto.com/'>Carto</a>");
    stamenXYZLayer.getSource().setAttributions("Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>.")

    // bingMapLayer.setExtent([64.26449325105203, 4.960262496982999, 97.55184254154747, 35.82978067347286])
    // bingMapLayer.setOpacity(0.5);
    // map.on('click', function(e){
    //     console.log(e.coordinate);
    // })

    const baseLayerElements = document.querySelectorAll('#grid1 > input[type = radio]')
    for (let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let elementValue = this.value;
            map.getLayers().forEach(element => {
                let elementTitle = element.get('title');
                if (elementValue === elementTitle) {
                    element.setVisible(true);
                } else {
                    element.setVisible(false);
                }
            })
        })
    }

    const overlayLayerElements = document.querySelectorAll('#grid1 > input[type = checkbox]')
    for (let overlayLayerElement of overlayLayerElements){
        overlayLayerElement.addEventListener('change', function(){
            let overlayelementValue = this.value;
            map.getLayers().forEach(element => {
                let overlayelementTitle = element.get('title');
                if (overlayelementValue === overlayelementTitle) {
                    element.setVisible(! element.getVisible());
                }
            })
        })
    }
}