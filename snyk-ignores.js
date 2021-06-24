const axios = require('axios').default;

const config = {
    baseURL: 'https://snyk.io/api/v1',
    headers: {'Authorization': 'token 34ff4fc8-edff-4b66-af42-f7fa198269f9'}
}

const org = '86ecb770-4611-47bf-8caa-4a7ef9a1ea31'
const project = 'accd6203-f06a-4c70-8c48-a6f7beb7f929'


async function getIgnores(org, project) {
    const response = await axios.get('/org/'+org+'/project/'+project+'/ignores', config)
    return response.data;
}

getIgnores(org, project).then(ignores);

console.log(ignores);