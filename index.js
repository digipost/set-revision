const core = require('@actions/core');
const github = require('@actions/github');

const REF_REGEX = /refs\/(.+)\/(.+)/;
const REF_TAGS = "tags"

function findGitBranchAndRefType(ref) {
  return ref.match(REF_REGEX);
}

try {

  const ref = github.context.ref;
  console.log(`Reference is ${ref}`);

  const [branch, refType] = findGitBranchAndRefType(ref);
  console.log(`Branch is ${branch}, refType is ${refType}`);

  let revision = branch;
  if (REF_TAGS === refType) {
    revision = revision + '-SNAPSHOT';
  }

  core.setOutput("revision", revision);

} catch (error) {
  core.setFailed(error.message);
}
