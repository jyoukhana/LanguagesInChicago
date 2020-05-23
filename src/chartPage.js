import React from 'react';
import Chartjs from 'chart.js';
import { Bar } from 'react-chartjs-2';

function getBarData(data) {
    const barData = {
        labels: data.language,
        datasets: [{
            label: 'Totals',
            data: data.total,
            backgroundColor: 'rgba(85, 250, 20, 0.5)', //green
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }
    return barData;
}

//Creates the chart that does not require user input
export default function Chart(props) {
    return (
        <div>
            <Bar
                data={getBarData(props.languageData)}
                width={100}
                height={60}
                options={{
                    scales: {
                        yAxes: [{
                            type: "logarithmic",
                            ticks: {
                                beginAtZero: true,
                                userCallback: function (tick) {
                                    var remain = tick / (Math.pow(10, Math.floor(Math.log10(tick))));
                                    if (remain < 10) {
                                        return tick.toString();
                                    }
                                    return '';
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '# of individuals who speak the language'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Language'
                            }
                        }]
                    }
                }}
            />
        </div>
    );
}