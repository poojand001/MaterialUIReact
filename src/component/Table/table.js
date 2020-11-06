import React, { Component } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter,
    Switch,
    TextField
} from "@material-ui/core";
import './table.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            per_page: 0,
            total: 0,
            total_pages: 0,
            data: [],
            themeX: createMuiTheme({
                palette: {
                    type: "light",
                    white: {
                        800: "#FFFFFF", // overrides failed
                        900: "#FFFFFF" // overrides success
                    }
                }
            }),
            filtereddata: [],
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleswitch = this.handleswitch.bind(this);
        this.handleinput = this.handleinput.bind(this);
    }
    handleChangePage(e, newValue) {
        console.log(newValue);
        axios
            .get(`https://reqres.in/api/users?page=${newValue+1}`)
            .then((response) =>
                this.setState({
                    page: response["data"]["page"],
                    per_page: response["data"]["per_page"],
                    total: response["data"]["total"],
                    total_pages: response["data"]["total_pages"],
                    data: response["data"]["data"],
                    filtereddata: response["data"]["data"]
                })
            )
            .catch((response) => {});
    }
    handleswitch(e, newValue) {
        if (newValue) {
            this.setState({
                themeX: createMuiTheme({
                    palette: {
                        type: "dark",
                        grey: {
                            800: "#000000", // overrides failed
                            900: "#121212" // overrides success
                        }
                    }
                })
            });
        } else {
            this.setState({
                themeX: createMuiTheme({
                    palette: {
                        type: "light",
                        white: {
                            800: "#FFFFFF", // overrides failed
                            900: "#FFFFFF" // overrides success
                        }
                    }
                })
            });
        }
    }
    handleinput(e, newValue) {
        let filtered = this.state.data.filter(value => {
            return (
                value.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                value.last_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
        this.setState({ filtereddata: filtered });
    }
    componentWillMount() {
        axios
            .get("https://reqres.in/api/users?page=1")
            .then((response) =>
                this.setState({
                    page: response["data"]["page"],
                    per_page: response["data"]["per_page"],
                    total: response["data"]["total"],
                    total_pages: response["data"]["total_pages"],
                    data: response["data"]["data"],
                    filtereddata: response["data"]["data"],
                })
            )
            .catch((response) => {});
    }
    render() {
        let rowperpage = this.state.per_page;
        return ( < React.Fragment > < MuiThemeProvider theme = { this.state.themeX } >
            <
            TextField id = "standard-basic"
            label = "Search"
            onChange = { this.handleinput }
            /> <
            TableContainer component = { Paper } > { " " } <
            Table >
            <
            TableHead >
            <
            TableRow >
            <
            TableCell > < /TableCell> <TableCell> Id </TableCell > { " " } <
            TableCell > First Name < /TableCell>{" "} <
            TableCell > Last Name < /TableCell> <TableCell> Email </TableCell > { " " } <
            /TableRow>{" "} < /
            TableHead > { " " } <
            TableBody > { " " } {
                this.state.filtereddata.map((data, index) => ( <
                    TableRow >
                    <
                    TableCell > { " " } <
                    img src = { data.avatar }
                    alt = "User" / >
                    <
                    /TableCell>{" "} <
                    TableCell > { data.id } < /TableCell>{" "} <
                    TableCell > { data.first_name } < /TableCell>{" "} <
                    TableCell > { data.last_name } < /TableCell>{" "} <
                    TableCell > { data.email } < /TableCell>{" "} < /
                    TableRow >
                ))
            } { " " } <
            /TableBody>{" "} <
            TableFooter > { " " } <
            TableRow >
            <
            TablePagination rowsPerPageOptions = {
                [
                    rowperpage
                ]
            }
            rowsPerPage = { rowperpage }
            page = { this.state.page - 1 }
            onChangePage = { this.handleChangePage }
            count = { this.state.total }
            />{" "} < /
            TableRow > { " " } <
            /TableFooter> < /
            Table > <
            /TableContainer></MuiThemeProvider > <
            Switch onChange = { this.handleswitch }
            name = "checkedA" / >
            <
            h2 className = "darkmode" > Dark Mode < /h2> < /
            React.Fragment >
        );
    }
}

export default TableData;