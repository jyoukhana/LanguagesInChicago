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
import 'chartjs-plugin-labels'


class InputChart extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            chart: undefined,
            community: '',
            isLoaded: false,
        }
    }
    componentDidMount() {
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

    handleChange(event) {
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
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: dataset,
                    label: selected.community_area_name,
                    backgroundColor: coloR,
                }],
                labels: label
            },
            options: [{
                plugins: {
                    //datalabels: { color: 'black' 
                    labels: {
                        render: 'percentage'
                    }

                }
            }]

        });
        console.log("community name before set state: " + selected.community_area_name);
        this.setState({ community: selected.community_area_name });
    };

    render() {
        let community = this.state.data;
        return (
            <Card>
                <div>
                    {(this.state.isLoaded) ? (

                        <div>
                            <CardHeader action={
                                <FormControl >
                                    <InputLabel id="select1">Community</InputLabel>
                                    <Select
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
                            }
                                title="Community language visualizer"
                                subheader="Select a community to view language distributions"
                            />
                            <CardContent>
                                <canvas id="myChart" width="300" height="300"></canvas>
                                {console.log("community in render " + this.state.community)}
                            </CardContent>
                        </div>
                    ) : (<p></p>)}
                </div>
            </Card>
        )
    }

}
export default InputChart;