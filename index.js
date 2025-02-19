require(["esri/config", 
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend",
    "esri/PopupTemplate"], function(esriConfig,
       Map,
        MapView,
        BasemapGallery,
        FeatureLayer,
        Legend,
        PopupTemplate) {
       esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurELHl1KVHjIyEGVCnX3tK8cYrndRr-pVKYSBNYqjGqYcHg3DEgVa43pVNiZAE2mx1w1wQkq0YpkBW7NFj9H97MVakILV7VKZy0iFbr36EStbWEWokc-ykxgNwpZ2OkzxSrufhDjW9M7R_4_xIcx7XaPKT6tFA3xOZaIWaeyMlixjh83QUKzwYrzW2vclkrxNwKEQa0cBpH7cm6pOHyNnRPU.AT1_UsZ8nxKF";
       const map = new Map({
       basemap: "arcgis-topographic" // Basemap layer service
       });
       const view = new MapView({
       map: map,
       center: [-7.62, 33.59], // Longitude, latitude
       zoom: 13, // Zoom level
       container: "ViewDiv", // Div element
      // Basemap layer service

   
   });

   view.ui.remove("zoom");

   let basemapGallery = new BasemapGallery({
       view: view,
       container: "basemapGalleryDiv"
     });
     // Add widget to the top right corner of the view
     

     let legend = new Legend({
       view: view,
       container: "legendDiv"
     });
     
     

     const communes = new FeatureLayer({
        outfield: ["*"],
       // URL to the service
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/Communes/FeatureServer",
       renderer:{
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [ 255, 255, 122, 0.5],
                outline: {
                     color: [ 255, 255, 255],
                     width: 1
                }
              }
       },
         // Popup template
         popupTemplate: {
         title: "Commune: {COMMUNE_AR}",
         content: "Superficie: {Shape__Area} m²<br>"
     }});
   
     let quartier = new FeatureLayer({
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/Quartier/FeatureServer",
       // Popup template
       renderer :{
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [ 0, 255, 255, 0.5],
                outline: {
                     color: [ 255, 255, 255],
                     width: 1}
       },
       popupTemplate: {
       title: "Quartier: {NOM}",
       
   }}});

     let bidonVille = new FeatureLayer({
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/Bidonvilles/FeatureServer",});  

   let voirie = new FeatureLayer({
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/voirie_casa_1/FeatureServer",
       // Popup template
       popupTemplate: {
       title: "Voirie: {NOM}",
       content: "Longueur: {Shape__Length} m<br>"
   }});

   let population = new FeatureLayer({
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/casa_population1/FeatureServer",
       // Popup template 
       popupTemplate: {
        title: "<b>Population de : {ARRONDISSE}</b>",
        content: [{
        type: "media",
        mediaInfos: [{
        type: "column-chart",
        caption: "Statistiques de Casablanca",
value: {
fields: [ "TOTAL1994","TOTAL2004" ],
normalizeField: null,
tooltipField: ""
}
}]
}]
   }});

   map.addMany([communes, quartier, bidonVille,voirie,population]);


   view.when(() => {
    document.getElementById("toggleBasemap").addEventListener("click", function() {
        togglePanel("basemapPanel");
    });

    document.getElementById("toggleLegend").addEventListener("click", function() {
        togglePanel("legendPanel");
    });

    function togglePanel(panelId) {
        let panel = document.getElementById(panelId);
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            document.getElementById("basemapPanel").style.display = "none";
            document.getElementById("legendPanel").style.display = "none";
            panel.style.display = "block";
        }
    }
    window.closePanel = function(panelId) {
      document.getElementById(panelId).style.display = "none";
  }


  document.getElementById("toggleLayers").addEventListener("click", function() {
    togglePanel("layersPanel");
});

function togglePanel(panelId) {
    let panel = document.getElementById(panelId);
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        document.getElementById("basemapPanel").style.display = "none";
        document.getElementById("legendPanel").style.display = "none";
        document.getElementById("layersPanel").style.display = "none";
        panel.style.display = "block";
    }
}
});
   });



  