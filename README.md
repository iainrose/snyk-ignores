# snyk-ignores

This script generates the content for a .snyk policy file. This allows your local IDE or CLI tests to use the issue ignore list defined in snyk.io.

Benefits are that your security team can triage and maintain a single source of truth for ignores and developers will only see issues that need their attention.

## Installation 

`npm install`

## Pre-requisites

The script depends on the SNYK_TOKEN environment variable. This should be set to the value of your Snyk API token.

`export SNYK_TOKEN=xxxxxx`

## Usage

`node snyk-ignores.mjs --org=<org_id> --project=<project_id>`

`node snyk-ignores.mjs --org=86ecb770-4611-47bf-8caa-4a7ef9a1ea31 --project=accd6203-f06a-4c70-8c48-a6f7beb7f929`
