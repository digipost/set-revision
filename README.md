# Set Revision javascript action

This action takes in a github_ref value, and returns
the desired Maven REVISION property according to
our specification at Digipost. The specification, in short, is:
- Tags remain unchained
- Default branches are renamed to `latest`
- Non-default branches are appended with a `-SNAPSHOT` suffix

## Inputs

### `github_ref`

**Required** The `GITHUB_REF#refs/*/` action environment value

## Outputs

### `revision`

The appropriate `REVISION` variable

## Example usage

```yaml
uses: digipost/set-revision@v1.0
with:
  github_Ref: ${GITHUB_REF#refs/*/}
```
