# twitter archive tools

## Setup

- Copy `twitter-api.js.sample` to `twitter-api.js` and fill in your API credentials. You'll need a Twitter developer account to create these credentials.
- Install dependencies with `npm install`
- Place your downloaded Twitter archive in this repo's root directory and rename (or symlink) it to `archive`.

## Usage

Most of these scripts will throttle api calls in order to not run into Twitter's API rate limit. Running them might take a while.
E.g. If you run the `delete-tweets` script for the first time and your account is old and has a lot of tweets, this might take several days.

### Block with followers

(doesn't require an archive, API keys suffice)

```sh
node block-with-followers.js [screen_name]
```

This will block the specified user and all their followers. Useful for avoiding pile-ons and targeted harasssment.

This only support up to 5000 followers due to Twitter's API limitations.

```sh
node block-with-followers-considerate.js [screen_name]
```

This will exclude users you follow from the block list. For when you don't want to nuke mutuals.

### Block from a list of users

```sh
node block-from-file.js [file_name]
```

Will read the specified file as a JSON file, assuming that it contains an array of Twitter user objects. Each needs at least an `id_str` property.

Useful to block a very large number of people, e.g. followers og a large account. The list can be gerated using `get-followers.js`

### Get followers

```sh
node get-followers.js [screen_name]
```

Fetches the conplete list of followers for an account and stores it as JSON in `followers.json`.

This can take a very long time due to API rate limits. About 200 followers per minute. The resulting list can be used for `block-from-file.js`.

### Create a dump of all followers of an account

```sh
node get-followers.js [screen_name]
```

This will create a file called `followers.json` including detailed profile data of all followers of the specified account.

Useful for safety-related investigations (stalkers, abusers, etc) since Twitter doesn't offer tools to search among your followers.

Due to Twitter's strict rate limits on the `followers/list` endpoint, this script takes about 5 minutes to run for every 1000 followers.

### Find popular tweets

Sweet vanity …

```sh
node find-top-liked-tweets.js [N] # list tweets with at least N likes, highest first
```

```sh
node find-top-rewteeted-tweets.js [N] # list tweets with at least N retweets, highest first
```

### Extract all tweets with a certain hashtag

```sh
node list-hastags.js # lists all available hashtags in the current archive
```

```sh
mkdir -p hashtags # make sure the directory exists
node find-hashtag.js [hashtag] # leave off the '#' from the hashtag
```

Extracts all tweets containing the given hashtag into a markdown file.

### Delete hashtag

```sh
node delete-hashtag.js [hashtag] # leave off the '#' from the hashtag
```

Deletes ALL tweets containing the given hashtag.

### Extract threads

```sh
mkdir -p threads # make sure the directory exists
node find-threads.js [N]
```

Extracts each separate thread that least `N` tweets long in the twitter archive into a markdown file. Useful for archiving or making blogposts out of threads.

### Bulk delete stuff

(Do your future self a favor and use all of these regularly with a fresh Twitter archive)

```sh
node delete-ancient-tweets.js
# deletes ALL tweets before a certain date (see config.js)
```

```sh
node delete-retweets.js
# deletes ALL retweets that are older that X days (see config.js)
```

```sh
node delete-tweets.js
# deletes tweets that are older than X days
# AND don't have minimumLikes
# AND don't have mininumRetweets
# AND aren't explicitly marked as keepTweets
# (see config.js)
```
