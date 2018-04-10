var mymap = L.map('map',{attributionControl:false}).setView([45.525, -73.565], 12);

// Limiter la carte à la région de Montréal :
mymap.setMaxBounds([[45.723, -73.928], [45.393, -73.333]]);
mymap.setMinZoom(10);

// Définir les différentes couches de base :
var mapboxStreetsKG = L.tileLayer('https://api.mapbox.com/styles/v1/kgrize/cjc4xa98027wo2spbtfi83maw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2dyaXplIiwiYSI6ImNqYWw2YjhvZTJuYTEzM3F1MzJqam1nOXAifQ.euhcjUi3_GjcQYOntzP0yg', {
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
  }
);

var mapboxLightKG = L.tileLayer('https://api.mapbox.com/styles/v1/kgrize/cjc50jr9l156f2snw0w5c4rr2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2dyaXplIiwiYSI6ImNqYWw2YjhvZTJuYTEzM3F1MzJqam1nOXAifQ.euhcjUi3_GjcQYOntzP0yg', {
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
  }
);

// Ajouter la couche de base par défaut à la carte :
mapboxStreetsKG.addTo(mymap);

// Créer les boutons pour changer la couche de base :
var baseLayers = {
  "Mapbox streets": mapboxStreetsKG,
  "Mapbox noir/blanc": mapboxLightKG
};
var overlays = {};
L.control.layers(baseLayers, overlays).addTo(mymap);

// Changer de fond de carte en fonction du zoom :
mymap.on('zoom', function(e){
  if (mymap.getZoom()<12){
    mymap.removeLayer(mapboxStreetsKG);
    mapboxLightKG.addTo(mymap)
  } else {
    mymap.removeLayer(mapboxLightKG);
    mapboxStreetsKG.addTo(mymap)
  }
});

// Changer la position des sources des fonds de carte :
L.control.attribution({position: 'bottomleft'}).addTo(mymap);

// Ajouter une échelle à la carte (métrique seulement) http://leafletjs.com/reference-1.2.0.html#control-scale :
L.control.scale({imperial: false, position: 'bottomright'}).addTo(mymap);

// Créer les icônes pour les marqueurs :
var icones = {};

