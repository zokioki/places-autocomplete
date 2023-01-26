import autocomplete from 'autocompleter';

// Turns a specified input element into a customizable, Mapbox-powered autocomplete component:
//
// Options:
// - input: An input element to attach the autocomplete to.
// - mapboxToken (required): The Mapbox access token used for the API requests.
// - mapInstance: A mapboxgl.Map instance, syncs map position to autocomplete selection.
// - className: Specifies the class name for the autocomplete suggestions container.
// - minLength: Minimum amount of characters needed to trigger autocomplete (default: 2).
// - debounce: Time in milliseconds to delay autocomplete call between keystrokes (default: 200).
// - preventSubmit: If true, prevents the input from submitting its form on Enter (default: false).
// - limit: Number of results to return in the autocomplete (default: 6).
// - language: Language of returned Mapbox autocomplete results (default: browser language).
// - proximity: Bias the response to favor results that are closer to this location.
//              Provided as two comma-separated coordinates (lon,lat). If a mapInstance is specified
//              then the map's current center position will be used instead of this setting.
// - featureTypes: Filter results to include only a subset of the available feature types. Multiple types
//                 can be comma-separated. Options are: country, region, postcode, district, place, locality,
//                 neighborhood, address, and poi.
// - additionalResultsPrepend: If true, prepends additionalResults entries to beginning of suggestions (default: false).
// - onClear: Function triggered when input is cleared.
// - onSelect: Function triggered when autocomplete item has been selected (args: [item]).
// - additionalResults: Function triggered before updating autocomplete results, expects array of results (args: [query]).
// - customize: Function triggered before autocomplete results are rendered (args: [input, inputRect, container, maxHeight]).

export default class PlacesAutocomplete {
  constructor(options = {}) {
    this.options = options;
    this.autocompleteUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    this.mapInstance = options.mapInstance;
    this.autocompleteInstance = null;

    if (options.input) this.attachTo(options.input);
  }

  attachTo(input) {
    if (this.inputEl) return;

    const options = this.options;
    this.inputEl = input;

    this.inputEl.addEventListener('keyup', () => {
      if (this.inputEl.value.trim().length === 0 && options.onClear) {
        options.onClear();
      }
    });

    this.autocompleteInstance = autocomplete({
      input: this.inputEl,
      className: options.className,
      minLength: options.minLength || 2,
      debounceWaitMs: options.debounce || 200,
      preventSubmit: options.preventSubmit || false,
      fetch: (text, update) => {
        const query = text.trim();
        if (query.length === 0) return;

        const url = `${this.autocompleteUrl}/${encodeURIComponent(query)}.json`;
        const urlParams = new URLSearchParams({
          limit: options.limit || 6,
          language: options.language || navigator.language,
          access_token: options.mapboxToken,
        });

        if (options.proximity) urlParams.set('proximity', options.proximity);
        if (options.featureTypes) urlParams.set('types', options.featureTypes);

        if (options.mapInstance) {
          const mapCenter = options.mapInstance.getCenter();
          urlParams.set('proximity', mapCenter.toArray().join(','));
        }

        fetch(`${url}?${urlParams}`).then(response => response.json()).then(data => {
          const results = data.features.map(result => {
            const nameParts = result.place_name.split(',');
            const placeTitle = nameParts[0];
            const placeAddress = nameParts
              .splice(1, nameParts.length)
              .join(',');

            return {
              label: {
                title: placeTitle,
                address: placeAddress || '',
              },
              value: result.place_name,
              data: result,
            };
          });

          if (options.additionalResults) {
            Promise.resolve(options.additionalResults(query)).then(
              additional => {
                options.additionalResultsPrepend
                  ? results.unshift(...additional)
                  : results.push(...additional);

                update(results.splice(0, urlParams.get('limit')));
              }
            );
          } else {
            update(results);
          }
        });
      },
      customize: (input, inputRect, container, maxHeight) => {
        if (options.customize)
          options.customize(input, inputRect, container, maxHeight);
      },
      render: (item, currentValue) => {
        let itemEl;

        if (options.render) {
          itemEl = options.render(item, currentValue);
        } else {
          itemEl = document.createElement('div');

          if (typeof item.label == 'object') {
            itemEl.innerHTML = `
              <div class="autocomplete-item-title">${item.label.title}</div>
              <div class="autocomplete-item-address">${item.label.address || ''}</div>
            `;
          } else {
            itemEl.textContent = item.label || '';
          }
        }

        itemEl.classList.add('autocomplete-item');

        return itemEl;
      },
      onSelect: item => {
        this.inputEl.value = item.value;
        let flightOptions = { ...options.mapFlight };

        if (this.mapInstance) {
          if (item.data.bbox) {
            delete flightOptions.zoom;
            this.mapInstance.fitBounds(item.data.bbox, flightOptions);
          } else {
            this.mapInstance.flyTo({
              center: item.data.center || item.data.geometry.coordinates,
              ...flightOptions,
            });
          }
        }

        if (options.onSelect) {
          options.onSelect(item);
        }
      },
    });
  }

  destroy() {
    this.autocompleteInstance.destroy();
  }
}
