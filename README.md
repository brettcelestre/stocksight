# Stock Sight

Monitor all of your stock and mutual fund data in one place.

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
npm test
```

### Roadmap
- Client
  - Components
    - home: component for logging in and signing up
    - login: component for login
    - signup: component for signing up
    - main: Once signed in your state changes to main, which houses a sidebar and chart component from the shared folder
  - Shared
    - chart: displays data from stock and mutual funds
    - sidebar: allows you to add and delete stock/mutual funds from your chart
- Server
  - auth: Contains login, logout, and checksession routes
  - chart: Retrieves all stock/mutual fund data for your tracked symbols
  - config: Contains middleware to set up all routes
  - signup: Contains route for signing up with mongoose schema
  - stock: Contains get, post, and delete, for adding new symbols, also contains mongoose schema for post
  - user: Not in use