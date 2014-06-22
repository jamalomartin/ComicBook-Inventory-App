import json
import webapp2
import logging
from models import Comic

class PostComicList(webapp2.RequestHandler):
	def post(self):
	    comics = self.request.body
	    logging.warning(comics)
	    comics = json.loads(comics)

	    for comic in comics:
	    	newComic = Comic(
	    				publisher=comic.get('publisher'),
	    				title=comic.get('title'),
	    				booknum=int(comic.get('booknum')),
	    				writer=comic.get('writer'),
	    				artist=comic.get('artist')
	    				)
	    	newComic.put()

app = webapp2.WSGIApplication([
    ('/py/record_comics', PostComicList)
], debug=True)