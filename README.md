# Healthdex

An application designed to provide information regarding the various species of pokemon. [Pokeapi](https://pokeapi.co/api/v2/) was used to make api calls to fetch inforamtion onto the front-end.

## Installation

Kindly do an npm install to install the required packages for the web application. Following are the libraries that are used
- react v16.8
- Material UI v4.2.1
- isomorphic-fetch v2.2.1
- enzyme v3.10

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
- 



## Description

The application works over the following pages

- Home
- Lising
- Description

## Design

The entire application follows the 

### Home

The home page gives us a list view of all the pokemon sorted in an ascending order based on their number. There is also an All types button on the top right corner that helps us filter the pokemon based on their types.

**Following is a code snippet related to the functionality**
```js
searchByCity(){
    let results = this.brandData.Branch.filter(a=>a.PostalAddress.TownName == this.city.toUpperCase())
    this.searchTerm = this.city;
    this.searchResults = results;
  }
```

**Autocomplete for Search bar - Produces a list of unique city names**
```js
private getCityNames(){
    if(this.branchData){
    for(let bank in this.branchData.data){
      for(let brand in this.branchData.data[bank].Brand){
        this.brandData = this.branchData.data[bank].Brand[brand]
        let result = this.brandData.Branch.map(a => a.PostalAddress.TownName);
        let bankaddress = [...result];
        this.bankAddress= Array.from(new Set(bankaddress));
        }
      }
    }
}
```

### Branch list component

Used to display a list of all the branches of a brand. The app first fetches the branch list as follows

### app.component.ts
```js
getBranches(){
    this.BankService.branches(this.branches).subscribe(data=>{
      this.branchData = data;
    })
  }
 ```
### bank.service.ts
```js
branches(branches: string): Observable<any> {
    return this.http.get(this.baseurl + branches);
  }
```
The data that has been subscribed to is then passed onto the branch-list component which is then being retained locally. The list is then iterated through and every single branch element in the list is a seperate Branch component.

**Kindly refer this image for the architecture**

![alt text](/Aavri-bank.png)

