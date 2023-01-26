## places-autocomplete

[![npm](https://img.shields.io/npm/v/places-autocomplete)](https://www.npmjs.com/package/places-autocomplete)

This library provides an autocomplete component for the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/).

### Getting Started

Install the package:

```
npm install --save places-autocomplete
```

Import and initialize the autocomplete:

```javascript
import mapboxgl from 'mapbox-gl';
import PlacesAutocomplete from 'places-autocomplete';
import 'places-autocomplete/index.css';

mapboxgl.accessToken = 'pk.abcd1234...';

const mapboxglMap = new mapboxgl.Map({
  container: document.getElementById('my-map-container'),
  style: 'mapbox://styles/mapbox/streets-v12'
});

const autocomplete = new PlacesAutocomplete({
  mapboxToken: mapboxgl.accessToken,
  mapInstance: mapboxglMap,
  debounce: 300
});

const inputEl = document.getElementById('my-input');
autocomplete.attachTo(inputEl);
```

The example above configures the autocomplete with a [mapbox-gl](https://github.com/mapbox/mapbox-gl-js) map instance, allowing the autocomplete to sync the map's position to the selected autocomplete result. You can view the [Mapbox GL JS docs](https://docs.mapbox.com/mapbox-gl-js) for more information on the `mapbox-gl` package.

### Options

The autocomplete can be configured with the following options upon initialization:

| Option                     | Description                                                                | Default          |
| -------------------------- | -------------------------------------------------------------------------- | ---------------- |
| `input`                    | An input DOM element to attach the autocomplete to.                        | -                |
| `mapboxToken`              | The Mapbox access token used for the API requests (required).              | -                |
| `mapInstance`              | A `mapboxgl.Map` instance, syncs map position to autocomplete.             | -                |
| `className`                | Specifies the class name for the autocomplete suggestions container.       | -                |
| `minLength`                | Minimum number of characters needed to trigger autocomplete.               | `2`              |
| `debounce`                 | Time in milliseconds to delay the autocomplete between keystrokes.         | `200`            |
| `preventSubmit`            | If true, prevents the input from submitting its form on Enter.             | `false`          |
| `limit`                    | Number of results to return in the autocomplete.                           | `6`              |
| `language`                 | Language of returned Mapbox autocomplete results.                          | browser language |
| `proximity`                | Favor results that are closer to this location. Given as a string of two comma-separated coordinates ("lon,lat"). If a `mapInstance` is specified then the map's current center position will be used instead. | - |
| `additionalResultsPrepend` | If true, prepends `additionalResults` entries to autocomplete suggestions. | `false`          |
| `onClear`                  | Function called when input is cleared.                                     | -                |
| `onSelect`                 | Function called when autocomplete item is selected (args: [item]).         | -                |
| `additionalResults`        | Function called before updating autocomplete results, should return array of results (args: [query]). | - |
| `customize`                | Function called before rendering autocomplete results (args: [input, inputRect, container, maxHeight]). | - |

### License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
