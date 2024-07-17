import urllib, sys, os, subprocess, urllib.request
from urllib.request import Request, urlopen
from urllib.request import urlretrieve
from urllib.error import HTTPError, URLError
import re


def escapeChars(str):
    return re.sub('/', '-', str)


print("---------------------------------")
print("VideoOnDemandRipper by Pirati @PiradduSardu")
print("---------------------------------")
print("How to use? Just enter the m3u_plus Link")
print("---------------------------------")
print("Make the choice to download movies or series")
print("---------------------------------")
print("Select the desired category and start stealing VOD!")
print("---------------------------------")
print("Hop on board! pirates!")

print()
m3url = input("Enter Playlist URL: ")
print()


print()
print("Movies = 1")
print("Series = 2")
print()
vodorseries = input("What do you want to Download: ")
print()
if vodorseries == '1' or vodorseries == '2':
    print("Please Wait A Minute")
else:    
    print("Not an option : Please type 1 or 2")
    vodorseries = input("What do you want to Download: ")
    
print()    



if vodorseries == '1':
    print("Please Wait we are getting Movies Categories ...")
    print()
    req = Request(m3url, headers={'User-Agent':'Chrome','Accept-Encoding': ''})
    textxx = urlopen(req).read()
    text = textxx.decode('utf-8')
    list_categories=[]

    lignes=text.split("\n")
    for i,j in zip(range(1,len(lignes),2),range(2,len(lignes),2)):
        if "/movie/" in lignes[j]:
            infos=lignes[i].split('group-title="')[1]
            if 'VOD' in infos:
                infos=infos.replace("VOD | ","")
            categorie=infos.split(",")[0]
            categorie=categorie.replace('"','')

            if categorie not in list_categories:
                list_categories.append(categorie)

    for categorie in list_categories:
        print(categorie)
    print()
    categorie_choisit=input("choose a category:")
    print()
    folder_name = input("Choose a folder name :")
    
    if len(folder_name) > 1:
        moviefold = folder_name
    else :
        moviefold = categorie_choisit
    
    print()
    
    for i,j in zip(range(1,len(lignes),2),range(2,len(lignes),2)):
        if "/movie/" in lignes[j]:

            infos=lignes[i].split('group-title="')[1]
            if 'VOD' in infos:
                infos=infos.replace("VOD | ","")
            categorie=infos.split(",")[0]
            categorie=categorie.replace('"','')
            if categorie==categorie_choisit:
                if len(infos.split(","))==2:
                    if infos.count(" - ")==2:
                        name=infos.split(",")[1].split(" - ")[1]
                    elif infos.count(" - ")==1:
                        if len(infos.split(",")[1].split(" - ")[0])>3:
                            name=infos.split(",")[1].split(" - ")[0]
                        else: 
                            name=infos.split(",")[1].split(" - ")[1]
                    elif infos.count(" - ")>=3:
                        name=infos.split(",")[1].split(" - ")[2]
                        
                    elif infos.split(",")[1].count("|")==2:
                        name=infos.split(",")[1].split("|")[2]
                    else:
                        name=infos.split(",")[1].split(" (")[0]
                else:
                    if infos.split(",")[1].count("|")==2:
                        name=infos.split(",")[1].split("|")[2]
                    else:
                        name=infos.split(",")[1]
            
                
                
                if not os.path.exists('/home/movies/'+moviefold):
                    os.makedirs('/home/movies/'+moviefold)
                        
                fileurl = lignes[j]
                extension = fileurl.split("/")[6]
                streamid = extension.split(".")[0]
                extension = extension.replace(streamid+'.', "")
                movie_name=name.split("_")
                movie_name=movie_name[0]
                if ' / ' in movie_name: 
                    movie_name=movie_name.replace(" / "," - ")
                
                filenamew = '/home/movies/'+moviefold+'/'+escapeChars(movie_name)+'.'+extension.strip()
                
                
                if not os.path.exists(filenamew):
                    def dlProgress(count, blockSize, totalSize):
                        percent = int(count*blockSize*100/totalSize)
                        sys.stdout.write("\r" + name + "  (%d%%)" % percent)
                        sys.stdout.flush()


                    if __name__ == '__main__':
                        class AppURLopener(urllib.request.FancyURLopener):
                            version = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.69 Safari/537.36"
                        urllib._urlopener = AppURLopener()
                        try:
                            urllib._urlopener.retrieve(fileurl, filenamew, dlProgress)
                        
                        except HTTPError as e:
                            print('Error code: ', e.code)
                            pass
                        except URLError as e:
                            print('Reason: ', e.reason)
                            pass
                        else:
                            print(' - Completed')
                            pass
                        
                    
                else:    
                    
                    print('Movie already Downloaded')
                    
                    



