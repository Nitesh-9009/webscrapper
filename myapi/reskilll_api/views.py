from rest_framework.views import APIView
from rest_framework.response import Response
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

class HackListView(APIView):
    def get(self, request):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")

        driver = webdriver.Chrome(options=chrome_options)
        driver.get("https://devpost.com/hackathons")

        time.sleep(5)  # Let JavaScript render fully

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        driver.quit()

        hackathons = []
        cards = soup.select(".hackathon-tile")

        for card in cards:
            title_elem = card.select_one("div.content h3")
            date_elem = card.select_one("div.submission-period ")
            prize_elem = card.select_one("div.content div.flex-row div.prize span.prize-amount span")
            link_elem = card.select_one("a[href]")
            image_elem = card.select_one("img")

            title = title_elem.get_text(strip=True) if title_elem else "N/A"
            date = date_elem.get_text(strip=True) if date_elem else "N/A"
            prize = prize_elem.get_text(strip=True) if prize_elem else "N/A"
            link = "https://devpost.com" + link_elem["href"] if link_elem else "N/A"
            image = image_elem["src"] if image_elem else "N/A"

            hackathons.append({
                "title": title,
                "date": date,
                "prize": prize,
                "link": link,
                "image": image,
            })

        return Response(hackathons)
