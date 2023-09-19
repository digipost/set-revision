const core = require('@actions/core');
const github = require('@actions/github');

const REF_REGEX = /refs\/(.+)\/(.+)/; // e.g. 'refs/heads/main' or 'refs/tags/123'

try {

  const ref = github.context.ref;
  console.log(`Reference is ${ref}`);

  const [, refType, branch] = ref.match(REF_REGEX);
  console.log(`Branch is ${branch}, refType is ${refType}`);

  let revision = branch;
  if ('tags' !== refType) {
    console.log('Non-tag, adding -SNAPSHOT suffix')
    revision = revision + '-SNAPSHOT';
  } else {
    console.log('Tag, leaving revision as is')
  }

  core.exportVariable('REVISION', revision)
  core.setOutput('revision', revision);

} catch (error) {
  core.setFailed(error.message);
}
