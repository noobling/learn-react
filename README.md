# Learn React

* Only updates what is necessary 

```
function tick () {
    const element = (
        <div>
            <h1> Hello, world! </h1>
            <h2> It is {new Date().toLocaleTimeString()} </h2>
        </div>
    )
    ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

React will only update the text in h2 and not all other elements

* Always start component names with capital letter otherwise they are treated as DOM tags e.g. <div />
* All react components must act like pure functions with respect to their props (cannot alter props within components)

## Lifecycle
It is important to free up resources when components are destroyed

Lifecycle methods
componentDidMount() {} Runs after the component has been rendered to the DOM
componentWillUnMount() {} What to run to free up resources used by component e.g. clearInterval

## Data flows down
* State is said to be local or encapsulated i.e. it is not accessible to any component other than the one that owns and sets it. A component may choose to pass its state down to its child components hence the data flows downwards model.

## Keys only need to be unique for 

## React re-renders itself when `setState` is called

## Two way data binding in React
By default React does not come with two way data binding unlike in Vue and Angular. This approach leads to more boiler plate code but React claims that it takes less effort in finding and isolating bugs. This is due to the state living in one component and only that component can chang it. The surface area for bugs is greatly reduced

## Special Children prop
You can write something like this
``` Javascript
function WelcomeDialog() {
    return (
        <Boarder>
            <h1>
                This is the child stuff that is nested inside boarder component
            </h1>
        </Boarder>
    )
}

function Boarder(props) {
    return (
        <div className="boarder">
            {props.children}
        </div>
    )
}

ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('root')
)
```