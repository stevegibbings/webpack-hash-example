# webpack-hash-example
For https://github.com/webpack/webpack/issues/1856

## UPDATE: 

I now understand why app content changes, the map it holds is needed to map module-name-string => module-id. Would be useful if it was possible to export that like webpack-chunk-manifest.



## Summary

To show what hashes change in two test cases with webpack 2.6.1. Based on the current as of writing webpack [recommend](https://webpack.js.org/guides/caching/#deterministic-hashes) approach.

Using -

- chunk-manifest-webpack-plugin (to remove chunk manifest from initial chunk so chunk hash changes don't affect it)
- hashed-module-id-plugin webpack.HashedModuleIdsPlugin (to give modules a hash id that is persistenty across builds based on content)

## Test Cases

1. Initial Setup - Just a split point and two chunks with a common module.

2. Change Existing Chunk - A simple text change.

Expectation:
Only the chunk needs to change so only its hash should change and other files have same hash are identical contents.

Result:
App and unchanged chunk keep thier hashes and files are identical. Vendor gets a new hash even though the files are identical.

3. Add New Chunk - An additional chunk gets generated because of a new file in `./views`. 

Expectation: 
chunk-manifest needs to change and a new chunk is generated but vendor, app and other chunks shouldn't need to change as webpack-chunk-manifest is used #naive-view.

Result: 
All hashes change. vendor.js is my biggest worry as it's liable to be our biggest bundle but change least often. This is why I used chunk-manifest-pluigin to keep its cache valid. The change occures because `var installedChunks` changes. Can this not be calculated from the chunk manifest so that it doesn't affect vendor?
App changes because there is a map to the views; module-name-string => module-id. Would be useful to export that like chunk manifest.
Chunks change even when the view they are generated from haven't changed. I see how the module ids can change which in turn changes the chunk content. If the module hash were used rather than module id they wouldn't need to change. I had beleived that was what hashed-module-id-plugin did #naive-view.

#Outcome

I came into this to solve a clash of hashes where file content had actually changed. I had used [an article](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95) from July 2015 that explained webpack used the source rather than output contents to generate the hash. webpack-md5-hash was used to change to output content to generate hashes. However that sometimes didn't get the hashes right for changed output files where only module ids had changed. This happened sometime after the site had been stable but we'd upgraded to webpack 2.x. Could have been a breaking change in webpack.

The webpack recommendation does look like it solves the hash clash however it also generates new hashes for unchanged output files. Having hashed files is important to leverage browser cache so that the new file is requested only when the file changes. I am going with this as my first option to solve the hash clash causing issues. Below I tried other options and seemed to get better results for my current use cases. I am concerned about using that in production before having understood why and if it is going to be consistent and stable.

I tried two alternatives in config to try to improve this -

1. Adding webpack-chunk-hash-plugin. This resulted in an improvement for case 2 where vendor kept its hash. However in case 3 app and vendor files changed but without a different hash.

2. In addition to 1 above removed hashed-module-id-plugin. This gave the same benefit to case 2. In case 3 all hashes changed. So it would seem this would be the better option if keeping cached files valid as long as possible is important. There may be cases where hashed-module-id-plugin is necessary and the webpack docs recommend it.

