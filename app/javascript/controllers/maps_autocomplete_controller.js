import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "address", "country", "region" ]

  connect() {
    this.initializeAutocomplete(this.addressTarget, { types: ['geocode'] });
    this.initializeAutocomplete(this.countryTarget, { types: ['(regions)'] });
  }
  // Partie autocompletion du champ address
  initializeAutocomplete(target, options) {
    let autocomplete = new google.maps.places.Autocomplete(target, options);
    // On va écouter le champ address
    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace(); // Récupère l'objet `place` contenant les informations sur l'adresse sélectionnée
      if (!place.geometry) {
        console.error("No geometry found for selected place.");
        return;
      }

      // Mettre à jour les champs de ville et de pays
      this.updateLocationFields(place); // Appelle la fonction `updateLocationFields` avec l'objet `place` en tant qu'argument
    });

  }

  updateLocationFields(place) {
    // Mettre à jour les champs d'adresse, pays et région
    this.addressTarget.value = place.formatted_address || "";
    if (place.address_components) {
      place.address_components.forEach((component) => {
        // Vérifier si le type d'adresse est "country" (pays)
        if (component.types.includes("country")) {
          // Affecter le code court du pays (par exemple, "FR" pour la France) au champ de pays
          this.countryTarget.value = component.short_name || "";
        }
        // Vérifier si le type d'adresse est "locality" (généralement la ville)
        if (component.types.includes("locality")) {
          // Affecter le nom de la ville au champ de région (notez que "region" est peut-être un terme confus ici)
          this.regionTarget.value = component.short_name || "";
        }
      });
    }
  }
}
