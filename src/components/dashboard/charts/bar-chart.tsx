'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { country: 'Türkiye', gdp: 4.5, inflation: 64.8, unemployment: 9.1, population: 84.7 },
  { country: 'ABD', gdp: 2.5, inflation: 3.2, unemployment: 3.7, population: 331.9 },
  { country: 'Almanya', gdp: -0.3, inflation: 3.7, unemployment: 3.0, population: 83.2 },
  { country: 'Fransa', gdp: 0.9, inflation: 4.9, unemployment: 7.4, population: 67.8 },
  { country: 'Çin', gdp: 5.2, inflation: 0.2, unemployment: 5.2, population: 1439.3 },
  { country: 'Japonya', gdp: 1.9, inflation: 3.2, unemployment: 2.6, population: 125.8 },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="country" 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#94a3b8' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#94a3b8' }}
          label={{ value: 'Değer', angle: -90, position: 'insideLeft' }}
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
        <Bar 
          dataKey="gdp" 
          fill="#3b82f6" 
          name="GSYİH Büyüme (%)"
          radius={[2, 2, 0, 0]}
        />
        <Bar 
          dataKey="inflation" 
          fill="#ef4444" 
          name="Enflasyon (%)"
          radius={[2, 2, 0, 0]}
        />
        <Bar 
          dataKey="unemployment" 
          fill="#f59e0b" 
          name="İşsizlik (%)"
          radius={[2, 2, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
