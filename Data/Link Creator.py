import pandas as pd
import numpy as np
from itertools import cycle, islice


def roundrobin(*iterables):
    "roundrobin('ABC', 'D', 'EF') --> A D E B F C"
    # Recipe credited to George Sakkis
    pending = len(iterables)
    nexts = cycle(iter(it).__next__ for it in iterables)
    while pending:
        try:
            for next in nexts:
                yield next()
        except StopIteration:
            pending -= 1
            nexts = cycle(islice(nexts, pending))


Female_Links = ['zulily.com', 'bloglovin.com', 'thekrazycouponlady.com', 'hometalk.com', 'bravotv.com', 'oprah.com', 'thesimsresource.com', 'celebitchy.com', 'netmums.com', 'weddingwire.com', 'usmagazine.com', 
                'puckermod.com', 'astrology.com','refinery29.com', 'ellentube.com', 'math-aids.com', 'astrocenter.com', 'glamour.com', 'auntyacid.com', 'romper.com', 'petfinder.com', 'horoscope.com', 
                'activebeat.com', 'eonline.com', 'apartmenttherapy.com', 'etsy.com', 'globo.com', 'booking.com', 'pinterest.com', 'ok.co.uk', 'indeed.com', 'zillow.com', 'zoom.us', 'walmart.com', 'accuweather.com', 
                'outbrain.com', 'office365.com', 'taboola.com', 'hulu.com', 'wordpress.com', 'bustle.com', 'cosmopolitan.com', 'hellogiggles.com', 'yourtango.com','nymag.com', 'goodhousekeeping.com', 'sheknows.com', 
                'womenshealthmag.com', 'realsimple.com', 'elle.com', 'marieclaire.com', 'cafemom.com', 'thepioneerwoman.com', 'bhg.com', 'vogue.com', 'self.com', 'instyle.com', 'ulta.com', 'sephora.com', 
                'fragrantica.com', 'minq.com', 'maccosmetics.com', 'racked.com', 'avon.com', 'gilt.com', 'toryburch.com', 'herbeauty.com', 'greatclips.com', 'naturallycurly.com', 'lushusa.com', 'totalbeauty.com', 
                'birchbox.com', 'fragrancenet.com', 'ipsy.com', 'makeupalley.com', 'victoriassecret.com', 'womanwithin.com', 'ninewest.com', 'bloomingdales.com', 'davidsbridal.com', 'shopbop.com', 'lulus.com', 
                'shopstyle.com', 'nyandcompany.com', 'barneys.com', 'josbank.com', 'leboutique.com', 'lordandtaylor.com', 'pacsun.com', 'colehaan.com', 'bluefly.com', 'journeys.com', 'joesnewbalanceoutlet.com', 
                'loft.com', 'makingitmilennial.com', 'myunboundedlife.com', 'cupofjo.com', 'onbetterliving.com', 'goop.com', 'camillestyles.com']

Male_Links = ['newarena.com', 'covers.com', '90min.com', 'serverfault.com', 'scoresandodds.com', 'rotoworld.com', 'golfwrx.com', 'finviz.com', 'bringatrailer.com', 'hearthstonetopdecks.com', 'stocktwits.com', 
              'mmafighting.com', 'kitco.com', 'stockcharts.com', 'basketball-reference.com', 'dilbert.com', 'stockhouse.com', 'barchart.com', 'teamliquid.net', 'bleedinggreennation.com', 'baseball-reference.com', 
              'elevenwarriors.com', 'comicbookmovie.com', 'cagesideseats.com', 'gamebanana.com', 'si.com', 'thechive.com', 'wired.com', 'fashionbeans.com', 'complex.com', 'thrillist.com', 'playboy.com', 
              'askmen.com', 'menshealth.com', 'esquire.com', 'gq.com', 'popularmechanics.com', 'scientificamerican.com', 'motortrend.com', 'artofmanliness.com', 'popsci.com', 'mensfitness.com', 'coed.com', 
              'highsnobiety.com', 'muscleandfitness.com', 'mademan.com', 'mensjournal.com', 'nextluxury.com', 'fhm.com', 'movember.com', 'caranddriver.com', 'rankingsandreviews.com', 'autoblog.com', 'nadaguides.com', 
              'samarins.com', 'carthrottle.com', 'thecarconnection.com', 'roadandtrack.com', 'honestjohn.co.uk', 'paultan.org', 'odometer.com', 'transworld.net', 'autoweek.com', 'topspeed.com', 'topgear.com', 
              'hotrod.com', 'trucktrend.com', 'team-bhp.com', 'cnet.com', 'tomshardware.com', 'gizmodo.com', 'theverge.com', 'howtogeek.com', 'gsmarena.com', 'pcmag.com', 'engadget.com', 'digitaltrends.com', 
              'techcrunch.com', 'imore.com', 'makeuseof.com', 'ccm.net','techtarget.com', 'tomsguide.com','hongkiat.com', 'pcworld.com', 'pcadvisor.co.uk', 'espn.com', 'marca.com', 'as.com', 'nfl.com',
              'sports.yahoo.com', 'livescore.com', 'cbssports.com', '247sports.com', 'nba.com', 'nbcsports.com', 'flashscore.com', 'dazn.com', 'rivals.com', 'nhl.com']

