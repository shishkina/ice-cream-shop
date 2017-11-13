# Connecting React and Express!

### Learning Objectives

- Build an app about ice cream!
- Practice setting up a React frontend with an Express backend
- Implement full CRUD functionality into our React app
- Profit??? 🍦

### IN THIS REPOSITORY ARE THE FOLLOWING THINGS!

- This beautiful readme ✨
- An ice cream API, built with Express (`icecream-begin`)
- That same ice cream API, this time with a React frontend (`icecream-final`)

### WE'RE GONNA DO SOME THINGS!

- Add a React app to serve as the frontend for our Express app
- Create, edit, and delete ice cream records from the database
- Use React Router to handle the different components that are rendered
- Have a really excellent time looking at ice cream

# Step 0: Setting up your environment

- Within the Express app `icecream-begin` run `yarn install` (NOT `npm install!!`)
    - Sidebar: It's best during a project to only use one or the other. This project was initialized using `yarn`, so we need to run `yarn install` to install the dependencies.
- Create a database `icecream_dev` in psql
- Run the migration and the seed file (`icecream.sql`) using `psql -d icecream_dev -f`.
- In `server.js` change the port from `3000` to `3001`.
- Start the Express app using `yarn dev`!

# Step 0.5: Setting up the React app

We want our Express app to serve our React app. While it's possible to have the react app and the express app be totally separate, it's neater and easier to control to put them in the same place.

- Run `create-react-app client`. It's customary to name the frontend section of your app `client`.
- cd into `client` and run `yarn add react-router-dom`, we're going to need to use it in a bit.
- In `client/package.json`, add this line at the bottom: `"proxy": "http://localhost:3001"`. This allows us to make requests from the frontend to the backend, since they're running on different ports right now. Eventually, we will have the Express app serving the React app, but we want the handy React developer server and its "hot reloading".
- Run `yarn start` to start the react app.

Now we should have an Express app and a React app running at the same time!

# Step 1: Setting up our initial components

- Within the React app, create a `src/components` folder. Then, create the following components (right now, we're just going to work on `Header` and `Footer`:
    - Header
    - Footer
    - IceCreamList
    - IceCream
    - IceCreamSingle
    - IceCreamForm
    - Home

In our `App.js`, we want to get rid of all the React boilerplate. We're going to use Router in this app, so the first thing we need to do that is just wrap the entire app in `<Router>`.

```jsx
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          
          <Footer />
        </div>
      </Router>
    );
  }
}
```

We also need to set up the links in our `Header` component:

```jsx
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/ice-cream'>Ice Cream</Link></li>
        </ul>
      </nav>
```

And create our `Footer` component.

There's also some css to put into your `App.css` [here](https://git.generalassemb.ly/raw/gist/jlr7245/2bbb3cf417784c9ced00c0621d38f281/raw/8cc3759e40e13be5df433e9b10b846e7f17c0b6f/App.css).

At this point, this is what our three components look like:

<details>
<summary>App.js</summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <div className="container">

            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

```
</details>

<details>
<summary>Header</summary>

```jsx
import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='logo'>
        Thundercats Ice Cream!
      </div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/ice-cream'>Ice Cream</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
```

</details>

<details>
<summary>Footer.jsx</summary>

```jsx
import React from 'react';

const Footer = () => {
  return (
    <footer>
      Made with ❤️ by WDI Thundercats
    </footer>
  )
}

export default Footer;
```

</details>

## 🚀 LAB!

Get your `icecream-begin` app to look like the one we've been working on!

# Step 2: Create our `Home`, `IceCreamController`, `IceCreamList`, and `IceCream` components.

### `Home` component

Our `Home` page is going to be pretty basic, just a stateless functional component:

```jsx

import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Ice Cream</h1>
      <h3>It is the best dessert!</h3>
    </div>
  )
}

export default Home;

```

Then, in between the Header and Footer in our App component's `render` method, we need to add the applicable route:

```jsx
<Route exact path='/' component={Home} />
```

### A New React Pattern

Next, we should create the `IceCreamController` component. Instead of making a bunch of separate, independent components with unrelated state, we're going to make a parent `controller` component and use that to decide what part of our app should render.

_Real talk: I was chugging along through this lecture when I realized that hey, actually, we could do this in a way that's **so much better**, and I realized that I had to redo a lot of things I'd done beforehand. I wanted to keep the commit history nice and neat, but the payoff of having a better architecture is worth it._

![diagram](./assets/react-structure-diagram.jpg)

### `IceCreamController` Component

All of the API calls will be made from the `IceCreamController` component, which will be responsible for rendering the other components based on what the current page is. Let's quickly set this up with the `IceCreamList` component.

First, let's scaffold out the two relevant components:

- `IceCreamController` will be a stateful component.
- `IceCreamList` will be a stateless functional component.

`IceCreamController` is going to decide which type of component to render. Remember this from the pizza app?

```jsx
  decideWhichToRender() {
    if (!this.state.dataLoaded) {
      return <p>Loading...</p>
    }
    switch (this.state.currentPage) {
      case 'home':
        return <Home getSinglePizza={this.getSinglePizza} allPizzas={this.state.allPizzas} />;
        break;
      case 'show':
        return <Show pizza={this.state.singlePizzaData} changePage={this.changePage} deletePizza={this.deletePizza} />;
        break;
      case 'edit':
        return <Form isAdd={false} pizza={this.state.singlePizzaData} pizzaSubmit={this.pizzaSubmit} />;
        break;
      case 'new':
        return <Form isAdd={true} pizzaSubmit={this.pizzaSubmit} />;
        break;
      default:
        return <Home getSinglePizza={this.getSinglePizza} />;
        break;
    }
  }
