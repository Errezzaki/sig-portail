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
       container: "ViewDiv" // Div element
      // Basemap layer service
      
   
   
   });

   let basemapGallery = new BasemapGallery({
       view: view
     });
     // Add widget to the top right corner of the view
     view.ui.add(basemapGallery, {
       position: "bottom-right"
     });

     let legend = new Legend({
       view: view
     });
     
     view.ui.add(legend, "bottom-left");

     const communes = new FeatureLayer({
        outfield: ["*"],
       // URL to the service
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/Communes/FeatureServer",
       renderer:{
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [ 227, 0, 255, 0.5],
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
       popupTemplate: {
       title: "Quartier: {NOM}",
       
   }});

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
       url: "https://services5.arcgis.com/COXG5Pot3CiQGdXo/arcgis/rest/services/casa_population1/FeatureServer",});

   map.addMany([communes, quartier, bidonVille,voirie,population]);
   });