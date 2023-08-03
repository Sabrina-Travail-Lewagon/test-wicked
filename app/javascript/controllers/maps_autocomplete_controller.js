// import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   static targets = [ "address" ]

//   connect() {
//     console.log(this.addressTarget);
//     let autocomplete = new google.maps.places.Autocomplete(this.addressTarget, { types: [ 'geocode' ] });
//     google.maps.event.addListener(autocomplete, 'keydown', function(e) {
//       if (e.key === "Enter") {
//         e.preventDefault(); // Do not submit the form on Enter.
//       }
//     });
//   }
// }
// app/javascript/controllers/maps_autocomplete_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "address", "country" ]

  connect() {
    this.initializeAutocomplete(this.addressTarget, { types: ['geocode'] });
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
}
