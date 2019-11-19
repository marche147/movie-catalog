import scrapy
from rottenTomatoes.items import TopRankingItem, MovieDetailsItem, MovieReviewItem
import re
from allennlp.predictors.predictor import Predictor
predictor = Predictor.from_path("https://s3-us-west-2.amazonaws.com/allennlp/models/sst-2-basic-classifier-glove-2019.06.27.tar.gz")

class MovieInfo(scrapy.Spider):
	custom_settings = {'ITEM_PIPELINES': {'rottenTomatoes.pipelines.MovieInfoPipeline': 300}}
	prefix = "https://www.imdb.com"
	name = 'movieDetails'
	allowed_domains = ["imdb.com"]
	index = 51
	start_urls = ["https://www.imdb.com/search/title/?title_type=feature&release_date=2019-01-01,2019-11-06",]

	while(index < 300):
		url = start_urls[0] + '&start=' + str(index) + '&ref_=adv_nxt'
		index = index + 50
		start_urls.append(url)	

	def str_to_list(self, string): 
		li = list(string.split(", ")) 
		return li

	def parse(self, response):
		movies = scrapy.Selector(response).xpath('//*[@id="main"]/div/div[3]/div/div')
		for m in movies:
			item = MovieDetailsItem()
			item['title'] = m.xpath('.//div[3]/h3/a/text()').extract_first().lower()
			item['certificate'] = m.xpath('.//div[3]/p[1]/span[1]/text()').extract_first()
			item['runtime'] = m.xpath('.//div[3]/p[1]/span[3]/text()').extract_first()
			g = m.xpath('.//div[3]/p[1]/span[5]/text()').extract_first()
			if(g): g = self.str_to_list(g.strip())
			item['genre'] = g
			item['cast'] = m.xpath('.//div[3]/p[3]/a[2]/text()').extract_first()
			item['director'] = m.xpath('.//div[3]/p[3]/a[1]/text()').extract_first()
			sub = self.prefix + m.xpath('.//div[3]/h3/a/@href').extract_first()
			req = scrapy.Request(url=sub, callback = self.parse_item, meta = {'item': item})
			yield req

	def parse_item(self, response):
		item = response.meta.get('item')
		s = response.xpath('//*[@id="title-overview-widget"]/div[3]/div[1]/div[1]/text()').extract_first()
		if(s): s = s.strip()
		item['plot'] = s
		item['img_url'] = response.xpath('//*[@id="title-overview-widget"]/div[1]/div[3]/div[1]/a/img/@src').extract_first()
		r = response.xpath('//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[2]/div[2]/div/a[4]/text()').extract_first()
		if(r): r = r.strip()
		item['release_date'] = r
		return item

class MovieRanksRT(scrapy.Spider):
	custom_settings = {'ITEM_PIPELINES': {'rottenTomatoes.pipelines.TopMoviesPipeline': 300}}
	prefix = "https://www.rottentomatoes.com"
	name = 'movieranksRT'
	allowed_domains = ["rottentomatoes.com"]
	start_urls = ["https://www.rottentomatoes.com/top/bestofrt/?year=2019",]

	def parse(self, response):
		movies = scrapy.Selector(response).xpath('//*[@id="top_movies_main"]/div/table/tr')
		for m in movies:
			item = TopRankingItem()
			item['rt_rank'] = m.xpath('.//td[1]/text()').extract_first().strip('.')
			item['rt_count'] = m.xpath('td[4]/text()').extract_first()
			sub = self.prefix + m.xpath('.//td[3]/a/@href').extract_first()
			req = scrapy.Request(url=sub, callback = self.parse_item, meta = {'item': item})
			yield req

	def parse_item(self, response):
		item = response.meta.get('item')
		s = response.xpath('//*[@id="topSection"]/div[2]/div[1]/h1/text()').extract_first().lower()
		item['title'] = re.sub(r'\(.*\)', '', s).rstrip(' ')
		item['rt_rate'] = response.xpath('//*[@id="tomato_meter_link"]/span[2]/text()').extract_first().strip()
		s = response.xpath('//*[@id="topSection"]/div[2]/div[1]/section/section/div[2]/h2/a/span[2]/text()').extract_first()
		if(s):
			item['rt_audience_rate'] = s.strip()
		s = response.xpath('//*[@id="topSection"]/div[2]/div[1]/section/p/descendant::text()').extract()
		return item