elif vodorseries == '2':

    print("Please Wait we are getting Series Categories ...")
    print()

    req = Request(m3url, headers={'User-Agent':'Chrome','Accept-Encoding': ''})
    textxx = urlopen(req).read()
    text = textxx.decode('utf-8')
    list_categories=[]

    lignes=text.split("\n")
    for i,j in zip(range(1,len(lignes),2),range(2,len(lignes),2)):
        if "/series/" in lignes[j]:
            infos=lignes[i].split('group-title="')[1]
            if 'SRS' in infos:
                infos=infos.replace("SRS | ","")
            categorie=infos.split(",")[0]
            categorie=categorie.replace('"','')

            if categorie not in list_categories:
                list_categories.append(categorie)

    for categorie in list_categories:
        print(categorie)

    print()
    categorie_choisit=input("categorie Name : ")
    print()
    foldertosave=input("Folder : ")
    print()

    for i,j in zip(range(1,len(lignes),2),range(2,len(lignes),2)):
        if "/series/" in lignes[j]:

            infos=lignes[i].split('group-title="')[1]
            if 'SRS' in infos:
                infos=infos.replace("SRS | ","")
            categorie=infos.split(",")[0]
            categorie=categorie.replace('"','')
            if categorie==categorie_choisit:
                if len(infos.split(","))==2:
                    if infos.count(" - ")==2:
                        name=infos.split(",")[1].split(" - ")[1]
                    elif infos.count(" - ")==1:
                        if len(infos.split(",")[1].split(" - ")[0])>3:
                            name=infos.split(",")[1].split(" - ")[0]
                        else: 
                            name=infos.split(",")[1].split(" - ")[1]
                    elif infos.count(" - ")>=3:
                        name=infos.split(",")[1].split(" - ")[2]
                        
                    elif infos.split(",")[1].count("|")==2:
                        name=infos.split(",")[1].split("|")[2]
                    else:
                        name=infos.split(",")[1].split(" (")[0]
                else:
                    if infos.split(",")[1].count("|")==2:
                        name=infos.split(",")[1].split("|")[2]
                    else:
                        name=infos.split(",")[1]
            
                
                
                if ' S0' in name:
                    seriesname = name.split(" S0")[0]
                if ' S1' in name:
                    seriesname = name.split(" S1")[0]
                if ' S2' in name:
                    seriesname = name.split(" S2")[0]
                if ' S3' in name:
                    seriesname = name.split(" S3")[0]
        
                if ' E0' in name:
                    seasonnumber = name.split(" E0")[0]
                if ' E1' in name:
                    seasonnumber = name.split(" E1")[0]
                if ' E2' in name:
                    seasonnumber = name.split(" E2")[0]
                if ' E3' in name:    
                    seasonnumber = name.split(" E3")[0]
                if ' E4' in name:    
                    seasonnumber = name.split(" E4")[0]    
                
                
                series_name = seriesname.split("_")
                
                # Series Name
                series_name=series_name[0]
                # Season Number
                season_number = seasonnumber.replace(seriesname+' ',"") 
                # Episode Number
                episode_number = name.replace(seasonnumber+' ',"") 
                # Full Episode Name
                fullepname = series_name+' '+season_number+' '+episode_number 
                if ' / ' in fullepname: 
                    fullepname=fullepname.replace(" / "," - ")
                    
                print()

                if len(foldertosave) > 1:
                    seriesfold = foldertosave
                else :
                    seriesfold = categorie_choisit

                if not os.path.exists('/home//series/'+seriesfold):
                    os.makedirs('/home/series/'+seriesfold)
                
                if not os.path.exists('/home/series/'+seriesfold+'/'+escapeChars(series_name)+'/'+escapeChars(season_number)):
                    os.makedirs('/home/series/'+seriesfold+'/'+escapeChars(series_name)+'/'+escapeChars(season_number))        
                        
                fileurl = lignes[j]
                extension = fileurl.split("/")[6]
                streamid = extension.split(".")[0]
                extension = extension.replace(streamid+'.', "")

                filenamew = '/home/series/'+seriesfold+'/'+escapeChars(series_name)+'/'+escapeChars(season_number)+'/'+escapeChars(fullepname)+'.'+extension.strip()
                
                if categorie not in list_categories:
                    list_categories.append(categorie)
                
                
                if not os.path.exists(filenamew):
                    def dlProgress(count, blockSize, totalSize):
                        percent = int(count*blockSize*100/totalSize)
                        sgetname = season_number+' '+ episode_number+' '+ series_name
                        sys.stdout.write(" (%d%%)" % percent + ' ' + sgetname)
                        sys.stdout.flush()

                    if __name__ == '__main__':
                        class AppURLopener(urllib.request.FancyURLopener):
                            version = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.69 Safari/537.36"
                        urllib._urlopener = AppURLopener()
                        try:
                            urllib._urlopener.retrieve(fileurl, filenamew, dlProgress)
                        
                        except HTTPError as e:
                            print('Error code: ', e.code)
                            pass
                        except URLError as e:
                            print('Reason: ', e.reason)
                            pass
                        else:
                            print(' ')
                            pass
                        
                    
                else:
                    
                    print('Episode already Downloaded')



else:
    print("An Error Occur Please restart the script")


   