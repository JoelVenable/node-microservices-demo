const path = require('path');
const execAsync = require('./execAsync');

const serviceNames = [
    'client',
    'comments',
    'event-bus',
    'moderation',
    'posts',
    'queries'
]





const install = async () => {
    await Promise.all(serviceNames.map((name) => {
        const dir = path.join(__dirname, name)
        return execAsync(`cd ${dir} && npm install`)

    }))
}



install()