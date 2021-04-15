# twitter archive tools

see `Makefile` for archive related usage

## other scripts

### Block with followers

```
node block-with-followers.js [screen_name]
```

This will block the specified user and all their followers. Useful for avoiding pile-ons and targeted harasssment.

(Runs with a dealy between each block in order to not run into Twitter's API rate limit)
