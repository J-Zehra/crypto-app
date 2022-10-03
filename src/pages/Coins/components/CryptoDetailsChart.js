import React from 'react'
import { Line } from 'react-chartjs-2'

export const CryptoDetailsChart = ({ label, price }) => {

    const chartData = {
        labels: label,
        datasets: [
            {
                label: 'Price in USD',
                data: price,
                fill: false,
                borderWidth: 1,
                lineTension: .1,
                borderColor: '#12925C',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointRadius: .5,
                pointHitRadius: 10,
                pointHoverBackgroundColor: '#7CBDA2'
            }
        ]
    }

    const options = {
        scales: {
            y: {
                grid: {
                    color: '#121212'
                }
            },
            x: {
                grid: {
                    color: '#121212'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }
    }

    return (
        <Line
            data={chartData}
            options={options}
        />
    )
}
