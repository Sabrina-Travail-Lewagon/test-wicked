// app/javascript/controllers/maps_autocomplete_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["address", "country"]

  connect() {
    this.initializeAutocomplete(this.addressTarget, { types: ['geocode'], componentRestrictions: { country: 'FR' } });
    this.initializeAutocomplete(this.countryTarget, { types: ['(regions)'] });
  }

  initializeAutocomplete(target, options) {
    let autocomplete = new google.maps.places.Autocomplete(target, options);

    google.maps.event.addListener(autocomplete, 'keydown', function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  }

  validateForm(event) {
    const location = this.countryTarget.value;
    const place = this.addressTarget.value;

    if (!place || place === "") {
      // L'adresse n'a pas été saisie
      this.addressTarget.classList.add("invalid-address");
      event.preventDefault(); // Empêcher la soumission du formulaire
      return;
    }

    // Vérifier si l'adresse est conforme à la région choisie
    const addressComponents = place.split(",");
    const addressRegion = addressComponents[addressComponents.length - 1].trim();

    if (!addressRegion.includes(location)) {
      // L'adresse ne correspond pas à la région choisie
      this.addressTarget.classList.add("invalid-address");
      event.preventDefault(); // Empêcher la soumission du formulaire
    } else {
      // L'adresse est conforme à la région choisie
      this.addressTarget.classList.remove("invalid-address");
      // Ne pas empêcher la soumission du formulaire
    }
  }
}
