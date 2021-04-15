# twitter archive tools

Copy `twitter-api.js.sample` to `twitter-api.js` and fill in your API credentials.

See `Makefile` for archive related usage (extracting threads and hashtags, deleting old tweets)

## Other scripts

### Block with followers

```
node block-with-followers.js [screen_name]
```

This will block the specified user and all their followers. Useful for avoiding pile-ons and targeted harasssment.

(Runs with a dealy between each block in order to not run into Twitter's API rate limit)
