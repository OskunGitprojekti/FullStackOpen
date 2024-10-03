import {ObjectId} from 'mongodb'
import mongoose from 'mongoose'

const uri = 'mongodb://root:root@localhost:27017/phonebook?authSource=admin'
mongoose.set('strictQuery', false)
mongoose.connect(uri)
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (v: string) {
        return /\d{2,3}-\d{7}/.test(v)
      },
      message: (props: { value: string; }) => `${props.value} is not a valid phone number!`
    }
  },
})
const Person = mongoose.model('Person', personSchema)

export async function getAll() {
  return Person.find({})
}

export async function count() {
  return Person.countDocuments()
}

export async function find(id: string) {
  return Person.findOne({_id: new ObjectId(id)})
}

export async function drop(id: string) {
  return Person.deleteOne({_id: new ObjectId(id)})
}

export async function nameExists(name: string) {
  const existingUser = await Person.findOne({name: name})
  return existingUser != null
}

export async function insertOne(name: string, number: string) {
  return Person.create({name: name, number: number})
}

export async function update(id: string, name: string, number: string) {
  return Person.updateOne({_id: new ObjectId(id)}, {$set: {name: name, number: number}})
}
