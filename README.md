# webpack-hash-example
For https://github.com/webpack/webpack/issues/1856

## UPDATE: 

I now understand why app content changes, the map it holds is needed to map module-name-string => module-id. Would be useful if it was possible to export that like webpack-chunk-manifest.



## Summary

To show what hashes change in two different combinations with current setup.

Using -

- chunk-manifest-webpack-plugin (to remove chunk manifest from initial chunk so chunk hash changes don't affect it)
- hashed-module-id-plugin webpack.HashedModuleIdsPlugin (to give modules a hash id that is persistenty across builds based on content)

## Test Cases

1. Initial Setup - Just a split point and two chunks with a common module.

2. Change Existing Chunk - A simple text change.

Expectation:
Only the chunk needs to change so only it's hash should change and other files with same hash are identical contents.

Result:
App and unchanged chunk keep thier hashes and files are identical. Vendor gets a new hash even though the files are identical.

3. Add New Chunk - An additional chunk gets generated because of a new file in `./views`. 

Expectation: 
chunk-manifest needs to change and a new chunk is generated but vendor and app and other chunks shouldn't need to change as webpack-chunk-manifest is used #naive-view.

Result: 
All hashes change. vendor.js is my biggest worry as it's liable to be our biggest bundle but change less often. This is why I used chunk-manifest-pluigin. The change occures because `var installedChunks` changes. Can this not be calculated from the chunk manifest so that it doesn't affect vendor?
App changes because there is a map to the views; module-name-string => module-id. Would be useful to export that like chunk manifest.
Chunks change even when the view they are generated from haven't changed. I see how the module ids can change, that in turn changes the chunk content. If the module hash were used rather than module id they wouldn't need to change. I beleived that was what intended by hashed-module-id-plugin.

#Outcome

I can into this to solve a clash or hashes where file content had actually changed. I had used 

I tried two alternatives in config to try to improve this.


