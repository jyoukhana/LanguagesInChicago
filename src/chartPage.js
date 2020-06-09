import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


function generateDescription(data) {
    let desc = "Bar chart. x axis, Language. y axis, number of individuals who speak the language.";

    try {
        for (let i = 0; i < data.language.length; i++) {
            desc += " " + data.total[i] + " individuals speak " + data.language[i] + ".";
        }
    }
    catch (error) {
        //nothing happens
    }
    return desc;
}

function getBarData(data) {
    const barData = {
        labels: data.language,
        datasets: [{
            label: "Languages",
            data: data.total,
            backgroundColor: data.color,
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }]
    }
    return barData;
}

function createChart(data, ctx) {
    var barChart = require("chart.js");
    const totalChart = new barChart(ctx, {
        type: 'bar',
        data: getBarData(data),
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (tick) {
                            var remain = tick / (Math.pow(10, Math.floor(barChart.helpers.log10(tick))));
                            if (remain < 10) {
                                return tick.toString();
                            }
                            return '';
                        }
                    },
                    scaleLabel: {
                        fontSize: 20,
                        fontColor: 'black',
                        display: true,
                        labelString: '# of individuals who speak the language'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        fontSize: 20,
                        fontColor: 'black',
                        display: true,
                        labelString: 'Language'
                    }
                }]
            }
        }
    });
}

//Creates the chart that does not require user input
export default function Chart(props) {
    const [ctx, setCtx] = useState("");

    //useEffect is like the componentDidMount(), but for hooks
    useEffect(() => {
        setCtx(document.getElementById('totalChart').getContext('2d'));
    }, []);

    createChart(props.languageData, ctx);

    return (
        <Card>
            <CardHeader
                title="Non-English Languages Spoken Across Chicago"
            />
            <CardContent>
                <canvas id="totalChart" width="250" height="300" aria-label={generateDescription(props.languageData)}></canvas>
            </CardContent>
        </Card>
    );
}