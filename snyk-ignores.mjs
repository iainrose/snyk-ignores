import axios from 'axios';
import minimist from 'minimist';

var args = minimist(process.argv.slice(2));

const config = {
    baseURL: 'https://snyk.io/api/v1',
    headers: {'Authorization': 'token '+process.env.SNYK_TOKEN}
}

const org = args['org']
const project = args['project']

const ignores = (await axios.get(`/org/${org}/project/${project}/ignores`, config)).data

const issues = Object.keys(ignores)

var snykIgnore = `# Snyk (https://snyk.io) policy file, patches or ignores known vulnerabilities.
version: v1.14.0
ignore:
`

issues.forEach(issue => {
    // Issue ID
    var issueID = issue

    // Path
    var path = Object.keys(ignores[issue][0])
    if (path == '*') {var pathString = `'*'`} 
    else {pathString = path}

    // Reason
    var reason = ignores[issue][0][path].reason
    if(reason == '') {reason = 'None given'}

    // Expires
    var expires = ignores[issue][0][path].expires

    snykIgnore += `  ${issueID}:
    - ${pathString} :
      reason: '${reason}'
      expires: '${expires}'
`
})

console.log(snykIgnore);