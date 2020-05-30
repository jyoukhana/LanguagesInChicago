import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import 'chartjs-plugin-labels'
import { NativeSelect, CardActionArea, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import GetData from './getData.js';
import GetImage from './getImage.js';

class InputChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: undefined,
            community: '',
            isLoaded: false,

        }
    }

    componentDidMount() {
        if (this.state.chart != undefined) this.state.chart.destroy();
        var query = new URLSearchParams(window.location.search);
        console.log('componet mounted' + query.values(0));
        var name = query.get('name');

        GetData(name)
            .then(
                (result) => {
                    console.log(result[0]);
                    var keys = Object.keys(result[0]);
                    var values = Object.values(result[0]);
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
                                label: name,
                                backgroundColor: coloR,
                            }],
                            labels: label
                        },
                        options: [{
                            plugins: {
                                labels: {
                                    render: 'percentage',
                                    position: 'border',
                                    overlap: false,
                                }
                            }
                        }]
                    });
                    this.setState({
                        chart: myPieChart,
                        community: name,
                        isLoaded: true,
                    })
                })
            .catch(error => {
                console.error("Request failed", error);
            })

    }

    render() {
        let community = this.state.data;
        let sub = "Language distrabutions for " + this.state.community;

        let neighborhoodImage = GetImage(this.state.community);

            return (
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={this.state.community}
                            height="400"
                            image={neighborhoodImage}
                            title={this.state.community}
                        />
                    </CardActionArea>
                    <CardHeader
                        title="Community language visualizer"
                        subheader={sub}
                    />
                    <CardContent>
                        <canvas id="myChart" width="300" height="300"></canvas>
                    </CardContent>
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



                            <form onSubmit={(event) => this.handleSubmit(event.target.value)}>
                                    <input list="selector" name="name" />
                                    <datalist id="selector" name="mane">
                                        {community.map((item, i) => {
                                            return <option data-value={i} >{item.community_area_name}</option>
                                        })}
                                    </datalist>
                                    <input type="submit" />
                                </form>
                            */