```

We're going to have a function that looks very similar to that in the `IceCreamController`. And we're going to pass the `currentPage` value in from the router:

```jsx
<Route exact path="/ice-cream"
    render={() => <IceCreamController currentPage="index" />}
/>
<Route exact path="/ice-cream/:id"
    render={props => (<IceCreamController
    currentPage="show" currentId={props.match.params.id} />)}
/>
```

(We don't need the `/:id` route yet, it's just in there in order to demonstrate how we're passing in the current page.)

```js
componentDidMount() {
    fetch('/api/icecream')
      .then(res => res.json())
      .then(res => {
        this.setState({
          apiData: res.data.icecreams,
          apiDataLoaded: true,
        })
      }).catch(err => console.log(err));
}
```

Then, we just need to map through the data and render a bunch of `IceCream` components:

```jsx
  renderIceCreams() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map(icecream => {
        return (
          <IceCream key={icecream.id} icecream={icecream} />
        );
      });
    } else return <p>Loading...</p>
  }

  render() {
    return (
      <div className="icecream-list">
        {this.renderIceCreams()}
      </div>
    )
  }
```

We also need to create the `IceCream` component. It'll have all the details about the ice cream as well as a link to the ice cream's individual page.


Finally, we need to add the route in `App.js`.

```jsx
<Route exact path='/ice-cream' component={IceCreamList} />
```


<details>
<summary>IceCreamList.jsx</summary>

```jsx
import React, { Component } from 'react';

import IceCream from './IceCream';

class IceCreamList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    }

  }

  componentDidMount() {
    fetch('/api/icecream')
      .then(res => res.json())
      .then(res => {
        this.setState({
          apiData: res.data.icecreams,
          apiDataLoaded: true,
        })
      }).catch(err => console.log(err));
  }

  renderIceCreams() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map(icecream => {
        return (
          <IceCream key={icecream.id} icecream={icecream} />
        );
      });
    } else return <p>Loading...</p>
  }

  render() {
    return (
      <div className="icecream-list">
        {this.renderIceCreams()}
      </div>
    )
  }
}

export default IceCreamList;
```
</details>

<details>
<summary>IceCream.jsx</summary>

```jsx
import React from 'react';

import { Link } from 'react-router-dom';

const IceCream = (props) => {
  return (
    <div className="ic-inlist">
      <img src={props.icecream.url} />
      <h2>{props.icecream.flavor}</h2>
      <p>Rating: {props.icecream.rating}</p>
      <Link to={`/ice-cream/${props.icecream.id}`}>See More</Link>
    </div>
  )
}

export default IceCream;
```

</details>

# Step 3: Add the `IceCreamSingle` component

This component will display info about one ice cream at a time.

First, let's make the route for it in `App.js`:

```jsx
<Route exact path="/ice-cream/:id" component={IceCreamSingle} />
```

Then, within the `IceCreamSingle` component, we can access the param that's passed in by using `this.props.match.params.id` (geez!) and use it to make our request in `componentDidMount`:

```jsx
  componentDidMount() {
    fetch(`/api/icecream/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          icecream: res.data.icecream,
        })
      }).catch(err => console.log(err));
  }
```

Finally, we render that information on the page.

<details>
<summary>IceCreamSingle.jsx</summary>

```jsx
import React, { Component } from 'react';

class IceCreamSingle extends Component {
  constructor() {
    super();
    this.state = {
      icecream: null,
      apiDataLoaded: null,
    }
  }

  componentDidMount() {
    fetch(`/api/icecream/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          icecream: res.data.icecream,
        })
      }).catch(err => console.log(err));
  }

  renderIceCreamOrLoading() {
    if (this.state.apiDataLoaded) {
      return (
        <div className="inner">
          <div className="img">
            <img src={this.state.icecream.url} alt={this.state.icecream.flavor} />
          </div>
          <div className="info">
            <h4 className="brand">{this.state.icecream.brand}</h4>
            <h1>{this.state.icecream.flavor}</h1>
            <p>{this.state.icecream.description}</p>
            <div className="links">
              <span className="rating">Rating: {this.state.icecream.rating}</span>
            </div>
          </div>
        </div>
      )
    } else return <p className="loading">Loading...</p>
  }

  render() {
    return (
      <div className="icecream-single">
        {this.renderIceCreamOrLoading()}
      </div>
    )
  }
}

export default IceCreamSingle;
```
</details>

## 🚀 LAB!!!

Follow the steps I just did in class.



