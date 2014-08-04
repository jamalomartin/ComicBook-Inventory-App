import json
import webapp2
import logging
from models import Comic
from google.appengine.ext import ndb

class DeleteComic(webapp2.RequestHandler):
	def delete(self):
	    key_str = self.request.url
	    key_str = self.request.url[self.request.url.rfind('/')+1:]
	    key = ndb.Key(urlsafe=key_str)
	    key.delete()

app = webapp2.WSGIApplication([
	('/py/delete_comic.*', DeleteComic)
], debug=True)