import axios from 'axios';

const config = {
    baseURL: 'https://snyk.io/api/v1',
    headers: {'Authorization': 'token 34ff4fc8-edff-4b66-af42-f7fa198269f9'}
}

const org = '86ecb770-4611-47bf-8caa-4a7ef9a1ea31'
const project = 'accd6203-f06a-4c70-8c48-a6f7beb7f929'

const ignores = (await axios.get(`/org/${org}/project/${project}/ignores`, config)).data

const issues = Object.keys(ignores)
console.log(issues)

var snykIgnore = `# Snyk (https://snyk.io) policy file, patches or ignores known vulnerabilities.
version: v1.14.0
ignore:
`

issues.forEach(issue => {
    // Issue ID
    var issueID = issue

    // Path
    var path = Object.keys(ignores[issue][0])
    if (path == '*') {
        var pathString = `'*'`
    } else
    {
        pathString = path
    }

    // Reason
    var reason = ignores[issue][0][path].reason
    if(reason == '') {
        reason = 'None given'
    }

    // Expires
    var expires = ignores[issue][0][path].expires

    snykIgnore += `  ${issueID}:
    - ${pathString} :
      reason: '${reason}'
      expires: '${expires}'
      `
})

console.log(snykIgnore);