icones['resto'] = L.icon({
  iconUrl: 'icones/resto.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['cafe'] = L.icon({
  iconUrl: 'icones/cafe.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['brunch'] = L.icon({
  iconUrl: 'icones/brunch.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['bar'] = L.icon({
  iconUrl: 'icones/bar.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['visite'] = L.icon({
  iconUrl: 'icones/visite.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['hotel'] = L.icon({
  iconUrl: 'icones/hotel.svg',
  iconSize: [28, 41],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

// Créer les marqueurs et boucle pour les afficher sur la carte (avec une info-bulle) :
var pois = {
  AROSE: { nom: "Airbnb Rosemont", icone: "hotel", descr: "Airbnb_Rosemont.png", coords: [45.550752, -73.597499] },
  APLAT: { nom: "Airbnb Plateau", icone: "hotel", descr: "Airbnb_Plateau.png", coords: [45.514580, -73.573720] },
  AOLD: { nom: "Airbnb Vieux-Montréal", icone: "hotel", descr: "Airbnb_OldMTL.png", coords: [45.509857, -73.552497] },
  ADOWN: { nom: "Airbnb Downtown", icone: "hotel", descr: "Airbnb_Centre.png", coords: [45.496584, -73.571938] },
  AHOCH: { nom: "Airbnb Hochelaga", icone: "hotel", descr: "Airbnb_Hochelaga.png", coords: [45.546365, -73.541493] },

  VJEAN: { nom: "Marché Jean-Talon", icone: "visite", descr: "marche.png", coords: [45.536665, -73.614660] },
  VBOTA: { nom: "Jardin Botanique", icone: "visite", descr: "jardinbotanique.png", coords: [45.560334, -73.562191] },
  VJARR: { nom: "Station de métro Jarry", icone: "visite", descr: "jarry.png", coords: [45.543246, -73.628307] },
  VMONT: { nom: "Mont Royal", icone: "visite", descr: "montroyal.png", coords: [45.503560, -73.586983] },
  VORAT: { nom: "Oratoire Saint-Joseph", icone: "visite", descr: "oratoire.png", coords: [45.492593, -73.618316] },
  VDAME: { nom: "Basilique Notre-Dame", icone: "visite", descr: "basilique.png", coords: [45.504560, -73.556045] },
  VHABI: { nom: "Habitat 67", icone: "visite", descr: "habitat67.png", coords: [45.500084, -73.543832] },
  VSILO: { nom: "Silo 5", icone: "visite", descr: "silo5.png", coords: [45.493183, -73.550810] },
  VARME: { nom: "Station de métro Place-d’Armes", icone: "visite", descr: "metroarmes.png", coords: [45.505027, -73.559604] },
  VPARC: { nom: "Parc Olympique", icone: "visite", descr: "parcolympique.png", coords: [45.559954, -73.551126] },
  VPONT: { nom: "Pont Jacques Cartier", icone: "visite", descr: "pont.png", coords: [45.522336, -73.544520] },
  VVILL: { nom: "Village gai", icone: "visite", descr: "villagegai.png", coords: [45.515890, -73.558556] },
  VBIOS: { nom: "Biosphère", icone: "visite", descr: "biosphere.png", coords: [45.514132, -73.531514] },
  VROND: { nom: "La Ronde", icone: "visite", descr: "laronde.png", coords: [45.522737, -73.534601] },

  BVELO: { nom: "Le Vieux Vélo", icone: "brunch", descr: "vieuxvelo.png", coords: [45.531209, -73.607821] },
  BREGI: { nom: "Chez Régine", icone: "brunch", descr: "regine.png", coords: [45.543590, -73.595910] },
  BPASS: { nom: "Le Passé Composé", icone: "brunch", descr: "passecompose.png", coords: [45.520151, -73.556535] },
  BCROI: { nom: "Croissant Croissant", icone: "brunch", descr: "croissant.png", coords: [45.537130, -73.570313] },
  BMELI: { nom: "Mélisse", icone: "brunch", descr: "melisse.png", coords: [45.498416, -73.557790] },
  BCCHO: { nom: "C'ChoColat", icone: "brunch", descr: "cchocolat.png", coords: [45.496550, -73.575264] },
  BTRUI: { nom: "Chez Ma Grosse Truie Chérie", icone: "brunch", descr: "truie.png", coords: [45.526131, -73.559402] },

  COUBL: { nom: "Les Oubliettes", icone: "cafe", descr: "oubliettes.png", coords: [45.533530, -73.601180] },
  CBRUM: { nom: "La Brume Dans Mes Lunettes", icone: "cafe", descr: "brumelunette.png", coords: [45.535147, -73.608621] },
  CNOBL: { nom: "Noble Café", icone: "cafe", descr: "noble.png", coords: [45.527353, -73.589000] },
  CTOMM: { nom: "Tommy Café", icone: "cafe", descr: "tommy.png", coords: [45.503703, -73.557325] },
  CCREW: { nom: "Crew Collective & Café", icone: "cafe", descr: "crewcollective.png", coords: [45.502366, -73.559262] },
  CMYRI: { nom: "Myriade Café", icone: "cafe", descr: "myriade.png", coords: [45.500485, -73.571936] },
  CFARI: { nom: "De Farine Et d’Eau Fraiche", icone: "cafe", descr: "farine.png", coords: [45.519116, -73.560406] },

  RBOUL: { nom: "La Boulette", icone: "resto", descr: "boulette.png", coords: [45.546608, -73.593730] },
  RBANQ: { nom: "La Banquise", icone: "resto", descr: "banquise.png", coords: [45.525345, -73.584763] },
  RTRIE: { nom: "Tri Express", icone: "resto", descr: "triexpress.png", coords: [45.535347, -73.581845] },
  RBIGJ: { nom: "Big in Japan Restaurant", icone: "resto", descr: "biginjapresto.png", coords: [45.515090, -73.574775] },
  RGARD: { nom: "Garde Manger", icone: "resto", descr: "gardemanger.png", coords: [45.502781, -73.555627] },
  RVENI: { nom: "Venice MTL", icone: "resto", descr: "venicemtl.png", coords: [45.503199, -73.556369] },
  RIMAD: { nom: "Imadake", icone: "resto", descr: "imadake.png", coords: [45.488818, -73.584919] },
  RDUMP: { nom: "Oh!Dumplings", icone: "resto", descr: "ohdumplings.png", coords: [45.507689, -73.560306] },
  RKITC: { nom: "Kitchenette", icone: "resto", descr: "kitchenette.png", coords: [45.518994, -73.552385] },

  BAISL: { nom: "Isle de Garde Brasserie", icone: "bar", descr: "isledegarde.png", coords: [45.537572, -73.602019] },
  BABIG: { nom: "Big in Japan Bar", icone: "bar", descr: "biginjapbar.png", coords: [45.517941, -73.581241] },
  BABIL: { nom: "Bily Kun", icone: "bar", descr: "bilykun.png", coords: [45.523506, -73.583219] },
  BAPIN: { nom: "Ping Pong Club", icone: "bar", descr: "pingpong.png", coords: [45.527200, -73.601821] },
  BAJOH: { nom: "John Michael’s Pub", icone: "bar", descr: "johnmichaelspub.png", coords: [45.508014, -73.553949] },
  BABLU: { nom: "Blumenthal", icone: "bar", descr: "blumenthal.png", coords: [45.506745, -73.566776] },
  BAPIE: { nom: "Village au Pied-du-Courant", icone: "bar", descr: "piedducourant.png", coords: [45.526317, -73.544554] },
  BAPIK: { nom: "Piknic Electronik", icone: "bar", descr: "piknic.png", coords: [45.515692, -73.535894] },
};

for (var k in pois){
  var poi = pois[k];
  var marqueur = L.marker(poi.coords, {icon: icones[poi.icone]}).addTo(mymap);
  marqueur.bindPopup("<b>"+poi.nom+'</b><br><img src="images/'+poi.descr+'" class="popup '+poi.icone+'">');
  poi.marqueur = marqueur;
}

// Ajouter la couches des polygones des quartiers (geoJSON):
var polyMtlStyle = {
  "color": "#666",
  "weight": 2,
  "opacity": 1
};

// Ajouter l'interactivité pour les polygones (cf. tuto http://leafletjs.com/examples/choropleth/) :
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.40
    });
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  feature.layer = layer;
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(polyMtl, {
    style: polyMtlStyle,
    onEachFeature: onEachFeature
}).addTo(mymap);

