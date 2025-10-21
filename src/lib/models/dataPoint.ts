import { Document, Schema, model } from 'mongoose'

export interface IDataPoint extends Document {
  _id: string
  value: number
  year: number
  quarter?: number
  month?: number
  metadata?: Record<string, unknown>
  quality?: string
  isActive: boolean
  countryId: string
  indicatorId: string
  createdAt: Date
  updatedAt: Date
}

const DataPointSchema = new Schema<IDataPoint>({
  value: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  quarter: {
    type: Number,
    min: 1,
    max: 4
  },
  month: {
    type: Number,
    min: 1,
    max: 12
  },
  metadata: {
    type: Schema.Types.Mixed
  },
  quality: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  countryId: {
    type: String,
    required: true
  },
  indicatorId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Compound indexes
DataPointSchema.index({ countryId: 1, indicatorId: 1, year: 1, quarter: 1, month: 1 }, { unique: true })
DataPointSchema.index({ countryId: 1, indicatorId: 1 })
DataPointSchema.index({ year: 1 })
DataPointSchema.index({ isActive: 1 })

export const DataPoint = model<IDataPoint>('DataPoint', DataPointSchema)
