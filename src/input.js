import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import 'chartjs-plugin-labels'
import { CardActionArea, Typography } from '@material-ui/core';

import GetData from './getData.js';
import GetImage from './getImage.js';

class InputChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: undefined,
            community: undefined,
            isLoaded: false,
            population: undefined
        }
    }
    componentDidUpdate(prevProps, prevState) {
        var query = new URLSearchParams(window.location.search);
        var name = query.get('name');
        if (name !== this.state.community) {
            this.upDateData(name);
        }

    }

    toUpper(str) {
        var splitStr = str.toLowerCase().split('_');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    upDateData(name) {
        if (this.state.chart !== undefined) this.state.chart.destroy();
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
                    var totalIndividuals = 0;
                    for (let i = 2; i < keys.length; i++) {
                        if (values[i] > 0) {
                            dataset.push(values[i]);
                            label.push(this.toUpper(keys[i]));
                            coloR.push(dynamicColors());
                            totalIndividuals += parseInt(values[i]);
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
                        options: {
                            tooltips: {
                                mode: 'index',
                                callbacks: {
                                    footer: function (tooltipItems, data) {
                                        var percentage = 0;

                                        tooltipItems.forEach(function (tooltipItem) {
                                            percentage = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / totalIndividuals * 100;
                                        });

                                        return 'Percentage: ' + percentage.toFixed(1) + '%';
                                    }
                                },
                                footerFontStyle: 'normal'
                            },
                        }
                    });
                    this.setState({
                        chart: myPieChart,
                        community: name,
                        isLoaded: true,
                        population: totalIndividuals
                    })
                })
            .catch(error => {
                console.error("Request failed", error);
            })
    }

    componentDidMount() {
        var query = new URLSearchParams(window.location.search);
        var name = query.get('name');
        this.upDateData(name);
    }

    render() {
        var query = new URLSearchParams(window.location.search);

        if (query.get("name") != null) {
            let sub = "Language distributions for " + this.state.community + " (population " + this.state.population + ").";
            let neighborhoodImage = GetImage(this.state.community);
            return (
                <Card>
                    <CardActionArea>
                        <CardHeader
                            title="Community language visualizer"
                            subheader={sub}
                        />
                        <CardMedia
                            component="img"
                            alt={"image that shows the " + this.state.community + " community"}
                            height="400"
                            image={neighborhoodImage}
                            title={this.state.community}
                        />
                    </CardActionArea>
                    <CardContent>
                        <canvas id="myChart" width="300" height="300"></canvas>
                    </CardContent>
                </Card>
            )
        } else {
            return (
                <Typography>
                    Please select a community from the selector to visualize language data.
                </Typography>
            )
        }
    }
}

export default InputChart;
