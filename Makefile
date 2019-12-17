.PHONY: all clean list-hashtags

all: threads hashtags/opsoup.md hashtags/ThisIsGenderDysphoria.md hashtags/solderingsoup.md

list-hashtags:
	node list-hashtags.js

hashtags:
	mkdir -p hashtags

threads:
	mkdir -p threads
	node find-threads.js selfawaresoup 4

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
