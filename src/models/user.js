const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')
const Task = require('./task')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://127.0.0.1:27017').then(console.log('connected'))

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        uniqe:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email !!!')
            }
        }

    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }

})

userSchema.virtual('tasks', {
    ref:'Task',
    localField:'id',
    foreignField:'userId'
})
userSchema.methods.toJSON = function () {
    const user = this       
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const payload = {
        userId: user.Id,
    };

    // Generate a token with the payload, a secret key, and options (if needed)
    const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // Change 'your_secret_key' to a secure key

    return token;
    // const user = this
    // const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    // user.tokens = user.tokens.concat({ token })
    // await user.save()
    // return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username:username })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = password == user.password

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
userSchema.pre('save', async function(){
    console.log('just before update')
})


const User = mongoose.model('User', userSchema)
module.exports = User

