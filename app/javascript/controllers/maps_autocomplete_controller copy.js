import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "address", "country", "region" ]

  connect() {
    this.initializeAutocomplete(this.addressTarget, { types: ['geocode'] });
    this.initializeAutocomplete(this.countryTarget, { types: ['(regions)'] });
  }

  initializeAutocomplete(target, options) {
    let autocomplete = new google.maps.places.Autocomplete(target, options);

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        console.error("No geometry found for selected place.");
        return;
      }

      // Mettre à jour les champs de ville et de pays
      this.updateLocationFields(place);
    });

    // ... le reste du code
  }

  updateLocationFields(place) {
    // Mettre à jour les champs d'adresse, pays et région
    this.addressTarget.value = place.formatted_address || "";
    if (place.address_components) {
      place.address_components.forEach((component) => {
        if (component.types.includes("country")) {
          this.countryTarget.value = component.short_name || "";
        }
        // type "locality" qui correspond généralement à la ville
        if (component.types.includes("locality")) {
          this.regionTarget.value = component.short_name || "";
        }
      });
    }
  }
}