// Rechercher quartiers via menu select :
function findQuartier(quartier){
  for (var i in polyMtl.features) {
    var feat = polyMtl.features[i];
    if (feat.properties.name == quartier) return feat;
  }
  return null;
}

$('.recherche select').on('change', function(e){
  var quartier = $('.recherche select').val();
  if (quartier == '') {
    mymap.setView(new L.LatLng(45.525, -73.565), 12);
    return;
  }
  var feat = findQuartier(quartier);
  mymap.fitBounds(feat.layer.getBounds())
  //mymap.flyToBounds(feat.layer.getBounds()); autre variante pour zoomer sur le quartier
});

// Filtrer marqueurs affichés via menu checkbox :
function listeCheckboxCoches(){
  var checkboxes = $('input:checkbox');
  var liste = [];
  for (var i in checkboxes){
    chb = checkboxes[i];
    if (chb.checked) { liste.push(chb.id); }
  }
  return liste;
}

$('input:checkbox').change(function(){
  var pois_actifs = listeCheckboxCoches();
  for (var k in pois){
    var poi = pois[k];
    if (pois_actifs.indexOf(poi.icone) >= 0){
      poi.marqueur.addTo(mymap);
    } else {
      mymap.removeLayer(poi.marqueur);
    }
  }
});

// Afficher le poi le plus proche de n'importe quel endroit sur la carte (et zoom dessus au clic depuis la sidebar) (https://github.com/mapbox/leaflet-knn):
mymap.on('click', function(e){
  var coord = e.latlng;
  var gj = L.geoJson(ptMarqueurs);
  var nearest = leafletKnn(gj).nearest(L.latLng(coord), 1);
  for (var i in ptMarqueurs.features){
    dic = ptMarqueurs.features[i].geometry.coordinates[0];
    var near = nearest[0].lon;
    if (dic == near ) {
      $('#near').html('Le point d&rsquo;intérêt le plus proche est : <br> <span>' + ptMarqueurs.features[i].properties.name + '</span>');
      document.getElementById('near').classList.add('nearPois');
      $('#near').on('click', function(e){
        mymap.flyToBounds(nearest);
        });
    }
  }
});

// Afficher les coordonnées :
mymap.on('mousemove', function(e){
  var coord = e.latlng;
  $('#coordonnees').html('Coordonnées : ' + coord.lat.toFixed(5) +' / '+ coord.lng.toFixed(5));
});

// Fonction pour recentrer la carte et en faire un bouton directement sur la carte (https://github.com/CliffCloud/Leaflet.EasyButton) :
L.easyButton('<img src="icones/center.svg">', function centrer() {
    mymap.setView(new L.LatLng(45.525, -73.565), 12)
}).addTo(mymap);

// test
console.log("hello")
