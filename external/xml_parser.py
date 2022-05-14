#Python code to illustrate parsing of XML files
# importing the required modules
import csv
import requests
import xml.etree.ElementTree as ET
import glob
import re
def loadRSS():

        # url of rss feed
        url = 'https://github.com/abachaa/MedQuAD/blob/master/3_GHR_QA/0000001.xml'

        # creating HTTP response object from given url
        resp = requests.get(url)

        # saving the xml file
        with open('topnewsfeed.xml', 'wb') as f:
                f.write(resp.content)
                

def parseXML(xmlfile):

        # create element tree object
        tree = ET.parse(xmlfile)
        # get root element
        root = tree.getroot()
        # create empty list for news items
        newsitems = []
        # iterate news items
        for item in root.findall('QAPairs/QAPair'):
                # empty news dictionary
                news = {}
                for x in item:
                        if x.tag == "Question":
                                news["question"] = x.text
                        else:
                                if x.text != None:
                                        news["answer"] = x.text
                
                # iterate child elements of item
                if "answer" in news and  news["answer"] != "":
                        newsitems.append(news)
        # return news items list
        print(newsitems)
        return newsitems


def savetoCSV(newsitems, filename):

        # specifying the fields for csv file
        fields = ['question', 'answer']

        # writing to csv file
        with open(filename, 'a') as csvfile:

                # creating a csv dict writer object
                writer = csv.DictWriter(csvfile,  delimiter =',' ,fieldnames=fields)

                # writing headers (field names)
                # writer.writeheader()

                # writing data rows
                writer.writerows(newsitems)

        
def main():
      # load rss from web to update existing xml file
        qa_items = []
        for filename in glob.glob('/home/arunhiremath/database/MedQuAD/2_GARD_QA/*.xml'):
                newsitems = parseXML(filename)
                qa_items.extend(newsitems)        
        savetoCSV(qa_items, 'more_faq.csv')
        
        
# if __name__ == "__main__":

#       # calling main function
#       main()
# def main():
#     # load rss from web to update existing xml file
# #     loadRSS()
  
#     # parse xml file
#     newsitems = parseXML('topnewsfeed.xml')
  
#     # store news items in a csv file
#     savetoCSV(newsitems, 'topnews.csv')
      
      
if __name__ == "__main__":
  
    # calling main function
    main()
