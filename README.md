# Pokédex

An application designed to provide information regarding the various species of Pokémon. [Pokeapi](https://pokeapi.co/api/v2/) served as the backend, delivering information onto the front-end.

**https://pokedex-info.netlify.com/**

## Architecture

A high-level **architecture** diagram of the application is given below.

  <p align="center"><img src="/docs/Architecture.jpg"></p>

## Getting Started

### Prerequisites

- node v7 and above
- yarn / npm (Dependency management)

### Installing

Kindly do an npm install to install the required packages for the web application.

```
npm install
```

Following are the libraries that are used

- react v16.8
- Material UI v4.2.1
- isomorphic-fetch v2.2.1
- enzyme v3.10
- react-router v4.3.1

## Development server

Run `npm start` to host the application locally. Navigate to `http://localhost:3000/`.

## Running unit tests

Run `npm run test` to execute the unit tests.

## Build & Deployment

### Build

Run `npm run build` to create a production optimized build of the application. We can approach deployment in two ways.

- You can serve the build folder with a static server by doing the following commands from the root directory.

```
yarn global add serve
serve -s build
```

- The build folder already has all the assets (JavaScript, CSS) minified and transpiled. You may also choose to deploy the build folder directly onto your server which may in turn serve the files over the web.

### Deployment Strategy

The server follows **continuous deployment**. Netlify is linked to the github repo. Any commits made the repo triggers the build command on the server and serves the latest version of the code.

## Design

The entire application follows the **Material design** standards. [Material-ui](https://material-ui.com/) was used as the default design framework.

## Directory structure

#### `src/assets/`

Contains the necessary assets including all the types images logo etc.

#### `src/common/`

Contains a number of reusable components that are shared across the application

#### `src/common/menu`

Contains the components related to rendering the main menu, including the autosuggest and filter options

#### `src/common/pokemon`

Contains the Pokémon component which is the integral part of the application and other reusable components specific to displaying the Pokémon

#### `src/pages/`

Contains the components that acts as the skeleton of the application. The common components are imported into pages to display the content based on the page type.

## Pages

The application follows a page wise approach to display the content. The pages are routed in an SPA fashion using React-router. Following are the list of pages in the application

**`Home`**
**`Listing`**
**`Description`**
**`404`**

## Home

The home page gives us a list view of all the Pokémon sorted in an ascending order based on their number. Following are the features it provides

<p align="center"><img src="/docs/Home.jpg"></p>

- The user may use the **filter** button to the top right to filter Pokémon based on their types. ![alt text](/docs/Filterbutton.jpg "Design")

![alt text](/docs/Filter.jpg "Design")

- The user may click on the hamburger icon to the top left to open up the side navigation.

- There is also a **randomize** button at the bottom of the page which randomizes the result based on their numbers. <p><img src="/docs/Randomisebutton.jpg"></p>

**Following is a code snippet related to the functionality**

```js
calculateRand = e => {
  let arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 808));
  this.setState({ pokeArr: [] }, () => {
    this.setState({
      pokeArr: arr,
      randomized: true,
      randToggle: !this.state.randToggle
    });
  });
  this.handleClose();
};
```

- When scrolled to the bottom the application automatically fetches the next list of Pokémon and appends it over the page.

**Load more results when scrolled to the bottom**

```js
isBottom(el) {
    return el.getBoundingClientRect().bottom - 1 <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.body;
    if (this.isBottom(wrappedElement)) {
      if (!this.state.randomized) {
        let initArr = Array.from(Array(this.state.pokeArr.length + 12).keys(), (x) => x + 1);
        this.setState({ pokeArr: initArr });
      } else {
        let arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 808));
        this.setState({ pokeArr: this.state.pokeArr.concat(arr) });
      }
    }
  };
```

## Listing

The listing pages follow the following url: _/results/(type)_ where type may be any of the following.

  <table align="center">
    <tr>
      <td>Fire</td>
      <td>Water</td>
      <td>Grass</td>
      <td>Fire</td>
      <td>Water</td>
      <td>Grass</td>
      <td>electric</td>
      <td>fighting</td>
      <td>psychic</td>
      <td>normal</td>
      <td>steel</td>
      <td>dark</td>
      </tr>
      <tr>
      <td>dragon</td>
      <td>fairy</td>
      <td>poison</td>
      <td>ghost</td>
      <td>ice</td>
      <td>rock</td>
      <td>ground</td>
      </tr>
  </table>

## Description

The description page gives the user a detailed description of the Pokémon. Following are the details available in the description page

- Pokémon **name, number and image**
- Pokémon **height and weight** information
- Pokémon **stats and attributes**
- Pokémon **sprites** (default and shiny)
- **Evolution** information
- **Moves**

<p align="center"><img src="/docs/Description.jpg"></p>

The description page is split entirely into individual modules. Each module handles a segment of the page as mentioned above. The modules in the page are grouped up into three tabs.

**`Stats`**
**`Evolution`**
**`Moves`**

There is a tab navigation affixed to the bottom of the page that helps us switch between the tabs.

**Recursive component rendering for Evolutions**

```js
const Evolution = props => {
  return (
    <React.Fragment>
      <Grid xs={12 / props.stages} item className={classes.pokemon}>
        <Pokemon
          first={props.first}
          number={getNumber(props.evolution.species.url)}
          evolution={true}
          descriptionPage={false}
          page={"evolution"}
          evolutionData={props.evolution}
          color={props.color}
        />
      </Grid>
      {props.evolution.evolves_to.length > 1 && (
        <Grid>
          {props.evolution.evolves_to.map(function(val, i) {
            return (
              <Evolution
                key={i}
                evolution={val}
                first={false}
                color={props.color}
              />
            );
          })}
        </Grid>
      )}

      {props.evolution.evolves_to.length === 1 &&
        props.evolution.evolves_to.map(function(val, i) {
          return (
            <Evolution
              key={i}
              evolution={val}
              first={false}
              color={props.color}
              stages={props.stages}
            />
          );
        })}
    </React.Fragment>
  );
};
```

## Search

Although there is no specific search results page, the search bar provides an intuitive experience to the user looking for a specific Pokémon. The search bar provides **autosuggest** to help the user easily find the Pokémon that they are looking for. The suggestion list provides the name number and image of the Pokémon.

## 404

Unmatched routes are taken to the 404 page.

## Credits

A huge shout out to [Pokeapi](https://pokeapi.co/api/v2/) without which the project wouldn’t be possible.
