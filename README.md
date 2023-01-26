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

/* 
   Enter your access token that associates your 
   Mapbox GL JS map with a Mapbox account
*/
mapboxgl.accessToken = 'pk.abcd1234...';


const mapboxglMap = new mapboxgl.Map({ /* your map options */ 
    container: 'map',                               // container ID
    style: 'mapbox://styles/mapbox/streets-v12',    // style URL
    center: [-74.5, 40],                            // starting position [longitude, latiude]
    zoom: 9                                         // zoom level
});

// container - the HTML element in which the map needs to be placed


const autocomplete = new PlacesAutocomplete({
  mapboxToken: mapboxgl.accessToken,
  mapInstance: mapboxglMap,
  debounce: 300
});

const inputEl = document.getElementById('my-input');
autocomplete.attachTo(inputEl);
```

You can find a variety of styling options for the style parameter in the mapboxgl initialisation [here](https://docs.mapbox.com/api/maps/styles/#mapbox-styles)

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
