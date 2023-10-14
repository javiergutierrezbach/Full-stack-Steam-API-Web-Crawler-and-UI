class Key:

    def __init__(self) :
        self.key = 'EDC285E386628CA3416D6F0934979C1E'
        
    def addKeyToUrl(self, url):
        newurl = url + self.key
        return newurl
