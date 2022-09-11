## places-autocomplete

This library provides an autocomplete component for the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/).

### Usage

- Install the package:

```
npm install --save places-autocomplete
```

- Import and initialize the autocomplete:

```javascript
import PlacesAutocomplete from 'places-autocomplete';
import 'places-autocomplete/index.css';

const autocomplete = new PlacesAutocomplete({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  debounce: 300
});

autocomplete.attachTo(document.querySelector('#my-input-element'));
```

### Options

The autocomplete can be configured with the following options upon initialization:

 - input (required): An input element to attach the autocomplete to.
 - mapboxToken (required): The Mapbox access token used for the API requests.
 - mapInstance (required): A mapboxgl.Map instance, syncs map position to autocomplete selection.
 - className: Specifies the class name for the autocomplete suggestions container.
 - minLength: Minimum amount of characters needed to trigger autocomplete (default: 2).
 - debounce: Time in milliseconds to delay autocomplete call between keystrokes (default: 200).
 - preventSubmit: If true, prevents the input from submitting its form on Enter (default: false).
 - limit: Number of results to return in the autocomplete (default: 6).
 - language: Language of returned Mapbox autocomplete results (default: browser language).
 - additionalResultsPrepend: If true, prepends additionalResults entries to beginning of suggestions (default: false).
 - onClear: Function triggered when input is cleared.
 - onSelect: Function triggered when autocomplete item has been selected (args: [item]).
 - additionalResults: Function triggered before updating autocomplete results, expects array of results (args: [query]).
 - customize: Function triggered before autocomplete results are rendered (args: [input, inputRect, container, maxHeight]).