class MovieRanksIMDb(scrapy.Spider):
	custom_settings = {'ITEM_PIPELINES': {'rottenTomatoes.pipelines.TopMoviesPipeline': 300}}
	prefix = "https://www.imdb.com"
	name = 'movieranksIMDb'
	allowed_domains = ["imdb.com"]
	start_urls = ["https://www.imdb.com/list/ls041578836/?sort=user_rating,desc&st_dt=&mode=detail&page=1",]

	def parse(self, response):
		movies = scrapy.Selector(response).xpath('//*[@id="main"]/div/div[4]/div[3]/div')
		for m in movies:
			item = TopRankingItem()
			item['imdb_rank'] = m.xpath('.//div[2]/h3/span[1]/text()').extract_first()[:-1]
			sub = self.prefix + m.xpath('.//div[2]/h3/a/@href').extract_first()
			req = scrapy.Request(url=sub, callback = self.parse_item, meta = {'item': item})
			yield req

	def parse_item(self, response):
		item = response.meta.get('item')
		s = response.xpath('//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[2]/div[2]/h1/text()').extract_first().replace(u'\xa0', u'').lower()
		item['title'] = re.sub(r'\(.*\)', '', s).rstrip(' ')
		item['imdb_rate'] = response.xpath('//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[1]/div[1]/div[1]/strong/span/text()').extract_first()
		s = response.xpath('//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[2]/div[2]/div/a[4]/text()').extract_first()
		if(s): s = s.strip('\n')
		item['release_date'] = s
		return item


class MovieReviewsIMDb(scrapy.Spider):
	custom_settings = {'ITEM_PIPELINES': {'rottenTomatoes.pipelines.MovieReviewPipeline': 300}}

	prefix = "https://www.imdb.com"
	name = 'movieReviewsIMDb'
	allowed_domains = ["imdb.com"]
	index = 51
	start_urls = ["https://www.imdb.com/search/title/?title_type=feature&release_date=2019-01-01,2019-11-06",]
	while(index < 300):
		url = start_urls[0] + '&start=' + str(index) + '&ref_=adv_nxt'
		index = index + 50
		start_urls.append(url)

	def parse(self, response):
		movies = scrapy.Selector(response).xpath('//*[@id="main"]/div/div[3]/div/div')
		for m in movies:
			sub = self.prefix + m.xpath('.//div[3]/h3/a/@href').extract_first()
			s = sub.strip("?ref_=adv_li_tt")
			s = s + "reviews?ref_=tt_urv"
			req = scrapy.Request(url=s, callback = self.parse_item)
			yield req

	def parse_item(self, response):
		title = response.xpath('//*[@id="main"]/section/div[1]/div/div/h3/a/text()').extract_first().lower()
		reviews = scrapy.Selector(response).xpath('//*[@id="main"]/section/div[2]/div[2]/div')
		for r in reviews:
			item = MovieReviewItem()
			item['title'] = title
			item['score'] = 0
			item['user_name'] = r.xpath('.//div[1]/div[1]/div[2]/span[1]/a/text()').extract_first()
			item['post_time'] = r.xpath('.//div[1]/div[1]/div[2]/span[2]/text()').extract_first()
			item['website'] = "imdb"
			t = r.xpath('.//div/div[1]/a/text()').extract_first()
			if(t): t = t.strip()
			item['review_title'] = t
			c = r.xpath('.//div[3]/div[1]/text()').extract_first()
			if(c):
				c = c.strip()
			if(c):
				item['score'] = predictor.predict(sentence=c)['label']
			item['review_content'] = c
			
			yield item

class MovieReviewsRT(scrapy.Spider):
	custom_settings = {'ITEM_PIPELINES': {'rottenTomatoes.pipelines.MovieReviewPipeline': 300}}

	prefix = "https://www.rottentomatoes.com"
	name = 'movieReviewsRT'
	allowed_domains = ["rottentomatoes.com"]
	start_urls = ["https://www.rottentomatoes.com/top/bestofrt/?year=2019",]
	# index = 51
	# while(index < 300):
	# 	url = start_urls[0] + '&start=' + str(index) + '&ref_=adv_nxt'
	# 	index = index + 50
	# 	start_urls.append(url)

	def parse(self, response):
		movies = scrapy.Selector(response).xpath('//*[@id="top_movies_main"]/div/table/tr')
		for m in movies:
			s = self.prefix + m.xpath('.//td[3]/a/@href').extract_first()
			a = s + '/reviews?type=user'
			req = scrapy.Request(url= a, callback = self.parse_item)
			yield req

	def parse_item(self, response):
		title = response.xpath('//*[@id="main_container"]/div[1]/section/div/div[1]/h2/a/text()').extract_first().lower().strip()
		reviews = scrapy.Selector(response).xpath('//*[@id="movieUserReviewsContent"]/ul/li')
		index = 1
		for r in reviews:
			item = MovieReviewItem()
			item['title'] = title
			item['score'] = 0
			item['website'] = "rottentomatoes"
			c = r.xpath('.//div[2]/p[1]/text()').extract_first()
			index = index+1
			if(c):
				c = c.strip()
			if(c):
				item['score'] = predictor.predict(sentence=c)['label']
			item['review_content'] = c
			item['review_title'] = title +"reviews" + str(index)
			yield item













