'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { year: '2010', TR: 4.2, US: 2.5, DE: 4.1, FR: 1.7 },
  { year: '2011', TR: 6.5, US: 1.6, DE: 3.7, FR: 2.1 },
  { year: '2012', TR: 2.1, US: 2.2, DE: 0.4, FR: 0.2 },
  { year: '2013', TR: 4.2, US: 1.7, DE: 0.4, FR: 0.7 },
  { year: '2014', TR: 2.9, US: 2.4, DE: 1.6, FR: 0.9 },
  { year: '2015', TR: 6.1, US: 2.9, DE: 1.5, FR: 1.1 },
  { year: '2016', TR: 3.2, US: 1.3, DE: 2.2, FR: 1.1 },
  { year: '2017', TR: 7.5, US: 2.3, DE: 2.2, FR: 2.1 },
  { year: '2018', TR: 2.8, US: 2.9, DE: 1.5, FR: 1.8 },
  { year: '2019', TR: 0.9, US: 2.3, DE: 0.6, FR: 1.8 },
  { year: '2020', TR: 1.8, US: -3.4, DE: -4.6, FR: -8.0 },
  { year: '2021', TR: 11.4, US: 5.9, DE: 2.9, FR: 6.8 },
  { year: '2022', TR: 5.6, US: 2.1, DE: 1.8, FR: 2.6 },
  { year: '2023', TR: 4.5, US: 2.5, DE: -0.3, FR: 0.9 },
]

export function TimeSeriesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="year" 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#94a3b8' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#94a3b8' }}
          label={{ value: 'GSYİH Büyüme (%)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="TR" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          name="Türkiye"
        />
        <Line 
          type="monotone" 
          dataKey="US" 
          stroke="#10b981" 
          strokeWidth={2}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          name="ABD"
        />
        <Line 
          type="monotone" 
          dataKey="DE" 
          stroke="#f59e0b" 
          strokeWidth={2}
          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
          name="Almanya"
        />
        <Line 
          type="monotone" 
          dataKey="FR" 
          stroke="#ef4444" 
          strokeWidth={2}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          name="Fransa"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

