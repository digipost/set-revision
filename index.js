const core = require('@actions/core');
const github = require('@actions/github');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  console.log('Finding desirable REVISION value')
  const githubRef = core.getInput('github_ref');
  console.log(`Provided reference was ${githubRef}!`);

  let revision = githubRef;
  if (revision.startsWith('refs/tags') === false) {
    revision = revision + '-SNAPSHOT'
  }

  core.setOutput("revision", revision);

} catch (error) {
  core.setFailed(error.message);
}
