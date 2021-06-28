import axios from 'axios';
import minimist from 'minimist';

// Get arguments
var args = minimist(process.argv.slice(2));

// Config for Axios
const config = {
    baseURL: 'https://snyk.io/api/v1',
    headers: {'Authorization': 'token '+process.env.SNYK_TOKEN}
}

// Make GET request to Snyk API
const ignores = (await axios.get(`/org/${args['org']}/project/${args['project']}/ignores`, config)).data

// Create a list of the issue ID's
const issues = Object.keys(ignores)

// Create header of .snyk file
var snykIgnore = `# Snyk (https://snyk.io) policy file, patches or ignores known vulnerabilities.
version: v1.14.0
ignore:
`

issues.forEach(issue => {
    // Get Path
    var path = Object.keys(ignores[issue][0])
    if (path == '*') {var pathString = `'*'`} 
    else {pathString = path}

    // Get Reason
    var reason = ignores[issue][0][path].reason
    if(reason == '') {reason = 'None given'}

    // Get Expires
    var expires = ignores[issue][0][path].expires

    // Create entry for current issue
    snykIgnore += `  ${issue}:
    - ${pathString} :
      reason: '${reason}'
      expires: '${expires}'
`
})

console.log(snykIgnore);