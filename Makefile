.PHONY: all clean list-hashtags

all: threads-rendered opsoup-rendered

list-hashtags:
	node list-hashtags.js

hashtags:
	mkdir -p hashtags

threads:
	mkdir -p threads
	node find-threads.js selfawaresoup 5

hashtags/opsoup.md: hashtags
	node find-hashtag.js selfawaresoup opsoup

hashtags/ThisIsGenderDysphoria.md: hashtags
	node find-hashtag.js selfawaresoup ThisIsGenderDysphoria

clean:
	rm -rf hashtags threads
