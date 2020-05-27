import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { getDefaultWatermarks } from 'istanbul-lib-report';
import { colors } from '@material-ui/core';
//import 'chartjs-plugin-labels'
import { NativeSelect } from '@material-ui/core';
import { useHistory } from "react-router-dom";


class InputChart extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            chart: undefined,
            community: '',
            isLoaded: false,
        }
    }
    componentDidMount() {
        //const { name } = window.location.search

        fetch("https://data.cityofchicago.org/resource/a2fk-ec6q.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("in componet" + result)
                    this.setState({
                        isLoaded: true,
                        data: result,
                    });
                },
                (error) => {
                    console.error("Request failed", error);
                });

    }

    handleSubmit(event) {
        const name = window.location.search
        alert('params' + name);
        if (this.state.chart != undefined) this.state.chart.destroy();
        var selected = this.state.data[event];
        var keys = Object.keys(selected);
        var values = Object.values(selected);
        var label = [], dataset = [], coloR = [];
        var dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        };

        for (let i = 2; i < keys.length; i++) {
            if (values[i] > 0) {
                dataset.push(values[i]);
                label.push(keys[i]);
                coloR.push(dynamicColors());
            }
        }
        var Chart = require('chart.js');
        var ctx = document.getElementById('myChart').getContext('2d');
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: dataset,
                    label: selected.community_area_name,
                    backgroundColor: coloR,
                }],
                labels: label
            },
            /*options: [{
                //plugins: {
                    //datalabels: { color: 'black' 
                    //labels: {render: 'percentage'
                }
            }]*/

        });
        //console.log("community name before set state: " + selected.community_area_name);
        this.setState({
            community: selected.community_area_name,
            chart: myPieChart
        });
    };

    render() {
        let community = this.state.data;
        return (
            <Card>
                <div>
                    {(this.state.isLoaded) ? (

                        <div>
                            <CardHeader action={
                                <form onSubmit={(event) => this.handleSubmit(event.target.value)}>
                                    <input list="selector" name="name" />
                                    <datalist id="selector" name="mane">
                                        {community.map((item, i) => {
                                            return <option data-value={i} >{item.community_area_name}</option>
                                        })}
                                    </datalist>
                                    <input type="submit" />
                                </form>


                            }
                                title="Community language visualizer"
                                subheader="Select a community to view language distrabutions"
                            />
                            <CardContent>
                                <canvas id="myChart" width="300" height="300"></canvas>
                            </CardContent>
                        </div>
                    ) : (<p></p>)}
                </div>
            </Card>
        )
    }

}
export default InputChart;
/*<FormControl >
                                <InputLabel id="select1">Community</InputLabel>
                                <Select name="name"
                                    labelId="select1"
                                    id="demo-simple-select"
                                    value={this.state.community}
                                    onChange={(event) => this.handleChange(event.target.value)}
                                >
                                    {community.map((item, i) => {
                                        return <MenuItem value={i}>{item.community_area_name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>



                            <select onChange={(event) => this.handleChange(event.target.value)} name="mane" id="communities">
                                {community.map((item, i) => {
                                    return <option value={i}>{item.community_area_name}</option>
                                })}
                            </select>



                            */