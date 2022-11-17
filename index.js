const core = require('@actions/core');
const github = require('@actions/github');

const REF_REGEX = /refs\/(.+)\/(.+)/; // e.g. 'refs/heads/main' or 'refs/tags/123'
const REF_TAGS = "tags"

try {

  const ref = github.context.ref;
  console.log(`Reference is ${ref}`);

  const [, refType, branch] = ref.match(REF_REGEX);
  console.log(`Branch is ${branch}, refType is ${refType}`);

  let revision = branch;
  if (REF_TAGS === refType) {
    revision = revision + '-SNAPSHOT';
  }

  core.setOutput("revision", revision);

} catch (error) {
  core.setFailed(error.message);
}
