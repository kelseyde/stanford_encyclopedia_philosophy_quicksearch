# stanford_encyclopedia_philosophy_quicksearch
An app for quick-searching entries in the Stanford Encyclopedia of Philosophy. Features a web scraper and an autocomplete algorithm.

available here: https://stanford-quicksearch.herokuapp.com/

![homescreen](stanford_homescreen.png)

I used [request](https://github.com/request/request) and [cheerio](https://github.com/cheeriojs/cheerio) to scrape the Stanford Encyclopedia of philosophy and create an API with all the entries' titles and URLs. The app allows the user to search for an article, with a custom-made autocomplete widget that allows them to view the closest matches and visit the relevant encyclopedia entry. 
