import React, { Component } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
const URL = "http://localhost:1234/api";

class App extends Component {
  state = { names: [], msg: "" };
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
    const columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true
      }, {
        dataField: 'firstName',
        text: 'Firstname',
        filter: textFilter()
      }, {
        dataField: 'lastName',
        text: 'Lastname',
        filter: textFilter()
      }, {
        dataField: 'email',
        text: 'Email'
      }];
    return (
      <div>
        <h3>Build table client</h3>
        {this.state.msg}
        {console.log(this.state.names)}
        <BootstrapTable
          striped
          hover
          bootstrap4
          keyField="id"
          data={this.state.names}
          columns={columns}
          filter={ filterFactory()}
          pagination={ paginationFactory()}
        />
      </div>
    );
  }
}

export default App;
