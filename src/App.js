import React, { Component } from "react";

class App extends Component {
  state = { names: [], msg: ""};
  async componentDidMount() {
    console.time("fetching");
    this.setState({ msg: "Loading..." });
    const names = await fetch("http://localhost:1234/api").then(res =>
      res.json()
    );
    console.timeEnd("fetching");
    console.time("rendering");
    const count = this.state.count;
    this.setState({ names, msg: "" });
  }
  componentDidUpdate() {
    console.timeEnd("rendering");
  }

  render() {
    return (
      <div>
        <h3>Change me to build a table with all names returned </h3>
        {this.state.msg}
        <p>Count: {this.state.names.length}</p>
        <table>
          <thead>
            <tr>
              <td>FirstName</td>
              <td>LastName</td>
            </tr>
          </thead>
          <tbody>
            {this.state.names.map((data, key) => {
              return (
                <tr key={data.id}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
