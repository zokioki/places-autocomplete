### 0.2.0

- Allow using autocomplete in standalone mode (without a map instance).
  - Note that although it is now possible to use the autocomplete
    without a map instance, the Mapbox Terms of Service requires that
    POI search results still be used with a Mapbox map.

    Per the Mapbox geocoder docs:

    > Keep in mind that the Mapbox Terms of Service require that POI
    > search results be shown on a Mapbox map. If you don't need POIs,
    > you can exclude them from your search results with the
    > options.types parameter when constructing a new Geocoder.

    See https://github.com/mapbox/mapbox-gl-geocoder/tree/e02134da433f435aa827f16321a327483fd7217a#using-without-a-map
- Add a `proximity` option to bias results to the given coordinates. If `mapInstance`
  is set then the map's current center position will be used instead of this setting.

### 0.1.2

- Docs improvements

### 0.1.1

- Internal updates (package.json, Readme docs)

### 0.1.0

- Initial release
