const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://lizziecc:strong1226@clusterclaseweb-ijf9v.mongodb.net/characters?retryWrites=true'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})


