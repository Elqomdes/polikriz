'use client'

import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

const data = [
  {
    subject: 'Ekonomi',
    TR: 120,
    US: 110,
    DE: 100,
    fullMark: 150,
  },
  {
    subject: 'Enerji',
    TR: 98,
    US: 130,
    DE: 85,
    fullMark: 150,
  },
  {
    subject: 'Çevre',
    TR: 86,
    US: 130,
    DE: 90,
    fullMark: 150,
  },
  {
    subject: 'Sağlık',
    TR: 99,
    US: 100,
    DE: 85,
    fullMark: 150,
  },
  {
    subject: 'Demografi',
    TR: 85,
    US: 90,
    DE: 100,
    fullMark: 150,
  },
  {
    subject: 'Sosyal',
    TR: 65,
    US: 85,
    DE: 90,
    fullMark: 150,
  },
]

export function RadarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
        />
        <PolarRadiusAxis 
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          domain={[0, 150]}
        />
        <Radar
          name="Türkiye"
          dataKey="TR"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.1}
          strokeWidth={2}
        />
        <Radar
          name="ABD"
          dataKey="US"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.1}
          strokeWidth={2}
        />
        <Radar
          name="Almanya"
          dataKey="DE"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.1}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
