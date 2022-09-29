import { Box } from '@chakra-ui/react';
import React from 'react'
import { useGetCryptoHistoryQuery, useGetTopCryptoQuery } from '../../../services/crypto-api';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import moment from 'moment';


export const LineChart = ({ topCryptoHistoryLabel, topCryptoHistoryData }) => {

    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '1h'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '12h'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '24h'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '7d'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '30d'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '1y'})
    // useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod: '3y'})
    
    // console.log(new Date(1664358300))
    // console.log(new Date(1569628800))
    // console.log(moment(1664358300).format('DD-MM-YYYY'))


    const chartData = {
        labels: topCryptoHistoryLabel,
        datasets: [
            {
                label: 'Price in USD',
                data: topCryptoHistoryData,
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
