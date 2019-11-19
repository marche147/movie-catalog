# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class TopRankingItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    release_date = scrapy.Field()
    rt_rank = scrapy.Field()
    imdb_rank = scrapy.Field()
    imdb_count = scrapy.Field()
    rt_count = scrapy.Field()
    rt_rate = scrapy.Field()
    rt_audience_rate = scrapy.Field()
    imdb_rate = scrapy.Field()
    

    pass


class MovieDetailsItem(scrapy.Item):
	certificate = scrapy.Field()
	runtime = scrapy.Field()
	genre = scrapy.Field()
	title = scrapy.Field()
	img_url = scrapy.Field()
	director = scrapy.Field()
	cast = scrapy.Field()
	plot = scrapy.Field()
	release_date = scrapy.Field()

class MovieReviewItem(scrapy.Item):
	title = scrapy.Field()
	review_content = scrapy.Field()
	review_title = scrapy.Field()
	website = scrapy.Field()
	score = scrapy.Field()
	user_name = scrapy.Field()
	post_time = scrapy.Field()





