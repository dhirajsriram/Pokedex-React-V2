# Healthdex 
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)] [Build Status](https://img.shields.io/travis/rexxars/react-markdown/master.svg?style=flat-square)]

An application designed to provide information regarding the various species of pokemon. [Pokeapi](https://pokeapi.co/api/v2/) was used to make api calls to fetch inforamtion onto the front-end.

## Architecture

A high level **architecture** diagram of the application is given below.

<p aling="center"><img src="/docs/Architecture.jpg"></p>


## Installation

Kindly do an npm install to install the required packages for the web application. Following are the libraries that are used
- react v16.8
- Material UI v4.2.1
- isomorphic-fetch v2.2.1
- enzyme v3.10
- react-router v4.3.1

```
npm install 
```

## Development server

Run `npm start` to host the application locally. Navigate to `http://localhost:3000/`. 

## Running unit tests

Run `ng run test` to execute the unit tests.

## Build & Deployment

### Build

Run `npm run build` to create a production optimized build of the application. We can approch deployment in two ways.
- You can serve the build folder with a static server by doing the following commands from the root directory.
```
yarn global add serve
serve -s build
```
- The build folder already has all the assets (Javascript, CSS) minified and transpiled. You may also choose to deploy the build directory directly onto your server which may inturn serve the files over the web.

### Deployment Stratergy

- The application has been deployed in the following domain (https://healthdex.netlify.com/)
- The server follows **continuous deployment**. Netlify is linked to the github repo. Any commits made the repo triggers the build command on the server and serves the latest version of the code. 

## Design

The entire application follows the **Material design** standards. [Material-ui](https://material-ui.com/) was used as the default design framework.

## Pages

The application follows a page wise approach to display the content. The pages are routed in an SPA fashion using React-router. Following are the list of pages in the application
- Home
- Listing
- Description

### Home

The home page gives us a list view of all the pokemon sorted in an ascending order based on their number. Following are the features it provides

![alt text](/docs/Home.jpg "Design")

- The user may use the **filter** button to the top right to filter pokemon based on their types.

![alt text](/docs/Filter.jpg "Design")

- The user may click on the hamburger icon to the top left to open up the side navigation.

<p align="center"><img src="/docs/Sidenav.jpg"></p>

- There is also a **randomise** button at the bottom of the page which randomises the result based on their numbers.

![alt text](/docs/Randomise.jpg "Design")

**Following is a code snippet related to the functionality**
```js
calculateRand = (e) => {
		let arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 808));
		this.setState({ pokeArr: arr, randomized: true , randToggle: !this.state.randToggle});
		this.handleClose()
	};
```
- When scrolled to the bottom the application automatically fetches the next list of pokemon and appends it over the page.

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
### Listing

The listing pages follow the follwing url: */results/(type)* where type may be any of the following

<table>
  <tr>
    <td colspan="3">Type</td>
  </tr>
  <tr>
    <td>Fire</td>
    <td>Water</td>
    <td>Grass</td>
  </tr>
    <tr>
    <td>Fire</td>
    <td>Water</td>
    <td>Grass</td>
  </tr>
    <tr>
    <td>electric</td>
    <td>fighting</td>
    <td>psychic</td>
  </tr>
    <tr>
    <td>normal</td>
    <td>steel</td>
    <td>dark</td>
  </tr>
    <tr>
    <td>dragon</td>
    <td>fairy</td>
    <td>poison</td>
  </tr>
  <tr>
    <td>ghost</td>
    <td>ice</td>
    <td>rock</td>
  </tr>
  <tr>
    <td>ground</td>
  </tr>
</table>

![alt text](/docs/Listing.jpg "Design")

The user may also clear the type filter by using the close icon at the end of the filter menu.The design and funtionality mimic that of the home page, and support load-more when scrolled to the bottom of the page

### Description

The description page gives the user the a detailed description of the pokemon. Following are the details available in the description page
- Pokemon **name, number and image**
- Pokemon **height and weight** information
- Pokemon **stats and attributes**
- Pokemon **sprites** (default and shiny)
- **Evolution** information
- **Moves**

![alt text](/docs/Description.jpg "Design")

The description page is split entirely into induvidual modules. Each module handles a segment of the page as mentioned above. The modules in the page are grouped up into three tabs.
- Stats
- Evolution
- Moves

There is a tab navigation affixed to the bottom of the page that helps us switch between the tabs.

**Recursive component rendering for Evolutions**
```js
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
``` 

![alt text](/docs/Evolution.jpg "Design")

### Search

Although there is no specific search results page, the search bar provides an inutive experience to the user looking for a specific pokemon. The search bar provides **autosuggest** to help the user easly find the pokemon that they are looking for. The suggestion list provides the name number and image of the pokemon.

![alt text](/docs/Suggestion.jpg "Design")

### 404

Unmatched routes are taken to the 404 page. 

![alt text](/docs/404.jpg "Design")

## Credits

A huge shout out to [Pokeapi](https://pokeapi.co/api/v2/) without which the project would'nt be possible. 

