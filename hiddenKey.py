class Key:

    def __init__(self) :
        self.key = ''
        
    def addKeyToUrl(self, url):
        newurl = url + self.key
        return newurl
