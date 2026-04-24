import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartProps } from '../types';
import _ from 'lodash';

export default function Statistics({ data, yKey }: ChartProps) {
    const chartData = _(data).groupBy('activity')
        .map((objs, key) => ({
            name: key,
            [yKey]: _.sumBy(objs, 'duration')
        }))
        .value();

    return (
        <ResponsiveContainer width="80%" height={500}>
            <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey={yKey} fill="#2593fb" />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}