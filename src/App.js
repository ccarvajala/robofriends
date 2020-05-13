import React,{Component} from "react"
import CardList from "./CardList"
import Searchbox from "./Searchbox"
import Scroll from "./Scroll"
import "./App.css";
import ErrorBoundary from "./ErrorBoundary"

class App extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            robots: [],
            searchfield: ""
        };
    }

    componentDidMount()
    {
        fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({robots:users}));
        console.log("wtf");
    }

    onSearchChange = (event) =>
    {
        this.setState({searchfield: event.target.value});
       
    }

    render()
    {
        const {robots,searchfield} = this.state;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));
        if(!robots.length)
        {
            return <h1>Loading </h1>
        }
        else
        {
            return (
                <div className="tc">
                    <h1 className= "f1">RoboFriends</h1>
                    <Searchbox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots= {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;