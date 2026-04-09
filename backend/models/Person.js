const {model, Schema}=require('mongoose')

const personSchema = new Schema({
  name: {
    type: String, 
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    validate: {
        validator: function(v) {
            return /\d{4}-\d{6}/.test(v)
        },
        message: props => `${props.value} is not a valid `
    },
    required: true
  },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = model("Person", personSchema, "persons");

module.exports = Person;