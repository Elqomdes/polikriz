import { Document, Schema, model } from 'mongoose'

export interface ICategory extends Document {
  _id: string
  name: string
  nameEn?: string
  description?: string
  descriptionEn?: string
  color?: string
  icon?: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>({
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
  color: {
    type: String
  },
  icon: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Indexes
CategorySchema.index({ isActive: 1 })
CategorySchema.index({ order: 1 })
CategorySchema.index({ name: 'text', nameEn: 'text' })

export const Category = model<ICategory>('Category', CategorySchema)

