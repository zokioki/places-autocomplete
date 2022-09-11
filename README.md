## places-autocomplete

This library provides an autocomplete component for the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/).

### Getting Started

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

| Option                     | Description                                                                | Default          |
| -------------------------- | -------------------------------------------------------------------------- | ---------------- |
| `input`                    | An input element to attach the autocomlete to (required).                  | -                |
| `mapboxToken`              | The mapbox access token used for the API requests (required).              | -                |
| `mapInstance`              | A `mapboxgl.Map` instance, syncs map position to autocomlete selection (required). | -        |
| `className`                | Specifies the class name for the autocomplete suggestions container.       | -                |
| `minLength`                | Minimum amount of characters needed to trigger autocomplete.               | `2`              |
| `debounce`                 | Time in milliseconds to delay the autocomplete between keystrokes.         | `200`            |
| `preventSubmit`            | If true, prevents the input from submitting its form on Enter.             | `false`          |
| `limit`                    | Number of results to return in the autocomplete.                           | `6`              |
| `language`                 | Language of returned Mapbox autocomplete results.                          | browser language |
| `additionalResultsPrepend` | If true, prepends `additionalResults` entries to autocomplete suggestios.  | `false`          |
| `onClear`                  | Function triggered when input is cleared.                                  | -                |
| `onSelect`                 | Function triggered when autocomplete item is selected (args: [item]).      | -                |
| `additionalResults`        | Function triggered before updating autocomplete results, should return array of results (args: [query]).  | - |
| `customize`                | Function triggered before autocomplete results are rendered (args: [input, inputRect, container, maxHeight]). | - |