Young_Links = ['pinkvilla.com', 'rajnikantvscidjokes.in', 'deadspin.com', 'dorkly.com', 'kotaku.com', 'jezebel.com', 'somethingawful.com', 'tfln.co', 'weddingwire.com', 'gfycat.com', 'kinja.com', 'niketalk.com', 
               'gothamist.com', 'imgur.com', 'netmums.com', 'crunchbase.com', 'brobible.com', 'pitchfork.com', 'jalopnik.com', 'eater.com', 'camelcamelcamel.com', 'twitch.tv', 'op.gg', 'steampowered.com', 
               'roblox.com', 'gamepedia.com', 'steamcommunity.com', 'gamefaqs.com', 'gamestop.com', 'coolmath-games.com', 'battle.net', 'leagueoflegends.com', 'playstation.com', 'xbox.com', 'gamespot.com', 
               'friv.com', 'y8.com', 'polygon.com', 'miniclip.com', 'onegreenplanet.org', 'cookieandkate.com', 'vegrecipesofindia.com', 'chicvegan.com', 'ohsheglows.com', 'farmfreshtoyou.com', '101cookbooks.com', 
               'vegkitchen.com', 'vegetariantimes.com', 'vrg.org', 'mynewroots.org', 'padhuskitchen.com', 'veganhealth.org', 'veganricha.com', 'vegansociety.com', 'holycowvegan.net', 'vegnews.com', 'chooseveg.com', 
               'veggieboards.com', 'buzzfeed.com', 'wattpad.com', 'pandora.com', 'vice.com', 'www.elitedaily.com', 'theconfusedmillennial.com', 'missmillmag.com', 'biancadottin.com', 'withasplashofcolor.com',
               'primermagazine.com', 'thelagirl.com', 'literallydarling.com', 'thefemalemilennials.com', 'lusciousmind.com', 'theblessedmessblog.com', 'themotivatedmilennial.com', 'lifewire.com', 'namecheap.com',
               'lifehacker.com', 'thenextweb.com', 'tech2.com', 'mashable.com', 'technorati.com', 'businessinsider.com', 'macrumors.com', 'venturebeat.com', 'blog.playstation.com', 'gigaom.com', 'slashgear.com',
               'ubergizmo.com', 'eurogamer.net', 'droid-life.com', 'popculthq.com', 'culturefix.com', 'techradar.com', 'fanpop.com', 'denofgeek.com', 'ign.com', 'marvel.com', 'digitalspy.com', 
               'bleedingcool.com', 'letterboxd.com']

Senior_Links = ['conservative101.com', 'freedomdaily.com',  'usherald.com','bipartisanreport.com', 'truthexaminer.com', 'thejigsawpuzzles.com', 'westernjournalism.com', 'thefederalistpapers.org', 'shockwave.com',  
                'convervativetribune.com', 'dailycaller.com', 'allenbwest.com', 'wnd.com', 'detonate.com', 'standardnews.com', 'definition.org', 'liftable.com', 'youngcons.com', 'americanthinker.com', 'omglane.com', 
                'viral-kittens.com', 'lifedaily.com', 'thebrofessional.net', 'dailykos.com','foxybingo.com', 'skybingo.com', 'bingo.com', 'playbonds.com', 'galabingo.com', 'bgo.com', 'jackpotjoy.com', 'groupon.com', 
                'slickdeals.net', 'retailmenot.com', 'snapdeal.com', 'dubli.com', 'coupons.com', 'ebates.com', 'getitfree.us', 'offers.com', 'dealnews.com', 'woot.com', 'coupons.net', 'goodrx.com', 'hotukdeals.com', 
                'mommypage.com', 'shopathome.com', 'livingsocial.com', '50shadesofage.com', 'goldenagetrips.com', 'sandinmysuitcase.com', 'lavenderandlovage.com', 'boomeresque.com', 'travelpast50.com', 
                'anitasfeast.com/blog', 'ageinplacetech.com', 'pointsoflight.gov.uk/caron-cares', 'turn2us.org.uk', 'playlistforlife.org.uk', 'euansguide.com', 'retiremove.co.uk', 'grandparentsplus.org.uk', 
                'lookfabulousforever.com', 'whentheygetolder.co.uk', 'laterlife.com', 'moneywise.co.uk', 'ageuk.org.uk','senioradvisor.com/blog', 'independentage.org', 'thesilverline.org.uk', 
                'seniorshelpingseniors.co.uk', 'seniorplanet.org', 'aplaceformom.com/blog', 'evergreenclub.com', 'silversurfers.com', 'u3a.org.uk', 'fabafterfifty.co.uk', 'sixtyplusurfers.co.uk', 'meetup.com', 
                'sixtyandme.com', 'startsat60.com', 'bestforpuzzles.com', 'midlifeboulevard.com', 'ancestry.co.uk', 'tourismisforeverybody.org', 'designed2enable.co.uk', 'reifpsychservices.com', 
                'myhometouch.com/articles', 'actionforelders.org.uk', 'limitlesstravel.org/blog', 'viewfromawalkingframe.co.uk', 'bookshare.org/cms', 'seniorfitness.com', 'considerable.com', 'aarp.com',
                'luminosity.com', 'pogo.com', 'freemahjong.com', 'eastoftheweb.com', 'senior.com']

