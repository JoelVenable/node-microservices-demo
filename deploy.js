const path = require('path')
const { exec } = require('child_process');

const serviceNames = [
    'client',
    'comments',
    'event-bus',
    'moderation',
    'posts',
    'queries'
]


const execAsync = async (command) => new Promise((res, rej) => {
    const process = exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`)
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
        }
    
        console.log(stdout)
    })

    process.on('exit', (code, signal) => {

        if (code === 0) res()
        else {
            console.log(`exit code: ${code}`)
            console.log('signal: ', signal)
            rej()
        }
    })
})


const deployAll = async () => {
    await Promise.all(serviceNames.map((name) => {
        const dir = path.join(__dirname, name)
        return execAsync(`cd ${dir} && npm run build`)

    }))

    const kubeDir = path.join(__dirname, 'infra/k8s')

    const ingressConfig = path.join(kubeDir, 'ingress-srv.yml')

    await Promise.all(serviceNames.map(async (name) => execAsync(`cd ${kubeDir} && kubectl apply -f ${name}-depl.yml`)));

    await execAsync(`kubectl apply -f ${ingressConfig}`)

    await Promise.all(serviceNames.map(async (name) => execAsync(`kubectl rollout restart deployment ${name}-depl`)));

}



deployAll()