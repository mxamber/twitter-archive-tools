.PHONY: all clean list-hashtags delete

all: threads hashtags/opsoup.md hashtags/ThisIsGenderDysphoria.md hashtags/solderingsoup.md hashtags/lyrasoup.md

list-hashtags:
	node list-hashtags.js

delete:
	node delete-tweets.js

hashtags:
	mkdir -p hashtags

threads:
	mkdir -p threads
	node find-threads.js selfawaresoup 4

hashtags/lyrasoup.md: hashtags
	node find-hashtag.js selfawaresoup lyrasoup

hashtags/opsoup.md: hashtags
	node find-hashtag.js selfawaresoup opsoup

hashtags/ThisIsGenderDysphoria.md: hashtags
	node find-hashtag.js selfawaresoup ThisIsGenderDysphoria

hashtags/trans.md: hashtags
	node find-hashtag.js selfawaresoup trans

hashtags/solderingsoup.md: hashtags
	node find-hashtag.js selfawaresoup solderingsoup

clean:
	rm -rf hashtags threads
