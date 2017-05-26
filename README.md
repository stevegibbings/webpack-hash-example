# webpack-hash-example
For https://github.com/webpack/webpack/issues/1856

To show what hashes change in two different combinations with current setup.

Using -

- webpack-chunk-hash (for deterministic hashes when module ids change)
- chunk-manifest-webpack-plugin (to remove chunk manifest from initial chunk so chunk hash changes don't affect it)
- hashed-module-id-plugin webpack.HashedModuleIdsPlugin (to give modules a hash id that is persistenty across builds based on content)

## Test Cases

1. Initial Setup - Just a split point and two chunks with a common module.

2. Change Existing Chunk - A simple text change. Expectation => Only the chunk needs to change so only it's hash should change and other files with same hash are identical contents.

3. Add New Chunk - An additional chunk gets generated because of a new file in `./views`. Expectation => chunk-manifest needs to change and a new chunk is generated but vendor and app and other chunks should need to change. I see the file contents has changed and in the case of app, I appreciate the error handling logic but that means any additional chunk causes app to invalidate in the long term cache. I don't undersdtand why vendor's hash changes though.

Looking to understand why these cases result in this output and open to suggestions to reduce hashes changing on *materially* unchanged code.
