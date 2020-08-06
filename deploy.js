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