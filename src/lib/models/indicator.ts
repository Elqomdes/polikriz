import { Document, Schema, model } from 'mongoose'

export interface IIndicator extends Document {
  _id: string
  code: string
  name: string
  nameEn?: string
  description?: string
  descriptionEn?: string
  unit?: string
  unitEn?: string
  source?: string
  sourceEn?: string
  coverage?: string
  coverageEn?: string
  transformation?: string
  transformationEn?: string
  dataQuality?: string
  dataQualityEn?: string
  isActive: boolean
  order: number
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

const IndicatorSchema = new Schema<IIndicator>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  nameEn: {
    type: String
  },
  description: {
    type: String
  },
  descriptionEn: {
    type: String
  },
  unit: {
    type: String
  },
  unitEn: {
    type: String
  },
  source: {
    type: String
  },
  sourceEn: {
    type: String
  },
  coverage: {
    type: String
  },
  coverageEn: {
    type: String
  },
  transformation: {
    type: String
  },
  transformationEn: {
    type: String
  },
  dataQuality: {
    type: String,
    enum: ['Yüksek', 'Orta', 'Düşük', 'High', 'Medium', 'Low'],
    default: 'Orta'
  },
  dataQualityEn: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  categoryId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Indexes
IndicatorSchema.index({ code: 1 })
IndicatorSchema.index({ categoryId: 1 })
IndicatorSchema.index({ isActive: 1 })
IndicatorSchema.index({ name: 'text', nameEn: 'text' })

export const Indicator = model<IIndicator>('Indicator', IndicatorSchema)
