
from google.appengine.ext import ndb
import json
import webapp2
import logging
from models import Comic

class DeleteComic(webapp2.RequestHandler):
	def delete(self):
	    key_str = self.request.url
	    logging.warning(key_str)
	    key_str = self.request.url[self.request.url.rfind('/')+1:]
	    key = ndb.Key(urlsafe=key_str)
	    key.delete()

app = webapp2.WSGIApplication([
	('/py/delete_comic/', DeleteComic)
], debug=True)