AFRAME.registerComponent("atoms", {
  init: async function () {

    //Obtener los detalles de la composición del elemento
    var compounds = await this.getCompounds();

    var barcodes = Object.keys(compounds);

    barcodes.map(barcode => {
      var element = compounds[barcode];

      //Llamar a la función
      this.createAtoms(element);
    });

  },
  getCompounds: function () {
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
  getElementColors: function () {
    return fetch("js/elementColors.json")
      .then(res => res.json())
      .then(data => data);
  },
  createAtoms: async function (element) {

    //Datos del elemento
    var elementName = element.element_name;
    var barcodeValue = element.barcode_value;
    var numOfElectron = element.number_of_electron;

    //Obtener el color del elemento
    var colors = await this.getElementColors();

    //Escena
    var scene = document.querySelector("a-scene");

    //Añadir entidad de marcador para el marcador de código de barras
    var marker = document.createElement("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("element_name", elementName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);

    var atom = document.createElement("a-entity");
    atom.setAttribute("id", `${elementName}-${barcodeValue}`);
    marker.appendChild(atom);

    //Crear tarjeta de átomo
    var card = document.createElement("a-entity");
    card.setAttribute("id", `card-${elementName}`);
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1
    });

    card.setAttribute("material", {
      src: `./assets/atom_cards/card_${elementName}.png`
    });

    card.setAttribute("position", { x: 0, y: 0, z: 0 });
    card.setAttribute("rotation", { x: -90, y: 0, z: 0 });

    atom.appendChild(card);

    //Crear núcleo
    var nucleusRadius = 0.2;
    var nucleus = document.createElement("a-entity");
    nucleus.setAttribute("id", `nucleus-${elementName}`);
    nucleus.setAttribute("geometry", {
      primitive: "sphere",
      radius: nucleusRadius
    });

    nucleus.setAttribute("material", "color", colors[elementName]);
    nucleus.setAttribute("position", { x: 0, y: 1, z: 0 });

    nucleus.setAttribute("rotation", { x: 0, y: 0, z: 0 });

    var nucleusName = document.createElement("a-entity");
    nucleusName.setAttribute("id", `nucleus-name-${elementName}`);
    nucleusName.setAttribute("position", { x: 0, y: 0.21, z: -0.06 });
    nucleusName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    nucleusName.setAttribute("text", {
      font: "monoid",
      width: 3,
      color: "black",
      align: "center",
      value: elementName
    });

    nucleus.appendChild(nucleusName);

    atom.appendChild(nucleus);
    
    
    /*
    
    
    REMPLAZA EL COMENTARIO CON CÓDIGO
    
    
    
    */

    
  }
});
