I forked this from [selfawaresoup/twitter-archive-tools](https://github.com/selfawaresoup/twitter-archive-tools) (UPDATE: repo since defunct!) to implement some changes and reworkings of my own. You can find her original readme [here](/README.old.md) (with one edit by me) or [here](https://github.com/selfawaresoup/twitter-archive-tools/blob/main/README.md) (current version).

The changes made here have only been tested to a very limited extent, mostly because I didn't want to go delete a bunch of my own tweets to verify they worked. I made these changes to the best of my abilities, but I can't guarantee they'll work. Most likely, if something were to go wrong, that would be an exception being thrown before the script even starts doing anything, if there were issues authenticating the client (since that's the biggest change I made, see commits [8891d12](https://github.com/mxamber/twitter-archive-tools/commit/8891d125c580a3afb13c7f0ce0f7546dfe2f058f) and [0dbb621](https://github.com/mxamber/twitter-archive-tools/commit/0dbb621ad9406d5cb1e777c192390343f23671cf)). If that happens, please open an issue and I'll look into fixing it. For any issues regarding the actual scripts past the first few lines, please file that with the OG repo (except for `block-with-followers-considerate.js`, that's my adaptation of her script).
