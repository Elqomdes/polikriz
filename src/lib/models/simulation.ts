import { Document, Schema, model } from 'mongoose'

export interface ISimulation extends Document {
  _id: string
  name: string
  description?: string
  type: 'game_theory' | 'time_series' | 'panel' | 'spatial'
  parameters: Record<string, unknown>
  results?: Record<string, unknown>
  status: 'draft' | 'running' | 'completed' | 'failed'
  seed?: number
  iterations?: number
  countryId?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

const SimulationSchema = new Schema<ISimulation>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['game_theory', 'time_series', 'panel', 'spatial']
  },
  parameters: {
    type: Schema.Types.Mixed,
    required: true
  },
  results: {
    type: Schema.Types.Mixed
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'running', 'completed', 'failed'],
    default: 'draft'
  },
  seed: {
    type: Number
  },
  iterations: {
    type: Number
  },
  countryId: {
    type: String
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Indexes
SimulationSchema.index({ type: 1 })
SimulationSchema.index({ status: 1 })
SimulationSchema.index({ countryId: 1 })
SimulationSchema.index({ createdAt: -1 })

export const Simulation = model<ISimulation>('Simulation', SimulationSchema)
