# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
from pymongo import MongoClient
import pymongo
from pymongo.collation import Collation, CollationStrength
from scrapy.exceptions import DropItem
import logging
connection = "mongodb+srv://you_cao:22ohyeah@movie-catalog-9wta9.mongodb.net/test?retryWrites=true&w=majority"



class MovieInfoPipeline(object):
	def __init__(self):
		self.client = MongoClient(connection)
		self.db = self.client.get_database('movies')
		self.collection = self.db['MovieInfo']
		self.collection.ensure_index([('title', pymongo.HASHED)], collation = Collation(locale = 'en_US', strength=CollationStrength.SECONDARY))
	def process_item(self, item, spider):
		valid = True
		for data in item:
			if not data:
				valid = False
				raise DropItem("Missing{0}!".format(data))
		if valid:
			self.db['MovieInfo'].update({'title':item['title']}, {'$set': dict(item)},multi = True, upsert = True)
			#self.logger.msg("movie info added", level = log.DEBUG, spider = spider)
		return item

class TopMoviesPipeline(object):
	def __init__(self):
		self.client = MongoClient(connection)
		self.db = self.client.get_database('movies')
		self.collection = self.db['TopMovies']
		self.collection.ensure_index([('title', pymongo.HASHED)], collation = Collation(locale = 'en_US', strength=CollationStrength.SECONDARY))
	def process_item(self, item, spider):
		valid = True
		for data in item:
			if not data:
				valid = False
				raise DropItem("Missing{0}!".format(data))
		if valid:
			#self.db['TopMovies'].insert_one(dict(item))
			self.db['TopMovies'].update({'title':item['title']}, {'$set': dict(item)},multi = True, upsert = True)
			#self.logger.msg("reviews info added", level = log.DEBUG, spider = spider)
		return item

class MovieReviewPipeline(object):
	def __init__(self):
		self.client = MongoClient(connection)
		self.db = self.client.get_database('movies')
		self.collection = self.db['ReviewsSA']
		self.collection.ensure_index([('title', pymongo.HASHED)], collation = Collation(locale = 'en_US', strength=CollationStrength.SECONDARY))
	def process_item(self, item, spider):
		valid = True
		for data in item:
			if not data:
				valid = False
				raise DropItem("Missing{0}!".format(data))
		if valid:
			#self.db['TopMovies'].insert_one(dict(item))
			if(item['review_title']):
				self.collection.update({'review_title':item['review_title']}, {'$set': dict(item)},multi = True, upsert = True)
			#self.logger.msg("reviews info added", level = log.DEBUG, spider = spider)
		return item



