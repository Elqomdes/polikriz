import { Document, Schema, model } from 'mongoose'

export interface ICountry extends Document {
  _id: string
  code: string
  name: string
  nameEn?: string
  region?: string
  subregion?: string
  population?: number
  area?: number
  latitude?: number
  longitude?: number
  createdAt: Date
  updatedAt: Date
}

const CountrySchema = new Schema<ICountry>({
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
  region: {
    type: String
  },
  subregion: {
    type: String
  },
  population: {
    type: Number
  },
  area: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
}, {
  timestamps: true
})

// Indexes
CountrySchema.index({ code: 1 })
CountrySchema.index({ region: 1 })
CountrySchema.index({ name: 'text', nameEn: 'text' })

export const Country = model<ICountry>('Country', CountrySchema)