print(len(Female_Links), len(Male_Links), len(Young_Links), len(Senior_Links))
#             100               100              100               100


Female_Links_25 = ['zulily.com', 'bloglovin.com', 'thekrazycouponlady.com', 'hometalk.com', 'bravotv.com', 'oprah.com', 'thesimsresource.com', 'celebitchy.com', 'netmums.com', 'weddingwire.com', 'usmagazine.com', 
                   'puckermod.com', 'astrology.com','refinery29.com', 'ellentube.com', 'math-aids.com', 'astrocenter.com', 'glamour.com', 'auntyacid.com', 'romper.com', 'petfinder.com', 'horoscope.com', 
                   'activebeat.com', 'eonline.com', 'apartmenttherapy.com']

Male_Links_25 = ['newarena.com', 'covers.com', '90min.com', 'serverfault.com', 'scoresandodds.com', 'rotoworld.com', 'golfwrx.com', 'finviz.com', 'bringatrailer.com', 'hearthstonetopdecks.com', 'stocktwits.com', 
                 'mmafighting.com', 'kitco.com', 'stockcharts.com', 'basketball-reference.com', 'dilbert.com', 'stockhouse.com', 'barchart.com', 'teamliquid.net', 'bleedinggreennation.com', 'baseball-reference.com', 
                 'elevenwarriors.com', 'comicbookmovie.com', 'cagesideseats.com', 'gamebanana.com']

Young_Links_25 = ['pinkvilla.com', 'rajnikantvscidjokes.in', 'deadspin.com', 'dorkly.com', 'kotaku.com', 'jezebel.com', 'somethingawful.com', 'tfln.co', 'weddingwire.com', 'gfycat.com', 'kinja.com', 'niketalk.com', 
                  'gothamist.com', 'imgur.com', 'netmums.com', 'crunchbase.com', 'brobible.com', 'refinery29.com', 'pitchfork.com', 'jalopnik.com', 'gizmodo.com', 'teamliquid.net', 'eater.com', 'camelcamelcamel.com', 'romper.com']

Senior_Links_25 = ['conservative101.com', 'freedomdaily.com', 'usherald.com','bipartisanreport.com', 'truthexaminer.com', 'thejigsawpuzzles.com', 'westernjournalism.com', 'thefederalistpapers.org', 'shockwave.com',  
                   'kitco.com', 'convervativetribune.com', 'dailycaller.com', 'allenbwest.com', 'wnd.com', 'detonate.com', 'standardnews.com', 'definition.org', 'liftable.com', 'youngcons.com', 'americanthinker.com',
                   'omglane.com', 'viral-kittens.com', 'lifedaily.com', 'thebrofessional.net', 'dailykos.com']

print(len(Female_Links_25), len(Male_Links_25), len(Young_Links_25), len(Senior_Links_25))


dfF = pd.DataFrame(np.array(Female_Links_25), columns=['url_domain'])
dfM = pd.DataFrame(np.array(Male_Links_25), columns=['url_domain'])
dfY = pd.DataFrame(np.array(Young_Links_25), columns=['url_domain'])
dfS = pd.DataFrame(np.array(Senior_Links_25), columns=['url_domain'])

dfF.to_csv("PersonaLinksF.csv", index=False)
dfM.to_csv("PersonaLinksM.csv", index=False)
dfY.to_csv("PersonaLinksY.csv", index=False)
dfS.to_csv("PersonaLinksS.csv", index=False)


FY_Links_25 = list(roundrobin(Female_Links_25, Young_Links_25))
FS_Links_25 = list(roundrobin(Female_Links_25, Senior_Links_25))
MY_Links_25 = list(roundrobin(Male_Links_25, Young_Links_25))
MS_Links_25 = list(roundrobin(Male_Links_25, Senior_Links_25))

dfFY = pd.DataFrame(np.array(FY_Links_25), columns=['url_domain'])
dfFS = pd.DataFrame(np.array(FS_Links_25), columns=['url_domain'])
dfMY = pd.DataFrame(np.array(MY_Links_25), columns=['url_domain'])
dfMS = pd.DataFrame(np.array(MS_Links_25), columns=['url_domain'])

dfFY.to_csv("PersonaLinksFY.csv", index=False)
dfFS.to_csv("PersonaLinksFS.csv", index=False)
dfMY.to_csv("PersonaLinksMY.csv", index=False)
dfMS.to_csv("PersonaLinksMS.csv", index=False)